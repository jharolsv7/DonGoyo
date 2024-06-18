<?php
/*

Plugin Name: Chat Button Ninetyseven Infotech
Plugin URI: https://ninetyseveninfotech.com/chat-button-nsi
Description: Chat Button Ninetyseven Infotech for WordPress allows your customers to open a conversation from your website directly to your phone number
Version: 1.0
Author: Ninetyseven Infotech
Author URI: https://ninetyseveninfotech.com 
License: GPLv2 or later 

Developer: 
Ninetyseven Infotech
ninetyseveninfotech@gmail.com 
Blog: https://ninetyseveninfotech.com/blog
Instagram : https://www.instagram.com/ninetyseveninfotech/
Facebook : https://www.facebook.com/ninetyseveninfotech
LinkedIn: https://www.linkedin.com/in/ninetyseven-infotech-71820219b/
*/
 
// direct file access
if (!defined('ABSPATH')){
  exit;
}

// Defining Constants
if(!defined('CBNSI_PLUGIN_DIR')) define('CBNSI_PLUGIN_DIR', plugin_dir_path( __FILE__ ));
if(!defined('CBNSI_PLUGIN_FILE')) define('CBNSI_PLUGIN_FILE', plugins_url('', __FILE__ ));

// Admin File //
require_once CBNSI_PLUGIN_DIR . 'includes/cbnsi_admin.php';	

// Display Fronted //
add_action('wp_footer', 'cbnsi_my_custom_footer_js');
if(!function_exists('cbnsi_my_custom_footer_js')){
	function cbnsi_my_custom_footer_js() {
		// Get Mobile Number From Admin
		$cbnsi_whatsappphonenumber = '+1234567890';
		if(get_theme_mod('cbnsi_button_mobilenumber')){
		  $cbnsi_whatsappphonenumber = get_theme_mod('cbnsi_button_mobilenumber'); 
		}

		// Get Message from Admin
		$cbnsi_message = 'Hello';
		if(get_theme_mod('cbnsi_button_text')){
		  $cbnsi_message = get_theme_mod('cbnsi_button_text'); 
		}

		// Get Button Style from admin
		$cbnsi_btnstyle = 'none';
		if(get_theme_mod('cbnsi_button_styles')){
		  $cbnsi_btnstyle = get_theme_mod('cbnsi_button_styles'); 
		}

		// Get Color from admin
		$cbnsi_btncolor = '#2ECC71';
		if(get_theme_mod('cbnsi_button_color')){
		  $cbnsi_btncolor = get_theme_mod('cbnsi_button_color'); 
		}

		echo '<style>.cbnsi_chat_icon.style1,.cbnsi_chat_icon.style2,.cbnsi_chat_icon.style3,.cbnsi_chat_icon.style4,.cbnsi_chat_icon.style5{background-color:'.$cbnsi_btncolor.'}</style><div class="cbnsi_chat_icon '.$cbnsi_btnstyle.'"><a target="_blank" href="https://wa.me/'.$cbnsi_whatsappphonenumber.'?text='.urlencode($cbnsi_message).'"><img src="'.CBNSI_PLUGIN_FILE.'/chat-button-nsi.svg"/></a></div>';
	}
}
// Register CSS for Fronted //
if(!function_exists('cbnsi_register_style')){
	function cbnsi_register_style(){
		wp_register_style( 'cbnsi-public-style', CBNSI_PLUGIN_FILE.'/assets/cbnsi-slider-style.css');
		wp_enqueue_style( 'cbnsi-public-style' );
	}
}
add_action('init','cbnsi_register_style');