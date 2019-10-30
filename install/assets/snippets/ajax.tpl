/**
 * ajax
 *
 * Обработка форм
 *
 * @category    snippet
 * @internal    @properties
 * @internal    @installset sample
 */

//<?php
if (!function_exists('parseQueryParams')) {
    function parseQueryParams($query) {
        $utmparams = [
            'utm_source'   => 'Рекламная система',
            'utm_campaign' => 'Кампания',
            'utm_content'  => 'Содержание объявления',
            'utm_term'     => 'Ключевое слово',
            'keyword'      => 'Ключевое слово',
            'q'            => 'Поисковая фраза',
            'query'        => 'Поисковая фраза',
            'text'         => 'Поисковая фраза',
            'words'        => 'Поисковая фраза',
        ];

        $crawlers = ['yandex.ru', 'rambler.ru', 'google.ru', 'google.com', 'mail.ru', 'bing.com', 'qip.ru'];

        $out = $params = [];

        if (preg_match('/\?(.+)$/', urldecode($query), $parts)) {
            foreach ($crawlers as $crawler) {
                if (stristr($parts[1], $crawler)) {
                    $out['Система'] = $crawler;
                }
            }

            parse_str($parts[1], $params);

            foreach ($utmparams as $name => $title) {
                if (!empty($params[$name])) {
                    $out[$title] = (md5($params[$name]) == md5(iconv('UTF-8', 'UTF-8', $params[$name])) ? $params[$name] : iconv('cp1251', 'utf-8', $params[$name]));
                }
            }

            if (!empty($out)) {
                return $out;
            }
        }

        return null;
    }
}

if (!empty($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    if (empty($_POST['formid'])) {
        return '';
    }

    $formid = $_POST['formid'];

    if (is_string($formid) && preg_match('/^[a-z]{2,32}$/', $formid)) {
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
                    return '';
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
                function($modx, $data, $fl, $name) {
                    if (isset($data['pid']) && is_numeric($data['pid'])) {
                        $fl->setField('page', $modx->runSnippet('DLCrumbs', [
                            'id'           => $data['pid'],
                            'hideMain'     => 1,
                            'showCurrent'  => 1,
                            'addWhereList' => 'c.id != 1',
                            'tpl'          => '@CODE:[+title+] -&nbsp;',
                            'tplLast'      => '@CODE:[+title+]',
                            'ownerTPL'     => '@CODE:[+crumbs.wrap+]',
                        ]));
                    }

                    $utm = '';

                    foreach (['sreferer' => 'Параметры перехода', 'squery' => 'Параметры визита'] as $section => $sectionname) {
                        if (isset($_POST[$section]) && is_string($_POST[$section])) {
                            $params = parseQueryParams($_POST[$section]);

                            if (!empty($params)) {
                                $out = '';

                                foreach ($params as $key => $value) {
                                    $out .= '<tr><td>' . $key . ':&nbsp;</td><td>' . htmlspecialchars($value) . '</td></tr>';
                                }

                                $utm .= '<br><b>' . $sectionname . ':</b>' . '<table><tbody>' . $out . '</tbody></table>';
                            }
                        }
                    }

                    $fl->setPlaceholder('utm', $utm);
                },
            ]),
        ]);

        $data = $modx->runSnippet('FormLister', $params);

        if (empty($data['status'])) {
            $json = [
                'response' => 'fail',
                'fields'   => $data['errors'],
                'messages' => $data['messages'],
            ];
        } else {
            $fl = $modx->getPlaceholder('_FormLister');

            $json = [
                'response' => 'success',
                'messages' => [$fl->getCFGDef('successMessage', 'Заявка отправлена!')],
            ];
        }

        return json_encode($json, JSON_UNESCAPED_UNICODE);
    }
}
