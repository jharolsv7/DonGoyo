<?php
$channels = self::$channel_list;
$position = self::get_position();

$cta_text = self::get_cta_text();
$cta_icon = self::get_cta_icon();

$default_state = self::get_default_state();
$menu_view = self::get_menu_view();
$close_button = self::has_close_button();
?>
<div class="ginger-front-buttons">
    <div class="ginger-sticky-buttons <?php echo esc_attr($menu_view."-menu") ?> <?php echo esc_attr($position) ?>-position <?php echo esc_attr($close_button) ?>">
        <div class="sticky-button-list <?php echo esc_attr($menu_view."-menu") ?>">
            <?php
            $label_position = $position = ($position == "right")?"left":"right";
            if($menu_view == "horizontal") {
                $label_position = "top";
            }
            ?>
            <div class="button-list">
                <?php foreach ($channels as $channel) { ?>
                    <div class="channel-btn <?php echo esc_attr($channel['for_desktop']) ?> <?php echo esc_attr($channel['for_mobile']) ?> <?php if($menu_view == "horizontal"){ echo "channel-btn-horizontal"; } else { echo "channel-btn-vertical"; } ?>">
                        <a id="<?php echo esc_attr($channel['channel']) ?>-social-button" class="ginger-social-channel <?php echo esc_attr($channel['channel']) ?>-social-button" href="<?php echo esc_attr($channel['href']) ?>" target="<?php echo esc_attr($channel['target']) ?>"  data-ginger-tooltip-location="<?php echo esc_attr($label_position) ?>" data-ginger-tooltip="<?php echo esc_attr($channel['title']) ?>" data-value="<?php echo esc_attr($channel['value']) ?>">
                            <span class="ginger-button-icon channel-<?php echo esc_attr($channel['channel']) ?> ssb-btn-bg-<?php echo esc_attr($channel['channel']) ?>" >
                                <?php echo $channel['icon'] ?>
                            </span>
                        </a>
                    </div>
                <?php } ?>
            </div>
            <div class="main-button channel-btn active-tooltip" data-ginger-tooltip-location="<?php echo esc_attr($position) ?>" data-ginger-tooltip="<?php echo esc_attr($cta_text) ?>">
                <div class="main-action-button">
                    <div class="gsb-main-action-button">
                        <a class="cta-button" href="javascript:;" role="button">
                            <?php echo esc_attr($cta_icon); ?>
                        </a>
                    </div>
                    <div class="close-gsb-action-button">
                        <a class="active-tooltip close-gsb-button" role="button" href="javascript:;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M18.83 16l8.6-8.6a2 2 0 0 0-2.83-2.83l-8.6 8.6L7.4 4.6a2 2 0 0 0-2.82 2.82l8.58 8.6-8.58 8.6a2 2 0 1 0 2.83 2.83l8.58-8.6 8.6 8.6a2 2 0 0 0 2.83-2.83z"/></svg>
                        </a>
                    </div>
                </div>
                <div class="single-btn"></div>
            </div>
        </div>
    </div>
</div>