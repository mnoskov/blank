<?php

$elements = [];
$query = $this->modx->db->select('id, templatename', $this->modx->getFullTablename('site_templates'), '', 'templatename ASC');

while ($row = $this->modx->db->getRow($query)) {
    $elements[ $row['id'] ] = $row['templatename'];
}

return [
    'title' => 'Шаблон',
    'container' => 'seo_templates',

    'fields' => [
        'template_id' => [
            'caption' => 'Шаблон ресурсов',
            'type'    => 'dropdown',
            'elements' => $elements,
        ],

        'meta_title' => [
            'caption' => 'Шаблон META title',
            'type'    => 'textarea',
            'height'  => '60px',
        ],

        'meta_description' => [
            'caption' => 'Шаблон META description',
            'type'    => 'textarea',
            'height'  => '80px',
        ],

        'meta_keywords' => [
            'caption' => 'Шаблон META keywords',
            'type'    => 'textarea',
            'height'  => '60px',
        ],

        'meta_keywords_options' => [
            'caption'  => '',
            'type'     => 'checkbox',
            'layout'   => 'horizontal',
            'elements' => [
                'add_pagetitle' => 'Добавить pagetitle',
                'add_sitename' => 'Добавить название сайта',
            ],
        ],
    ],
];
