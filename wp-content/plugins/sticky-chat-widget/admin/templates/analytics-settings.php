<?php
/**
 * Google analytics for widget functionality of the plugin.
 *
 * @author  : Ginger Plugins <gingerplugins@gmail.com>
 * @license : GPL2
 * */
defined('ABSPATH') or die('Direct Access is not allowed');
?>

<?php
$inputValue = get_post_meta($postId, "google_analytics", true);
$inputValue = empty($inputValue) ? "no" : $inputValue;
?>

<div class="setting-sub-title mt-36"><?php esc_html_e("Analytics Settings", "sticky-chat-widget") ?></div>
<div class="gp-form-field google-analytics">
    <div class="gp-form-label">
    </div>
    <div class="gp-form-input d-flex">
        <span class="dashboard-switch in-flex on-off">
            <input type="hidden" name="gsb_google_analytics" value="no">
            <input type="checkbox" id="gsb_google_analytics" name="gsb_google_analytics" <?php echo esc_attr($disabled) ?> value="yes" class="sr-only" <?php checked($inputValue, "yes") ?>>
            <label for="gsb_google_analytics"><?php esc_html_e("Google analytics", "sticky-chat-widget") ?></label>
            <?php if (!empty($disabled)) { ?>
                <a class="upgrade-link in-block" href="javascript:;" target="_blank"><?php esc_html_e("Go Pro", "sticky-chat-widget") ?></a>
            <?php } ?>
        </span>
    </div>
</div>
