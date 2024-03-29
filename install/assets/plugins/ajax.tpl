﻿//<?php
/**
 * ajax
 *
 * Обработка форм
 *
 * @category    plugin
 * @internal    @events OnPageNotFound
 * @internal    @disabled 0
 * @internal    @installset base
 */

if (empty($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] != 'POST' || empty($_GET['q'])) {
    return;
}

switch ($_GET['q']) {
    case 'modal.php': {
        if (empty($_POST['id']) || !is_scalar($_POST['id'])) {
            exit;
        }

        $chunk = $modx->getChunk('modal_' . $_POST['id']);

        if (!empty($chunk)) {
            echo json_encode([
                'markup' => $modx->parseDocumentSource($chunk),
            ]);
        }

        exit;
    }

    case 'ajax.json': {
        if (empty($_POST['formid'])) {
            exit;
        }

        $formid = $_POST['formid'];

        if (!is_string($formid) || !preg_match('/^[a-z]{2,32}$/', $formid)) {
            exit;
        }

        $to = $modx->getConfig('client_email_recipients_' . $formid);
        if (empty($to)) {
            $to = $modx->getConfig('client_email_recipients');
        }

        $params = [
            'formid'            => $formid,
            'to'                => $to,
            'api'               => 1,
            'apiFormat'         => 'raw',
            'saveObject'        => '_FormLister',
            'parseMailerParams' => 1,
        ];

        foreach (['common', $formid] as $required => $filename) {
            $filename = MODX_BASE_PATH . 'assets/snippets/FormLister/config/custom/' . $filename . '.inc.php';

            if (!is_readable($filename)) {
                if ($required) {
                    exit;
                } else {
                    continue;
                }
            }

            $config = include $filename;

            foreach (['prepare', 'prepareProcess', 'prepareAfterProcess'] as $param) {
                if (empty($config[$param])) {
                    $config[$param] = [];
                } else if (!is_array($config[$param])) {
                    $config[$param] = [$config[$param]];
                }
            }

            $params = array_merge($params, $config);
        }

        $params = array_merge($params, [
            'prepareProcess' => array_merge($config['prepareProcess'], [
                'prepareAddPageToLetter',
                'prepareAddUTMLabelsToLetter',
            ]),
        ]);

        $snippet = 'FormLister';

        if ($formid == 'order' && isset($modx->snippetCache['Order'])) {
            $snippet = 'Order';
        }

        $data = $modx->runSnippet($snippet, $params);

        if (isset($params['prepareResponse'])) {
            $json = call_user_func($params['prepareResponse'], $modx, $data, $fl);
        } else {
            if (empty($data['status'])) {
                $json = [
                    'response' => 'fail',
                ];

                if (!empty($data['errors'])) {
                    $json['fields'] = $data['errors'];
                }

                if (!empty($data['messages'])) {
                    $json['messages'] = $data['messages'];
                }
            } else {
                $fl = $modx->getPlaceholder('_FormLister');

                require_once MODX_BASE_PATH . 'assets/snippets/DocLister/lib/DLTemplate.class.php';
                $DLTemplate = \DLTemplate::getInstance($modx);

                $json = [
                    'response' => 'success',
                    'messages' => [
                        $DLTemplate->parseChunk($fl->getCFGDef('successTpl', '@CODE:' . $fl->getCFGDef('successMessage', 'Заявка отправлена!')), $data['fields'], true),
                    ],
                ];

                $redirect = $fl->getField('redirectTo');

                if (!empty($redirect)) {
                    $json['redirect'] = $redirect;
                }
            }
        }

        echo json_encode($json, JSON_UNESCAPED_UNICODE);
        exit;
    }
}
