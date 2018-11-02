/**
 * cleanPhone
 * 
 * Удаление из телефона всего кроме цифр
 * 
 * @category    snippet
 * @internal    @installset sample
 */
//<?php
return "+" . preg_replace('/^8/', '7', preg_replace('/[^\d]+/', '', $in));
