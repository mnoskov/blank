//<?php
/**
 * prepareAddPageToLetter
 *
 * prepareAddPageToLetter
 *
 * @category    snippet
 * @internal    @properties
 * @internal    @installset sample
 */

if (isset($data['pid']) && is_numeric($data['pid'])) {
    $FormLister->setField('page', $modx->runSnippet('DLCrumbs', [
        'id'           => $data['pid'],
        'hideMain'     => 1,
        'showCurrent'  => 1,
        'addWhereList' => 'c.id != 1',
        'tpl'          => '@CODE:[+title+] -&nbsp;',
        'tplLast'      => '@CODE:[+title+]',
        'ownerTPL'     => '@CODE:[+crumbs.wrap+]',
    ]));
}
