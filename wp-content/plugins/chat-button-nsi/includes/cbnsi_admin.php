<?php 

// direct file access
if (!defined('ABSPATH')){
  exit;
}

if(!function_exists('cbnsi_customize_register')){
	function cbnsi_customize_register( $wp_customize ) {

		$wp_customize->add_section( 'cbnsi_customize_option' , array(
		    'title'      => __( 'Chat Button', 'mytheme' ),
		    'priority'   => 30,
		));

		// Add Setting for Button Style
		$wp_customize->add_setting( 'cbnsi_button_styles' , array(
			'default'   => 'none',
			'transport' => 'refresh',
		));

		// Add Control for Mobile Number
		$wp_customize->add_control('cbnsi_button_styles', array(
			'label'    => __( 'Button Style', 'mytheme' ),
			'type'     => 'select',
			'section'    => 'cbnsi_customize_option',
		    'choices'  => array(
		      'none'  => 'None',
		      'style1' => 'Style1',
		      'style2' => 'Style2',
		      'style3' => 'Style3',
		      'style4' => 'Style4',
		      'style5' => 'Style5'
		  )
		));

		// Add Setting for Mobile Number
		$wp_customize->add_setting( 'cbnsi_button_mobilenumber' , array(
			'default'   => '+123456789',
			'transport' => 'refresh',
		));

		// Add Control for Default Message text
		$wp_customize->add_control('cbnsi_button_mobilenumber', array(
			'label'      => __( 'Mobile Number', 'mytheme' ),
			'type'      => 'text',
			'section'    => 'cbnsi_customize_option',
		));

		// Add Setting for Default Message text
		$wp_customize->add_setting( 'cbnsi_button_text' , array(
			'default'   => 'Hello',
			'transport' => 'refresh',
		));

		// Add Control for Default Message text
		$wp_customize->add_control('cbnsi_button_text', array(
			'label'      => __( 'Message Text', 'mytheme' ),
			'type'      => 'text',
			'section'    => 'cbnsi_customize_option',
		));	

		// Add Setting for Button Color
		$wp_customize->add_setting( 'cbnsi_button_color' , array(
			'default'   => '#2ECC71',
			'transport' => 'refresh',
		));

		// Add Control for Button Color
		$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'link_color', array(
			'label'      => __( 'Button Color', 'mytheme' ),
			'section'    => 'cbnsi_customize_option',
			'settings'   => 'cbnsi_button_color',
		)));
	}
}

add_action( 'customize_register', 'cbnsi_customize_register' );