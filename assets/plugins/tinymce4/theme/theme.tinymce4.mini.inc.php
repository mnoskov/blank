<?php
/*
 * All available config-params of TinyMCE4
 * https://www.tinymce.com/docs/configure/
 *
 * Belows default configuration setup assures all editor-params have a fallback-value, and type per key is known
 * $this->set( $editorParam, $value, $type, $emptyAllowed=false )
 *
 * $editorParam     = param to set
 * $value           = value to set
 * $type            = string, number, bool, json (array or string)
 * $emptyAllowed    = true, false (allows param:'' instead of falling back to default)
 * If $editorParam is empty and $emptyAllowed is true, $defaultValue will be ignored
 *
 * $this->modxParams holds an array of actual Modx- / user-settings
 *
 * */

// @todo: clean plugins for mini

// $this->set('plugins', 'advlist autolink lists modxlink image charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen spellchecker insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor codesample colorpicker textpattern imagetools paste youtube', 'string');
$this->set('plugins', 'anchor autolink lists spellchecker pagebreak layer table save hr modxlink image imagetools emoticons insertdatetime preview media searchreplace print code contextmenu paste directionality fullscreen noneditable visualchars textcolor nonbreaking template youtube autosave advlist visualblocks charmap wordcount codesample', 'string');
$this->set('toolbar1', 'bold italic underline strikethrough | alignleft aligncenter alignright | link unlink | undo redo | bullist numlist | outdent indent | removeformat code', 'string');
$this->set('toolbar2', NULL);
$this->set('toolbar3', NULL);
$this->set('toolbar4', NULL);

// Hide bars
$this->set('menubar',               false,                           'bool' );       // https://www.tinymce.com/docs/configure/editor-appearance/#menubar
$this->set('statusbar',             false,                           'bool' );       // https://www.tinymce.com/docs/get-started/customize-ui/#hidingthestatusbar

// Will be overwritten by force() within plugin-code anyhow
$this->set('height',            '120px',    'string' );
$this->set('width',             '100%',    'string' );
