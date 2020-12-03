//<?php
/**
 * SeoTemplates
 *
 * SeoTemplates
 *
 * @category    plugin
 * @internal    @events OnAfterLoadDocumentObject
 * @internal    @modx_category 
 * @internal    @properties 
 * @internal    @disabled 0
 * @internal    @installset base
 */
$processors = [
	'meta_keywords' => function($value, $row) use ($modx) {
		$result = '';
		
		foreach ($row['meta_keywords_options'] as $option) {
			switch ($option) {
				case 'add_pagetitle': {
					$tmp = preg_replace('/[",\.\:]+/', '', $modx->documentObject['pagetitle']);
					$tmp = preg_replace('/ +/', ' ', $tmp);
					$result .= ', ' . implode(', ', explode(' ', $tmp));
					break;
				}
		
				case 'add_sitename': {
					$tmp = preg_replace('/[",\.\:]+/', '', $modx->getConfig('site_name'));
					$tmp = preg_replace('/ +/', ' ', $tmp);
					$result .= ', ' . implode(', ', explode(' ', $tmp));
					break;
				}
			}
		}
		
		$result .= ', ' . $value;
		
		return trim($result, ' ,');
	},
];

if ($modx->event->name == 'OnAfterLoadDocumentObject') {
	$raw = $modx->runSnippet('PageBuilder', ['docid' => 0, 'container' => 'seo_templates', 'renderTo' => 'array']);
	
	foreach ($raw[0] as $row) {
		if ($row['template_id'] != $modx->documentObject['template']) {
			continue;
		}
	
		foreach (['meta_title', 'meta_description', 'meta_keywords'] as $field) {
			$value = $modx->documentObject[$field][1];
			
			if (empty($value)) {
				$value = $modx->parseDocumentSource($row[$field]);
				
				if (isset($processors[$field])) {
					$value = call_user_func($processors[$field], $value, $row);
				}
			}

			$modx->setPlaceholder('seotemplates.' . $field, $value);
		}
	}
}
