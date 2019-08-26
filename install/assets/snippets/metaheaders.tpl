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
    'meta_description' => 'description',
    'meta_keywords'    => 'keywords',
    'og_title'         => 'og:title',
    'og_description'   => 'og:description',
    'og_image'         => 'og:image',
];

$output = '';

foreach ($tags as $tv => $tag) {
    $value = '';

    if (!empty($modx->documentObject[$tv][1])) {
        $value = $modx->documentObject[$tv][1];
    } else {
        $conf = $modx->getConfig('client_' . $tv);

        if (!empty($conf)) {
            $value = $conf;
        } else {
            if ($tv == 'og_title') {
                $value = $modx->runSnippet('metatitle');
            }
        }
    }

    if (!empty($value)) {
        if ($tv == 'og_image') {
            $value = $modx->getConfig('site_url') . $value;
        }

        $output .= '<meta name="' . $tag . '" content="' . $value . '">' . "\n\t";
    }
}

return $output;
