<?php

return [
    'caption'    => 'Социальные сети',
    'subcaption' => 'Если какая-либо ссылка не заполнена - она не будет показываться. Также отображение должно быть предусмотрено в шаблоне.',
    'settings' => [
        'social_facebook' => [
            'caption' => 'Facebook',
            'type'  => 'text',
        ],
        'social_vkontakte' => [
            'caption' => 'ВКонтакте',
            'type'  => 'text',
        ],
        'social_instagram' => [
            'caption' => 'Instagram',
            'type'  => 'text',
        ],
        'social_youtube' => [
            'caption' => 'Youtube',
            'type'  => 'text',
        ],
        'social_odnoklassniki' => [
            'caption' => 'Одноклассники',
            'type'  => 'text',
        ],
        'divider' => [
            'type' => 'divider',
        ],
        'og_title' => [
            'caption' => 'Open Graph заголовок',
            'type' => 'text',
        ],
        'og_image' => [
            'caption' => 'Open Graph изображение',
            'type' => 'image',
        ],
        'og_description' => [
            'caption' => 'Open Graph описание',
            'type' => 'textarea',
        ],
    ],
];
