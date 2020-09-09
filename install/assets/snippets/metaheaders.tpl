//<?php
/**
 * metaheaders
 *
 * render seo and opengraph headers
 *
 * @category    snippet
 * @internal    @properties
 * @internal    @installset sample
 */

$tags = [
    'description' => [
        'meta_description' => 'tv',
        'introtext' => 'doc',
        'client_meta_description' => 'cfg',
    ],
    'keywords' => [
        'meta_keywords' => 'tv',
        'client_meta_keywords' => 'cfg',
    ],
    'og:title' => [
        'og_title' => 'tv',
        function($modx) {
            return $modx->runSnippet('metatitle');
        },
        'client_og_title' => 'cfg',
    ],
    'og:description' => [
        'og_description' => 'tv',
        'meta_description' => 'values',
        'client_og_description' => 'cfg',
    ],
    'og:image' => [
        'og_image' => 'tv',
        'image' => 'tv',
        'client_og_image' => 'cfg',
    ],
];

$output = '';
$values = [];

foreach ($tags as $tag => $sources) {
    $value = '';

    foreach ($sources as $source => $from) {
        if (is_callable($from)) {
            $value = call_user_func($from, $modx);
        } else {
            switch ($from) {
                case 'tv':     $value = $modx->documentObject[$source][1]; break;
                case 'doc':    $value = $modx->documentObject[$source]; break;
                case 'cfg':    $value = $modx->getConfig($source); break;
                case 'values': $value = $values[$source]; break;
            }
        }

        if (!empty($value)) {
            break;
        }
    }

    if (!empty($value)) {
        if ($tag == 'og:image') {
            $value = $modx->getConfig('site_url') . $value;
        }

        $output .= '<meta name="' . $tag . '" content="' . $value . '">' . "\n\t";
        $values[$tv] = $value;
    }
}

return $output;
