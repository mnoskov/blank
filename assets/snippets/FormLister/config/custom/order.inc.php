<?php

if (!defined('IN_PARSER_MODE')) {
    return [];
}

return [
    'rules' => [
        'name' => [
            'required' => 'Введите имя',
            'lengthBetween' => [
                'params'  => [2, 100],
                'message' => 'Имя должно быть от 2 до 100 символов',
            ]
        ],
        'phone' => [
            'required' => 'Введите номер телефона',
            'matches' => [
                'params'  => '/^\+?[78]\s?\(\d{3}\)\s?\d{3}-\d\d-\d\d$/',
                'message' => 'Формат телефона неверный',
            ]
        ],
        'email' => [
            'required' => 'Введите email',
            'email'    => 'Формат адреса неверный',
        ],
        'agree' => [
            'required' => 'Отметьте согласие',
        ],
    ],
    'attachments' => 'file',
    'fileRules' => [
        'file' => [
            //'required' => 'Загрузите файл',
            'allowed' => [
                'params' => [
                    ['jpeg', 'jpg', 'png', 'pdf', 'xls', 'xlsx', 'doc', 'docx'],
                ],
                'message' => 'Неверный формат файла, допустимы jpg, png, pdf, xls, xlsx, doc, docx',
            ],
            'maxSize' => [
                'params'  => 2048,
                'message' => 'Размер файла превышает допустимый, должен быть не более 2 Мб',
            ],
        ],
    ],
    'successMessage' => 'Заявка отправлена!',
    'subject' => 'Заказ!',
    'reportTpl' => '@CODE:
        <b>Заказ!</b>
        <table>
            <tr><td>Имя:&nbsp;</td><td>[+name.value+]</td></tr>
            <tr><td>Телефон:&nbsp;</td><td>[+phone.value+]</td></tr>
            <tr><td>Email:&nbsp;</td><td>[+email.value+]</td></tr>
            <tr><td>Страница:&nbsp;</td><td>[+page.value+]</td></tr>
        </table>
    ',
    'autosender' => '[+email.value+]',
    'autoSubject' => 'Вами сделан заказ!',
    'automessageTpl' => '@CODE:
        <b>Данные заказа:</b>
        <table>
            <tr><td>Имя:&nbsp;</td><td>[+name.value+]</td></tr>
            <tr><td>Телефон:&nbsp;</td><td>[+phone.value+]</td></tr>
            <tr><td>Email:&nbsp;</td><td>[+email.value+]</td></tr>
            <tr><td>Страница:&nbsp;</td><td>[+page.value+]</td></tr>
        </table>
    ',
//    'prepareProcess' => function($modx, $data, $_FL, $name) {
//
//    },
];
