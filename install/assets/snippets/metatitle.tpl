/**
 * metatitle
 * 
 * render title
 * 
 * @category    snippet
 * @internal    @properties
 * @internal    @installset sample
 */
//<?php

$append = '';

if (!empty($appendSiteName) || !isset($appendSiteName)) {
    $append = ' - ' . $modx->getConfig('site_name');

    if (!empty($modx->documentObject['meta_title'][1])) {
        return $modx->documentObject['meta_title'][1];
    }
}

switch (true) {
    case !empty($modx->documentObject['longtitle']):
        return $modx->documentObject['longtitle'] . $append;

    default:
        return $modx->documentObject['pagetitle'] . $append;
}
