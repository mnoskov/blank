REPLACE INTO `{PREFIX}site_content` (`id`, `type`, `contentType`, `pagetitle`, `longtitle`, `description`, `alias`, `link_attributes`, `published`, `pub_date`, `unpub_date`, `parent`, `isfolder`, `introtext`, `content`, `richtext`, `template`, `menuindex`, `searchable`, `cacheable`, `createdby`, `createdon`, `editedby`, `editedon`, `deleted`, `deletedon`, `deletedby`, `publishedon`, `publishedby`, `menutitle`, `donthit`, `privateweb`, `privatemgr`, `content_dispo`, `hidemenu`, `alias_visible`) VALUES
(1, 'document', 'text/html', 'Контент', '', '', 'content', '', 1, 0, 0, 0, 1, '', '', 1, 0, 0, 1, 1, 1, 1130304721, 1, 1493893986, 0, 0, 0, 1130304721, 1, '', 0, 0, 0, 0, 1, 0),
(2, 'document', 'text/html', 'Главная', '', '', 'index', '', 1, 0, 0, 1, 0, '', '', 1, 1, 0, 1, 1, 1, 1493894004, 1, 1494512939, 0, 0, 0, 1493894004, 1, '', 0, 0, 0, 0, 0, 1),
(3, 'document', 'text/xml', 'sitemap.xml', '', '', 'sitemap.xml', '', 1, 0, 0, 0, 0, '', '[[DLSitemap? &idType=`parents` &parents=`1` &depth=`5`]]', 0, 0, 1001, 1, 1, 1, 1507639990, 1, 1507642341, 0, 0, 0, 1507632771, 1, '', 0, 0, 0, 0, 1, 1),
(4, 'document', 'text/html', 'ajax.json', '', '', 'ajax.json', '', 1, 0, 0, 0, 0, '', '[!ajax!]', 0, 0, 1002, 1, 1, 1, 1493894151, 1, 1493894151, 0, 0, 0, 1493894151, 1, '', 0, 0, 0, 0, 1, 1),
(5, 'document', 'text/html', '404', '', '', '404', '', 1, 0, 0, 0, 0, '', '<p>Страница не найдена!</p>', 1, 2, 1003, 1, 1, 1, 1493894251, 1, 1493894251, 0, 0, 0, 1493894251, 1, '', 0, 0, 0, 0, 1, 1);

TRUNCATE TABLE `{PREFIX}site_templates`;

REPLACE INTO `{PREFIX}site_templates` (`id`, `templatename`, `description`, `editor_type`, `category`, `icon`, `template_type`, `content`, `locked`, `selectable`) VALUES
(1, 'main', '', 0, 0, '', 0, '{{header}}\r\n<div class=\"container\">\r\n   <div class=\"user-content\">\r\n        [*content*]\r\n </div>\r\n  [[share]]\r\n</div>\r\n{{footer}}', 0, 1),
(2, 'info', '', 0, 0, '', 0, '{{header}}\r\n<div class=\"container\">\r\n   <div class=\"user-content\">\r\n        [*content*]\r\n </div>\r\n  [[share]]\r\n</div>\r\n{{footer}}', 0, 1),
(3, 'news-list', '', 0, 0, '', 0, '{{header}}\r\n\r\n<div class=\"container\">\r\n  <div class=\"page-title\">\r\n      [*pagetitle*]\r\n   </div>\r\n  \r\n    [[DocLister? \r\n       &id=`list`\r\n      &parents=`[*id*]` \r\n      &tpl=`news_item` \r\n        &ownerTPL=`news_wrap` \r\n      &tvList=`thumb` \r\n        &display=`4` \r\n       &paginate=`pages` \r\n      &orderBy=`pub_date DESC`\r\n        &TplNextP=`@CODE: <a href=\"[+link+]\"><i class=\"icon-right\"></i></a>` \r\n       &TplPrevP=`@CODE: <a href=\"[+link+]\"><i class=\"icon-left\"></i></a>` \r\n        &TplPage=`@CODE: <a href=\"[+link+]\">[+num+]</a>` \r\n     &TplCurrentPage=`@CODE: <span class=\"current\">[+num+]</span>` \r\n        &TplWrapPaginate=`@CODE: <div class=\"pagination\">[+wrap+]</div>`\r\n  ]]\r\n</div>\r\n\r\n{{footer}}', 0, 1);



REPLACE INTO `{PREFIX}site_tmplvar_templates` VALUES (1, 1, 0);

REPLACE INTO `{PREFIX}site_tmplvar_templates` VALUES (2, 1, 0);

REPLACE INTO `{PREFIX}site_tmplvar_templates` VALUES (3, 1, 0);

REPLACE INTO `{PREFIX}site_tmplvar_templates` VALUES (1, 2, 0);

REPLACE INTO `{PREFIX}site_tmplvar_templates` VALUES (2, 2, 0);

REPLACE INTO `{PREFIX}site_tmplvar_templates` VALUES (3, 2, 0);

REPLACE INTO `{PREFIX}site_tmplvar_templates` VALUES (1, 3, 0);

REPLACE INTO `{PREFIX}site_tmplvar_templates` VALUES (2, 3, 0);

REPLACE INTO `{PREFIX}site_tmplvar_templates` VALUES (3, 3, 0);


UPDATE `{PREFIX}system_settings` SET setting_value = '2' WHERE setting_name = 'site_start';

UPDATE `{PREFIX}system_settings` SET setting_value = '5' WHERE setting_name = 'error_page';

UPDATE `{PREFIX}system_settings` SET setting_value = '5' WHERE setting_name = 'unauthorized_page';

UPDATE `{PREFIX}system_settings` SET setting_value = '2' WHERE setting_name = 'default_template';

UPDATE `{PREFIX}system_settings` SET setting_value = 'sibling' WHERE setting_name = 'auto_template_logic';

UPDATE `{PREFIX}system_settings` SET setting_value = '/' WHERE setting_name = 'friendly_url_suffix';

UPDATE `{PREFIX}system_settings` SET setting_value = 'undo redo | cut copy paste | searchreplace | fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | forecolor backcolor | styleselect' WHERE setting_name = 'tinymce4_custom_buttons1';

UPDATE `{PREFIX}system_settings` SET setting_value = 'advlist autolink lists link image charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen spellchecker insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor codesample colorpicker textpattern imagetools paste modxlink youtube' WHERE setting_name = 'tinymce4_custom_plugins';

UPDATE `{PREFIX}system_settings` SET setting_value = '0' WHERE setting_name = 'global_tabs';

UPDATE `{PREFIX}system_settings` SET setting_value = '2' WHERE setting_name = 'manager_theme_mode';

UPDATE `{PREFIX}system_settings` SET setting_value = 'center' WHERE setting_name = 'login_form_position';

UPDATE `{PREFIX}system_settings` SET setting_value = 'full' WHERE setting_name = 'tinymce4_theme';

UPDATE `{PREFIX}site_plugins` SET disabled = '0' WHERE name = 'ElementsInTree';

UPDATE `{PREFIX}site_plugins` SET disabled = '1' WHERE name = 'OutdatedExtrasCheck';
UPDATE `{PREFIX}site_plugins` SET disabled = '1' WHERE name = 'Updater';








