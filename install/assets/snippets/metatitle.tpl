//<?php
/**
 * metatitle
 *
 * render title
 *
 * @category	snippet
 * @internal	@modx_category
 * @internal	@installset base
 * @internal	@overwrite true
 * @internal	@properties {}
 */

$append = '';

if (!empty($appendSiteName) || !isset($appendSiteName)) {
    $append = ' - ' . $modx->getConfig('site_name');

    if (!empty($modx->documentObject['meta_title'][1])) {
        return $modx->documentObject['meta_title'][1];
    }

    $placeholder = $modx->getPlaceholder('seotemplates.meta_title');

    if (!empty($placeholder)) {
        return $placeholder;
    }
}

switch (true) {
    case !empty($modx->documentObject['longtitle']):
        return $modx->documentObject['longtitle'] . $append;

    default:
        return $modx->documentObject['pagetitle'] . $append;
}
