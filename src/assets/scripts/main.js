/**
 * Import dependencies from node_modules
 * see commented examples below
 */

import * as bootstrap from 'bootstrap';
import $ from 'jquery';
import L from 'leaflet';
import { createApp } from 'vue';


/**
 * Import components
 */
import Calendar from './../../views/about/Calendar.vue';
import Tournament from './../../views/about/Tournament.vue';

/**
 * Write any other JavaScript below
 */

+( function() {
  /**
   * Nav
   */
  let currentLocation = window.location.pathname.slice(1, window.location.pathname.length);

  
  if (currentLocation.length > 0) {
    let html = currentLocation.slice(currentLocation.length-5, currentLocation.length)
    if (html === '.html') {
      currentLocation = currentLocation.slice(0, currentLocation.length-5);
    }
    currentPosition(currentLocation);
  }

  



  /**
  * Article 
  */ 
  if($('.about').length) {
    //Map
    createMap('map-location', 41.750306229121676, 1.8436313269920916, '', '', 'Club de tenis', 15);

    //Calendar
    createApp(Calendar).use().mount('#calendar');

    //Tournament
    createApp(Tournament).use().mount('#tournament');
  }





  /**
   * Inscription 
   */
  if($('.inscription__form').length) {
    //Change value of progress bar when input is valid    
    $('input').on('keyup', function() {
      progressForm();
    });
    

    //Allow only press key numbers
    $('.input-number').on('keydown', function (e) { 
      if ((e.which < 48 || e.which > 57) && (e.which != 8) && (e.which < 37 || e.which > 40) && (e.which != 46) && (e.which != 9) && (e.which < 96 || e.which > 105)) {
          e.preventDefault();
      }
    });     

    //Hide all steps and show first step
    $('.step').hide();
    $('.step').first().show();

    //Show or hide buttons
    stepShow();

    //When select the category the list of corresponding levels is displayed.
      $('#category').on('change', function() {
        let formCateogrySelected = $('#category').val();
        $('.level').hide();
        $('.level-'+formCateogrySelected).show();
    });

    //Show prev step
    $('#prev').on('click tap touchstart', function() {
        $('.step:visible').hide().prev().show();
        stepShow();
    });

    //Show next step after confirm all inputs are valid
    $('#next').on('click tap touchstart', function() {
      let name = $('.inscription__form__personal #name').is(':invalid');
      let surname = $('.inscription__form__personal #surname').is(':invalid');
      let age = $('.inscription__form__personal #age').is(':invalid');
      let phone = $('.inscription__form__personal #phone').is(':invalid');
      let email = $('.inscription__form__personal #email').is(':invalid');
      let address = $('.inscription__form__personal #address-personal').is(':invalid');
      let city = $('.inscription__form__personal #city-personal').is(':invalid');
      let zip = $('.inscription__form__personal #zip-personal').is(':invalid');
      
      validation(name === false && 
                surname === false && 
                age === false && 
                phone === false && 
                email === false && 
                address === false && 
                city === false && 
                zip === false
      );
    });
  
    //Validate last step 
    $('#inscription__form').on('submit', function(e) {
      let nameClub = $('.inscription__form__professional #name-club').is(':invalid');
      let phoneClub = $('.inscription__form__professional #phone-club').is(':invalid');
      let emailClub = $('.inscription__form__professional #email-club').is(':invalid');
      let addressClub = $('.inscription__form__professional #address-club').is(':invalid');
      let cityClub = $('.inscription__form__professional #city-club').is(':invalid');
      let zipClub = $('.inscription__form__professional #zip-club').is(':invalid');
      let category = $('.inscription__form__professional #category').is(':invalid');
      let level = $('.inscription__form__professional input[name="level"]:checked').length === 0;

      validation(nameClub === false && 
                phoneClub === false && 
                emailClub === false && 
                addressClub === false && 
                cityClub === false && 
                zipClub === false && 
                category === false && 
                level === false
      );

      if ($('#inscription__form').is(':valid')) {

        console.log("valid");
      }
      
  /*    if (!this.checkValidity()) {
        console.log(this.checkValidity());
        //e.stopPropagation();
      } else {
         
        setTimeout(() => {
         console.log("inside");
          this.reportValidity();
        }, 3000);
      }
      this.classList.add('was-validated');
      e.preventDefault();
*/
    });
  }

  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
} )();






/**
 * Functions
 */
//Change colors link of current position
function currentPosition(currentLocation) {
  $('.nav__link-about').removeAttr('tabindex');
  $('.nav__link').removeClass('active');

  switch (currentLocation) {
    case 'about':
      $('.nav__link-about').attr('tabindex', -1);
      $('.nav__link-about').addClass('active');
      break;
    case 'players':
      $('.nav__link-players').attr('tabindex', -1);
      $('.nav__link-players').addClass('active');
      break;
    case 'inscription':
      $('.nav__link-inscription').attr('tabindex', -1);
      $('.nav__link-inscription').addClass('active');
      break;
    case 'bibliography':
      $('.nav__link-bibliography').attr('tabindex', -1);
      $('.nav__link-bibliography').addClass('active');
      break;
    default:
      $('.nav__link-home').attr('tabindex', -1);
      $('.nav__link-brand').attr('tabindex', -1);
      $('.nav__link-home').addClass('active');
      $('.nav__link-brand').addClass('active');
      break;
  }

  
}





//Create map and marker
function createMap(el, latitude, altitude, img, alt, title, zoom){
    const mapOptions = {
        center: [latitude, altitude],
        zoom: zoom
    }

    const globalMap = 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';
    const map = new L.map(el, mapOptions);
    const layer = new L.TileLayer(globalMap);

    map.addLayer(layer);
    
    let markerOptions = {
        title: title,
        clickable: true
    }
    const marker = new L.Marker([latitude, altitude], markerOptions);
    if(img === ''){
        marker.bindPopup('<p style="text-align: center">'+title+'</p>').openPopup();
    }else{
        marker.bindPopup('<img style="width: 200px" src="'+img+'" alt="'+alt+'"><p style="text-align: center">'+title+'</p>').openPopup();
    }
    marker.addTo(map);
}



//Change value of progress bar when input is valid
function progressForm() {
  const progressBar = $('.progress__status');
  let progressStatus = 4;    
  progressBar.css('width', `${progressStatus}%`);
  progressBar.html(`${progressStatus}%`);

  const valuesArray = ['#name', '#surname', '#age', '#phone', '#email', '#address-personal', '#city-personal', '#zip-personal',
                        '#name-club', '#phone-club', '#email-club', '#address-club', '#city-club', '#zip-club', '#category']

  let category = $('.inscription__form__professional #category').is(':invalid');
  let level = $('.inscription__form__professional input[name="level"').length === 0;

  for (const value of valuesArray) {
    if( $(value).is(':invalid') === false) {
      progressStatus = progressStatus + 6;
      progressBar.css('width', `${progressStatus}%`);
      progressBar.html(`${progressStatus}%`);
    } 
  }
  
  if (($('input[name="level"]:checked').length === 0) === false) {
    progressStatus = progressStatus + 6;
    progressBar.css('width', `${progressStatus}%`);
    progressBar.html(`${progressStatus}%`);
  }
}



//Show, hide and disable buttons Prev, Next and Submit.
function stepShow () {
  let index = $('.step:visible').prop('id');
  index = parseInt(index.slice(5, index.length));
  const lengthSteps = parseInt($('.step').length);

  $('#submit').hide();
  $('#next').show();

  if (index === 1) {
      $('#prev').prop('disabled', true);
      $('#next').prop('disabled', false);
  } else if (index === lengthSteps) {
     $('#prev').prop('disabled', false);
     $('#next').prop('disabled', true).hide();
     $('#submit').show();
  } else {
     $('#prev').prop('disabled', false);
     $('#next').prop('disabled', true).show();
     $('#submit').hide();
  }

  //Show in element H3 de position
  $('#step-position').html(index + 1);
}

function validation(inputsValidate) {
  let index = $('.step:visible').prop('id');
  index = parseInt(index.slice(5, index.length));
  const lengthSteps = parseInt($('.step').length);

  $('.help-message').addClass('invalid-feedback');

  if (inputsValidate) {
    $('#inscription__form').removeClass('was-validated');
    $('.help-message').removeClass('invalid-feedback');
    if(index !== lengthSteps) {
      $('.step:visible').hide().next().show();
    }
    stepShow();
  } else {
    $('#inscription__form').addClass('was-validated');
    $('input:invalid').parent().parent().children('.invalid-feedback').show();
  }

  //While writing, detects if it is valid and deletes the class
  $('.was-validated input').on('keyup', function() {
    if($(this).is(':valid')) {
      $(this).parent().parent().children('.invalid-feedback').hide();
    } else {
      $(this).parent().parent().children('.invalid-feedback').show();
    }
  });
}