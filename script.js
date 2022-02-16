
  var myVar;

  function myFunction() {
    myVar = setTimeout(showPage, 3800);
  }
  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
  }


var Tabs = function ($) {
  return {

    init: function () {
      this.cacheDom();
      this.setupAria();
      this.appendIndicator();
      this.bindEvents();
    },

    cacheDom: function () {
      this.$el = $('.tabs');
      this.$tabList = this.$el.find('ul');
      this.$tab = this.$tabList.find('li');
      this.$tabFirst = this.$tabList.find('li:first-child a');
      this.$tabLink = this.$tab.find('a');
      this.$tabPanel = this.$el.find('section');
      this.$tabPanelFirstContent = this.$el.find('section > *:first-child');
      this.$tabPanelFirst = this.$el.find('section:first-child');
      this.$tabPanelNotFirst = this.$el.find('section:not(:first-of-type)');
    },

    bindEvents: function () {
      this.$tabLink.on('click', function () {
        this.changeTab();
        this.animateIndicator($(event.currentTarget));
      }.bind(this));
      this.$tabLink.on('keydown', function () {
        this.changeTabKey();
      }.bind(this));
    },

    changeTab: function () {
      var self = $(event.target);
      event.preventDefault();
      this.removeTabFocus();
      this.setSelectedTab(self);
      this.hideAllTabPanels();
      this.setSelectedTabPanel(self);
    },

    animateIndicator: function (elem) {
      var offset = elem.offset().left;
      var width = elem.width();
      var $indicator = this.$tabList.find('.indicator');

      console.log(elem.width());

      $indicator.transition({
        x: offset,
        width: elem.width()
      })
    },

    appendIndicator: function () {
      this.$tabList.append('<div class="indicator"></div>');
    },

    changeTabKey: function () {
      var self = $(event.target),
        $target = this.setKeyboardDirection(self, event.keyCode);

      if ($target.length) {
        this.removeTabFocus(self);
        this.setSelectedTab($target);
      }
      this.hideAllTabPanels();
      this.setSelectedTabPanel($(document.activeElement));
      this.animateIndicator($target);
    },

    hideAllTabPanels: function () {
      this.$tabPanel.attr('aria-hidden', 'true');
    },

    removeTabFocus: function (self) {
      var $this = self || $('[role="tab"]');

      $this.attr({
        'tabindex': '-1',
        'aria-selected': null
      });
    },

    selectFirstTab: function () {
      this.$tabFirst.attr({
        'aria-selected': 'true',
        'tabindex': '0'
      });
    },

    setupAria: function () {
      this.$tabList.attr('role', 'tablist');
      this.$tab.attr('role', 'presentation');
      this.$tabLink.attr({
        'role': 'tab',
        'tabindex': '-1'
      });
      this.$tabLink.each(function () {
        var $this = $(this);

        $this.attr('aria-controls', $this.attr('href').substring(1));
      });
      this.$tabPanel.attr({
        'role': 'tabpanel'
      });
      this.$tabPanelFirstContent.attr({
        'tabindex': '0'
      });
      this.$tabPanelNotFirst.attr({
        'aria-hidden': 'true'
      });
      this.selectFirstTab();
    },

    setKeyboardDirection: function (self, keycode) {
      var $prev = self.parents('li').prev().children('[role="tab"]'),
        $next = self.parents('li').next().children('[role="tab"]');

      switch (keycode) {
        case 37:
          return $prev;
          break;
        case 39:
          return $next;
          break;
        default:
          return false;
          break;
      }
    },

    setSelectedTab: function (self) {
      self.attr({
        'aria-selected': true,
        'tabindex': '0'
      }).focus();
    },

    setSelectedTabPanel: function (self) {
      $('#' + self.attr('href').substring(1)).attr('aria-hidden', null);
    },

  };
}(jQuery);

Tabs.init();


var wobbleElements = document.querySelectorAll('.wobble');
jQuery(document).ready(function( $ ) {

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Header fixed on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Real view height for mobile devices
  if (window.matchMedia("(max-width: 767px)").matches) {
    $('#intro').css({ height: $(window).height() });
  }

  // Initiate the wowjs animation library
  new WOW().init();

  // Initialize Venobox
  $('.venobox').venobox({
    bgcolor: '',
    overlayColor: 'rgba(6, 12, 34, 0.85)',
    closeBackground: '',
    closeColor: '#fff'
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center:true,
    responsive: { 0: { items: 1 }, 768: { items: 3 }, 992: { items: 4 }, 1200: {items: 5}
    }
  });

  // Buy tickets select the ticket type on click
  $('#buy-ticket-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data('ticket-type');
    var modal = $(this);
    modal.find('#ticket-type').val(ticketType);
  })

// custom code

});



//NAVIGATION BAR
const hamburger=document.querySelector(".hamburger");
const navmenu=document.querySelector(".nav-menu");
const links=document.querySelectorAll(".nav-menu li");

hamburger.addEventListener('click',()=>{
    navmenu.classList.toggle("open");
    links.forEach(link=>{
        link.classList.toggle("fade");
    });

    hamburger.classList.toggle("toggle");
});
