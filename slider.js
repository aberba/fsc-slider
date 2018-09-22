$(function() {
    $(".fscslider").fscSlider({
        slideWidth: 900,
        slideSpeed: 1000,
        slideInterval: 2000,
        tooltipWidth: 400,
        tooltipBackgroundColor: "rgba(0,0,0,0.8)",
        tooltipTextColor: "white"
    });
});
/**
 * Name           :  fscSlider.js
 * Version        :  0.0.1
 * Author         :  Lawrence Aberba (amazingws.0fees.us, twitter: @laberba)
 * Copyright      :  Copyright (c) 2015 Laberba Creative Works
 * Description    :  A fast, simple and clean coded slider which works :)
 * Dependencies   :  jQuery Version 1 or never

                     Default configuration options for fscSlider
                     Note: Do not add any 'px' to arguments for width and height because
                           they are added by default in the code
                     defaultOptions = {
                         slideWidth: 600,
                         slideHeight: 300,
                         slideSpeed: 350,
                         slideInterval: 3000,
                         tooltipTextColor: "rgba(0, 0, 0, 0.8)",
                         tooltipBackgroundColor: "#ffffff",
                         tooltipWidth: 300,
                         tooltipHeight: null,
                     };
 */

;(function($) {
    $.fn.fscSlider = function(customOptions) {
    	var options = $.extend({}, $.fn.fscSlider.defaultOptions, customOptions);
        var slideAllowed = true;

        var slider = $(this);
        slider.css({
            width: options.slideWidth + "px",
            height: (options.slideHeight === null) ? options.slideHeight + "px" : "auto",
        });

        // Configure sildes
        slider.children("img").addClass("slide"); // Give each slide a className of "slide"
        slider.children("img:first").addClass("current"); // Set first slide as current

        // Set slide width with the optinal slide with
        slider.children("img").css({
            width: options.slideWidth + "px",
            height: (options.slideHeight === null) ? options.slideHeight + "px" : "auto",
        });


        //create textbox for each slider image alt text
        var tooltip = $("<div />", {"class":"tooltip-div"}).css({
            position: "absolute",
            top: "20px",
            left: "20px",
            padding: "5px",
            borderRadius: "3px",
            textAlign: "center",
            color: options.tooltipTextColor,
            width: options.tooltipWidth + "px",
            height: (options.tooltipHeight === null) ? options.tooltipHeight + "px" : "auto",
            backgroundColor: options.tooltipBackgroundColor,
            zIndex: 3
        })
        .append( $("<h4 />").html(slider.children("img.current").data("tooltipheader")) )
        .append( $("<p />").html(slider.children("img.current").data("tooltipcontent")) );

        slider.append(tooltip);

        // Add navigation arrows
        var nextArrow = $("<span />", {"class":"arrow next", "html":"&raquo;"});
        var prevArrow = nextArrow.clone().removeClass("next").addClass("prev").html("&laquo;");
        slider.append(nextArrow).append(prevArrow);

        /**
         * Function called to slide to next image
         * Note: this function takes a boolen argument, true for forward slide and
           false for back slide
         */
        var _next = function(direction) {
            if (direction === null || direction === undefined) throw new Error("_next() expects a boolean argument 'direction'");

            var current = slider.children("img.current"),
                next,
                delta = 1; // -1 for back slide animation offset and +1 for forward slide offset
                delta = 1;

            if (direction) { // true boolen means slide forward
                next    = current.next();
                if (!next.is("img.slide")) next = slider.children("img:first");
                delta = 1;

            } else { // "false" boolen means slide back
                next = current.prev();
                if (!next.is("img.slide")) next = slider.children("img:last");
                delta = -1;
            }


            // Fadeout tooltip
            tooltip.fadeOut("slow");

            // When delta is +ve, slide image will be displaced right in the animation
            // else when delta is -ve, slide image will be displaced left.
            next.animate({ left: (options.slideWidth * delta) + "px" }, 200, "linear", function() {
                next.addClass("current");
                current.removeClass("current").addClass("previous");

                next.animate({left:0}, options.slideSpeed, "linear", function() {
                    current.removeClass("previous");
                    // Update tootip text:
                    tooltip.children("h4").html(next.data("tooltipheader"));
                    tooltip.children("p").html(next.data("tooltipcontent"));
                    tooltip.fadeIn("slow");
                });

            });

        }


        // Make event binding and setInterval for forward slide
        slider.children(".next").on("click", function() {
            _next(true);
        });

        slider.children(".prev").on("click", function() {
            _next(false);
        });

        setInterval(function() {
            if (slideAllowed) _next(true);
        }, options.slideInterval);
    };

    $.fn.fscSlider.defaultOptions = {
        slideWidth: 600,
        slideHeight: 300,
        slideSpeed: 350,
        slideInterval: 3000,
        tooltipTextColor: "#000000",
        tooltipBackgroundColor: "#ffffff",
        tooltipWidth: 300,
        tooltipHeight: null,
    };

}(jQuery));
