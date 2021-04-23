/**
 * IgnoreLighthouse
 *
 * Test if argument is not empty
 *
 * @category    snippet
 * @internal    @properties
 * @internal    @installset sample
 */

// Usage:
// [!IgnoreLighthouse? &content=`heavy_content`!]

$isLighthouse = !empty($_SERVER['HTTP_USER_AGENT']) && strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome-Lighthouse');

if (isset($content)) {
    if (!$isLighthouse) {
        return $content;
    }

    return;
}

return $isLighthouse ? 1 : 0;
