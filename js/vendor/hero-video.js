/*global Modernizr, $ */

// /**
//  * Reponsive and gracefully degrading header video
//    More info on http://zerosixthree.se/create-a-responsive-header-video-with-graceful-degradation/
//  * -----------------------------------------------------------------------------
//  */
'use strict';

var HeaderVideo = function(settings) {
    if (settings.element.length === 0) {
        return;
    }
    this.init(settings);
};

HeaderVideo.prototype.init = function(settings) {
    this.$element = $(settings.element);
    this.settings = settings;
    this.videoDetails = this.getVideoDetails();
    this.teaserElement = undefined;

    $(this.settings.closeTrigger).hide();
    this.setFluidContainer();
    this.bindUIActions();

    if(this.videoDetails.teaser && Modernizr.video && !Modernizr.touch) {
        this.appendTeaserVideo();
    }
};

HeaderVideo.prototype.bindUIActions = function() {
    var that = this;
    $(this.settings.playTrigger).on('click', function(e) {
        e.preventDefault();
        console.log(that.teaserElement);
        // that.teaserElement.hide();
        that.appendIframe();
    });
    $(this.settings.closeTrigger).on('click', function(e){
        e.preventDefault();
        // that.teaserElement.show();
        that.removeIframe();
    });
};

HeaderVideo.prototype.appendIframe = function() {
    var html = '<iframe id="header-video__video-element" src="'+this.videoDetails.videoURL+'?rel=0&amp;hd=1&amp;autohide=1&amp;showinfo=0&amp;autoplay=1&amp;enablejsapi=1&amp;origin=*" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"></iframe>';
    $(this.settings.playTrigger).fadeOut();
    $(this.settings.videoTitle).fadeOut();
    $(this.settings.videoStrap).fadeOut();
    $(this.settings.moreInfo).fadeOut();
    $(this.settings.mobVideoWrap).fadeOut();
    $(this.settings.closeTrigger).fadeIn();
    
    this.$element.append(html);

    this.$element.find('#header-video__teaser-video').remove();

};

HeaderVideo.prototype.removeIframe = function() {
    $(this.settings.playTrigger).fadeIn();
    $(this.settings.videoTitle).fadeIn();
    $(this.settings.videoStrap).fadeIn();
    $(this.settings.moreInfo).fadeIn();
    $(this.settings.mobVideoWrap).fadeIn();
    $(this.settings.closeTrigger).fadeOut();
    this.$element.find('#header-video__video-element').remove();

    this.appendTeaserVideo();
};

HeaderVideo.prototype.appendTeaserVideo = function() {
    var source = this.videoDetails.teaser;
    var html = '<video autoplay="true" loop="true" muted id="header-video__teaser-video" class="header-video__teaser-video"><source src="'+source+'.webm" type="video/mp4"><source src="'+source+'.mp4" type="video/mp4"></video>';
    // this.teaserElement = $(html);
    this.$element.append(html);
};

HeaderVideo.prototype.setFluidContainer = function() {
    var element = this.$element;
    element.data('aspectRatio', this.videoDetails.videoHeight / this.videoDetails.videoWidth);

    $(window).resize(function() {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        element.width(Math.ceil(windowWidth));
        element.height(Math.ceil(windowWidth * element.data('aspectRatio'))); //Set the videos aspect ratio, see https://css-tricks.com/fluid-width-youtube-videos/

        if(windowHeight < element.height()) {
            element.width(Math.ceil(windowWidth));
            element.height(Math.ceil(windowHeight));
        }
    }).trigger('resize');
};

HeaderVideo.prototype.getVideoDetails = function() {
    var mediaElement = $(this.settings.media);

    return {
        videoURL: mediaElement.attr('data-video-URL'),
        teaser: mediaElement.attr('data-teaser'),
        videoHeight: mediaElement.attr('data-video-height'),
        videoWidth: mediaElement.attr('data-video-width')
    };
};
