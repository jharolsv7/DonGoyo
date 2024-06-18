<?php
/**
    Plugin Name: Sticky Chat Widget
    Description: Connect with your valuable website visitors through Sticky Chat Widget that consist of current trendy chat options
    Version:     1.3
    Author: Ginger Plugins
    Author URI: https://www.gingerplugins.com/downloads/sticky-chat-widget/
    Text Domain: sticky-chat-widget
    Domain Path: /languages
    License: GPL2
 *
 * @author  : Ginger Plugins <gingerplugins@gmail.com>
 * @license : GPL2
 */

defined('ABSPATH') or die('Direct Access is not allowed');


if (!defined('GSB_PLUGIN_URL')) {
    define("GSB_PLUGIN_URL", plugin_dir_url(__FILE__));
}

if (!defined('GSB_PLUGIN_VERSION')) {
    define("GSB_PLUGIN_VERSION", "1.3");
}

if (!defined('GSB_PLUGIN_BASE')) {
    define("GSB_PLUGIN_BASE", plugin_basename(__FILE__));
}

if (!defined('GSB_DEV_VERSION')) {
    define("GSB_DEV_VERSION", false);
}

// Include social icon class.
require_once dirname(__FILE__)."/includes/social-icons.php";

include_once dirname(__FILE__)."/includes/front-end.php";


// Include backend files for settings.
if (is_admin()) {
    include_once dirname(__FILE__)."/admin/admin.php";
    include_once dirname(__FILE__)."/admin/admin-common.php";
}

if (!function_exists("create_contact_form_table")) {
    add_action('init', 'create_contact_form_table');

    /**
     * Create table while install.
     *
     * @since  1.1.2
     * @return null.
     */
    function create_contact_form_table() {
        global $wpdb;
        $tableName = $wpdb->prefix.'scw_contact_form_leads';
        $sql = "CREATE TABLE IF NOT EXISTS {$tableName}
        (
            id mediumint(12) NOT NULL AUTO_INCREMENT,
            name varchar(100),
            email  varchar(128),
            phone  varchar(100),
            message LONGTEXT,
            page_url varchar(200),
            widget_id mediumint(12),
            ip_address char(200),
            is_from_mobile tinyint(10),
            created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        );";
        $wpdb->query($sql);
    }



}//end if