(function($) {

  "use strict";

  // init Isotope
	var initIsotope = function () {

		$('.grid').each(function () {

			// $('.grid').imagesLoaded( function() {
			// images have loaded
			var $buttonGroup = $('.button-group');
			var $checked = $buttonGroup.find('.is-checked');
			var filterValue = $checked.attr('data-filter');

			var $grid = $('.grid').isotope({
				itemSelector: '.portfolio-item',
				// layoutMode: 'fitRows',
				filter: filterValue
			});

			// bind filter button click
			$('.button-group').on('click', 'a', function (e) {
				e.preventDefault();
				filterValue = $(this).attr('data-filter');
				$grid.isotope({ filter: filterValue });
			});

			// change is-checked class on buttons
			$('.button-group').each(function (i, buttonGroup) {
				$buttonGroup.on('click', 'a', function () {
					$buttonGroup.find('.is-checked').removeClass('is-checked');
					$(this).addClass('is-checked');
				});
			});
			// });

		});
	}

  var initTexts = function(){
    // Wrap every letter in a span
     $('.txt-fx').each(function(){
      this.innerHTML = this.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    });

    anime.timeline()
      .add({
        targets: '.txt-fx .letter',
        translateX: [0,-30],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 100,
        delay: (el, i) => 0
      });
  }
  var animateTexts = function(){

    anime.timeline()
      .add({
        targets: '.slick-current .txt-fx .letter',
        translateX: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 30 * i
      });
  }

  var hideTexts = function(){

    anime.timeline()
      .add({
        targets: '.slick-current .txt-fx .letter',
        translateX: [0,-30],
        opacity: [1,0],
        easing: "easeInExpo",
        duration: 1100,
        delay: (el, i) => 30 * i
      })
  }

  // initialize all the sliders
// initialize all the sliders
var initSlider = function() {
  // homepage slider | slick slider
  $('.main-slider').slick({
      autoplay: true, // Enable autoplay
      autoplaySpeed: 2000, // Set the speed to 3000ms (3 seconds)
      fade: true,
      prevArrow: $('.prev'),
      nextArrow: $('.next'),
  });

  $('.main-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
      hideTexts();
      console.log('beforeChange');
  });

  $('.main-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
      animateTexts();
      console.log('afterChange');
  });
  
  initTexts();
  animateTexts();
}

  // animate search box
  var searchButton = function() {
    // search box toggle
    $('#header-wrap').on('click', '.search-toggle', function(e) {
      var selector = $(this).data('selector');

      $(selector).toggleClass('show').find('.search-input').focus();
      $(this).toggleClass('active');

      e.preventDefault();
    });

    


    // close when click off of container
    $(document).on('click touchstart', function (e){
      if (!$(e.target).is('.search-toggle, .search-toggle *, #header-wrap, #header-wrap *')) {
        $('.search-toggle').removeClass('active');
        $('#header-wrap').removeClass('show');
      }
    });
  }

  // initialize tabs
  var jsTabs = function() {
    // portfolio tabs
    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
          tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
          tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
      })
    });
  }

  // stick header on the top
  var stickyHeader = function() {
    // header menu
    var StickyHeader = new hcSticky('#header.fixed', {
      stickTo: 'body',
      top: 0,
      bottomEnd: 200,
      responsive: {
        1024: {
          disable: true
        }
      }
    });
  }

  var overlayMenu = function () {
    if (!$('.nav-overlay').length) {
      return false;
    }
  
    var body = undefined;
    var menu = undefined;
    var menuItems = undefined;
  
    var init = function init() {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-btn');
      menuItems = document.querySelectorAll('.nav__list-item a'); // Select the anchor links
      var portfolioButton = document.querySelector('.btn-wrap a'); // Select the "View my portfolio" button
      applyListeners(portfolioButton);
    };
  
    // Add event listeners
    var applyListeners = function applyListeners(portfolioButton) {
      menu.addEventListener('click', function () {
        toggleClass(body, 'nav-active'); // Open/close menu
      });
  
      // Close menu and handle clicks on nav items
      menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function (e) {
          var targetID = this.getAttribute('href'); // Get target section or page URL
  
          // If it's an anchor link (starts with '#'), scroll to the section
          if (targetID.startsWith('#')) {
            e.preventDefault(); // Prevent default jump
            var targetSection = document.querySelector(targetID); // Get the section element
  
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: 'smooth' });
            }
          } else {
            // For other pages, just navigate to the link
            window.location.href = targetID; // Navigate to another page
          }
  
          // Close the overlay menu
          body.classList.remove('nav-active');
        });
      });
  
      // Close menu and scroll to portfolio section on button click
      portfolioButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump
        var targetID = this.getAttribute('href'); // Get target section ID
        var targetSection = document.querySelector(targetID); // Get the section element
  
        // Scroll smoothly to the section
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
  
        // Close the overlay menu
        body.classList.remove('nav-active');
      });
    };
  
    // Toggle the class to open/close the overlay menu
    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) {
        element.classList.remove(stringClass);
      } else {
        element.classList.add(stringClass);
      }
    };
  
    init();
  };
  
  // init Chocolat light box
  var initChocolat = function() {
    Chocolat(document.querySelectorAll('.image-link'), {
        imageSize: 'contain',
        loop: true,
    })
  }

  $(document).ready(function(){

    stickyHeader();
    searchButton();
    initSlider();
    jsTabs();
    initChocolat();
    overlayMenu();


  }); // End of document ready

        var myVar;

        function myFunction() {
            myVar = setTimeout(showPage, 3000);
        }

        function showPage() {
            document.getElementsByClassName("preloader")[0].style.display = "none";
            document.getElementById("myDiv").style.display = "block";
            window.location.href = "index.html"; // Redirect to a new URL
        }

        window.onload = myFunction; // Call the function when the window loads

})(jQuery);