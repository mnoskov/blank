//<?php
/**
 * metaheaders
 *
 * render seo and opengraph headers
 *
 * @category	snippet
 * @internal	@modx_category
 * @internal	@installset base
 * @internal	@overwrite true
 * @internal	@properties {}
 */

$tags = [
    'description' => [
        'meta_description' => 'tv',
		'seotemplates.meta_description' => 'ph',
//        'introtext' => 'doc',
        'client_meta_description' => 'cfg',
    ],
    'keywords' => [
        'meta_keywords' => 'tv',
		'seotemplates.meta_keywords' => 'ph',
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
				case 'ph':     $value = $modx->getPlaceholder($source); break;
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

            $output .= '<meta name="twitter:card" content="summary_large_image">' . "\n\t";
            $output .= '<meta name="twitter:image" content="' . $value . '">' . "\n\t";
        }

        $output .= '<meta name="' . $tag . '" content="' . $value . '">' . "\n\t";
        $values[$tv] = $value;
    }
}

return $output;
