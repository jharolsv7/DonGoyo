<?php
/**
 * The mail integration functionality of the plugin.
 *
 * @author  : Ginger Plugins <gingerplugins@gmail.com>
 * @license : GPL2
 * */

if (defined('ABSPATH') === false) {
    exit;
}

?>

<style>
    .scw-mail-integration {
        margin: 0px auto 0 auto;
        width: 100%;
        line-height: 20px;
        color: #564632;
        max-width: 1080px;
        padding: 50px 0 0 50px;
    }
    .scw-mail-integration, .scw-mail-integration * {
        box-sizing: border-box;
    }
    #wpcontent {
        padding-left: 0;
    }
    .scw-integration-title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 7px;
        line-height: 30px;
    }
    .scw-integration-subtitle {
        font-size: 14px;
    }
    .mail-integrations {
        display: flex;
        align-items: flex-start;
        margin: 30px -15px 0;
        flex-wrap: wrap;
    }
    .scw-mailchimp-integration-box, .scw-mailpoet-integration-box, .scw-captcha-integration-box {
        padding: 20px 25px;
        -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
        -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.25);
        border-radius: 5px;
        text-align: center;
        background: #fff;
        margin: 0 15px 30px;
        position: relative;
        cursor: pointer;
    }
    .scw-mailchimp-integration-img, .scw-mailpoet-integration-img {
        margin-top: 40px;
    }
    .scw-mailchimp-integration-img img, .scw-mailpoet-integration-img img {
        width: 60px;
        height: 60px;
        text-align: center;
    }
    .scw-mailchimp-integration-title, .scw-mailpoet-integration-title {
        font-size: 22px;
        font-weight: 600;
        padding-top: 20px;
    }
    .scw-mailchimp-integration-subtitle, .scw-mailpoet-integration-subtitle {
        font-size: 14px;
        padding: 25px 0 15px;
    }
    .mail-integrations .scw-mailchimp-integration-box:hover .scw-integration-button, .mail-integrations .scw-mailpoet-integration-box:hover .scw-integration-button, .scw-captcha-integration-box:hover .scw-integration-button {
        display: block;
    }
    .scw-integration-button {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 9;
    }
    a.new-upgrade-button {
        display: inline-block;
        margin-top: 15px;
        padding: 8px 15px;
        border: solid 2px #4f46e5;
        background-color: #4f46e5;
        color: #ffffff;
        font-weight: 600;
        border-radius: 4px;
        font-size: 14px;
        text-decoration: none;
        letter-spacing: 0.6px;
    }
    a.new-upgrade-button:hover {
        background-color: #4f46e5;
        color: #ffffff;
    }
    @media only screen and (max-width: 460px) {
        .scw-mail-integration {
            padding: 50px 0 0 20px;
        }
    }
    @media only screen and (max-width: 400px) {
        .scw-mail-integration {
            padding: 50px 0 0 0;
        }
    }
</style>

<div class="scw-mail-integration <?php echo ((isset($_GET['is_mailchimp_connect']) && $_GET['is_mailchimp_connect'] == 1) || (isset($_GET['is_mailpoet_connect']) && $_GET['is_mailpoet_connect'] == 1)) ? "" : "active" ?>">
    <div class="scw-integration-title"><?php esc_html_e("Integrations", "sticky-chat-widget") ?></div>
    <div class="scw-integration-subtitle"><?php esc_html_e("Connect sticky chat widget contact form to other apps"); ?></div>
    <div class="mail-integrations">
        <div class="scw-mailchimp-integration-box">
            <div class="scw-mailchimp-integration-img">
                <img src="<?php echo esc_url(GSB_PLUGIN_URL.'assets/admin/images/mailchimp.svg') ?>">
            </div>
            <div class="scw-mailchimp-integration-title">
                <?php esc_html_e("Mailchimp", "sticky-chat-widget") ?>
            </div>
            <div class="scw-mailchimp-integration-subtitle">
                <?php esc_html_e("Add and update contacts in your email lists", "sticky-chat-widget") ?>
            </div>
            <div class="scw-integration-button">
                <a href="<?php echo esc_url(admin_url("admin.php?page=sticky-chat-widget-upgrade-to-pro")); ?>" class="new-upgrade-button" target="blank"><?php esc_html_e("Go Pro", "sticky-chat-widget") ?></a>
            </div>
        </div>
        <div class="scw-mailpoet-integration-box">
            <div class="scw-mailpoet-integration-img">
                <img src="<?php echo esc_url(GSB_PLUGIN_URL . 'assets/admin/images/mailpoet.svg') ?>">
            </div>
            <div class="scw-mailpoet-integration-title">
                <?php esc_html_e("MailPoet", "sticky-chat-widget") ?>
            </div>
            <div class="scw-mailpoet-integration-subtitle">
                <?php esc_html_e("Add and update contacts in your email lists", "sticky-chat-widget") ?>
            </div>
            <div class="scw-integration-button">
                <a href="<?php echo esc_url(admin_url("admin.php?page=sticky-chat-widget-upgrade-to-pro")); ?>" class="new-upgrade-button" target="blank"><?php esc_html_e("Go Pro", "sticky-chat-widget") ?></a>
            </div>
        </div>
        <div class="scw-captcha-integration-box">
            <div class="scw-mailpoet-integration-img">
                <img src="<?php echo esc_url(GSB_PLUGIN_URL . 'assets/admin/images/google-captcha.svg') ?>">
            </div>
            <div class="scw-mailpoet-integration-title">
                <?php esc_html_e("Google reCAPTCHA", "sticky-chat-widget") ?>
            </div>
            <div class="scw-mailpoet-integration-subtitle">
                <?php esc_html_e("Enhance Security with Google reCAPTCHA", "sticky-chat-widget") ?>
            </div>
            <div class="scw-integration-button">
                <a href="<?php echo esc_url(admin_url("admin.php?page=sticky-chat-widget-upgrade-to-pro")); ?>" class="new-upgrade-button" target="blank"><?php esc_html_e("Go Pro", "sticky-chat-widget") ?></a>
            </div>
        </div>
    </div>
</div>