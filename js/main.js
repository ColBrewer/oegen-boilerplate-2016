// DELETE LINES 1-3 OF THIS FILE WHEN INTEGRATING INTO PRODUCTION ENVIRONMENT
// dev.js is imported for html include support and any other js solely required for development purposes
//@prepros-append dev.js

$(document).ready(function(){


	// Footer

    $(window).scroll(function() {              
      $(document).scrollTop() > 100 ? $('#log:hidden').fadeIn() : $('#log:visible').fadeOut();
    });


    // Header video

    $('.header-video').each(function(i, elem) {
        headerVideo = new HeaderVideo({
          element: elem,
          media: '.header-video__media',
          playTrigger: '.header-video__play-trigger',
          closeTrigger: '.header-video__close-trigger',
          videoTitle: '.videoTitle',
          videoStrap: '.videoStrap',
          moreInfo: '.moreInfo',
          mobVideoWrap: '.mob-video-wrap'
        });
    });


  // Images owl carousel

    $('#owl-images').owlCarousel({
        items:1,
        merge:true,
        loop:true,
        margin:0,
        video:true,
        lazyLoad:true,
        nav:true,
        center:true,
                
        responsive:{
            768:{

            },
            1160:{

            }
        }
    })

	// Video owl carousel

    $('#owl-video').owlCarousel({
        items:1,
        merge:true,
        loop:true,
        margin:10,
        video:true,
        lazyLoad:true,
        nav:true,
        center:true,
                
        responsive:{

            1160:{
              stagePadding: 300,
            }
        }
    })
    

    
// Awards carousel

 
  $("#owl-awards").owlCarousel({
 
      autoPlay: 3000, //Set AutoPlay to 3 seconds
      nav:true,
      items : 1,
      loop: true,
        responsive:{
            768:{
                items:2,
                slideBy: 2
            },
            1160:{
                items:3,
                slideBy: 3
            }
        }

  });




  // accordion 

  $('.accordion__title').each(function(){
    $(this).click(function(){
      $(this).parents('.wrapper').toggleClass('active');
      $(this).toggleClass('open');
      $(this).next('.accordion__content').toggleClass('show');
    });
  });





  // jQuery RWD Image Maps

    $('img[usemap]').rwdImageMaps();





  // Tooltip for image map

    $('.tooltip').tooltipster({
         animation: 'grow',
        delay: [200, 100],
        contentAsHTML: 'true',
        side: ['left', 'right','top', 'bottom' ],
        theme: 'tooltipster-noir'
    });

    // $('.tipso').tipso();


    $('.tooltip-footer').tooltipster({
         animation: 'grow',
        delay: [200, 100],
        contentAsHTML: 'true',
        side: ['top', 'right' ],
        theme: 'tooltipster-shadow'
    });





});