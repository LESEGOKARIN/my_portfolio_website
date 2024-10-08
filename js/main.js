/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {   

   	// update the toggle button 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout the navigation panel
   	nav.fadeOut();   		
   	     
  	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
// 	$('#contactForm').validate({
// 		sLoader.fadeOut(); 
// 	       $('#message-warning').hide();
// 	       $('#contactForm').fadeOut();
// 	       $('#message-success').fadeIn();

// 		/* submit via ajax */
// 		submitHandler: function(form) {

// 			var sLoader = $('#submit-loader');

// 			$.ajax({      	

// 		      type: "POST",
// 		      url: "inc/sendEmail.php",
// 		      data: $(form).serialize(),
// 		      beforeSend: function() { 

// 		      	sLoader.fadeIn(); 

// 		      },
// 		      success: function(msg) {

// 	            // Message was sent
// 	            if (msg == 'OK') {
// 	            	sLoader.fadeOut(); 
// 	               $('#message-warning').hide();
// 	               $('#contactForm').fadeOut();
// 	               $('#message-success').fadeIn();   
// 	            }
// 	            // There was an error
// 	            else {
// 	            	sLoader.fadeOut(); 
// 	               $('#message-warning').html(msg);
// 		            $('#message-warning').fadeIn();
// 	            }

// 		      },
// 		      error: function() {

// 		      	sLoader.fadeOut(); 
// 		      	$('#message-warning').html("Something went wrong. Please try again.");
// 		         $('#message-warning').fadeIn();

// 		      }

// 	      });     		
//   		}

// 	});


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		

})(jQuery);

let currentSkillIndex = -1; // To track which skill is being edited

function addSkill() {
    const skillName = document.getElementById('skillName').value;
    const skillPercent = document.getElementById('skillPercent').value;

    if (skillName && skillPercent >= 0 && skillPercent <= 100) {
        const skillList = document.getElementById('skillList');

        if (currentSkillIndex === -1) {
            // Create a new skill item
            const newLi = document.createElement('li');
            newLi.innerHTML = `
                <div class="progress" style="width: ${skillPercent}%; background: #76c7c0;">
                    <span>${skillPercent}%</span>
                </div>
                <strong>${skillName}</strong>
                <div>
                    <button class="edit-btn" onclick="editSkill(this)">Edit</button>
                    <button class="delete-btn" onclick="deleteSkill(this)">Delete</button>
                </div>
            `;
            skillList.appendChild(newLi);
        } else {
            // Update the existing skill
            const skillItem = skillList.children[currentSkillIndex];
            skillItem.querySelector('strong').textContent = skillName;
            skillItem.querySelector('.progress span').textContent = skillPercent + '%';
            skillItem.querySelector('.progress').style.width = skillPercent + '%';
            currentSkillIndex = -1; // Reset for new entries
        }

        document.getElementById('skillName').value = '';
        document.getElementById('skillPercent').value = '';
    } else {
        alert('Please enter a valid skill name and percentage (0-100).');
    }
}

function editSkill(button) {
    const skillItem = button.closest('li');
    currentSkillIndex = Array.from(skillItem.parentNode.children).indexOf(skillItem);
    const skillName = skillItem.querySelector('strong').textContent;
    const skillPercent = skillItem.querySelector('.progress span').textContent.replace('%', '');

    document.getElementById('skillName').value = skillName;
    document.getElementById('skillPercent').value = skillPercent;
}

function deleteSkill(button) {
    const skillItem = button.closest
}
