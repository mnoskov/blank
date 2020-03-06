//<?php
/**
 * prepareAddUTMLabelsToLetter
 *
 * prepareAddUTMLabelsToLetter
 *
 * @category    snippet
 * @internal    @properties
 * @internal    @installset sample
 */

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

$FormLister->setPlaceholder('utm', $utm);
