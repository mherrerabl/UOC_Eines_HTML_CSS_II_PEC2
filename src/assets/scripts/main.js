/**
 * Import dependencies from node_modules
 * see commented examples below
 */

import * as bootstrap from 'bootstrap';
import $ from 'jquery';
import { createApp } from 'vue';
import { buttonsForm, createMap, currentPage, progressForm, validation, handleSubmit } from './function';

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
    currentPage(currentLocation);
  }

  /**
   * Contact form
   */
  const conctactForm = document.getElementById('contact-form');
  const inputValues = ['#name-user', '#email-user', '#message-user'];
  conctactForm.addEventListener('submit', e => {
    handleSubmit(e, inputValues, conctactForm, 'el mensaje');
  }, false);
  



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
    //variables
    const inscriptionForm = document.getElementById('inscription__form');
    const inputsStep1 = ['#name', '#surname', '#age', '#phone', '#email', '#address-personal', '#city-personal', '#zip-personal'];
    const inputsStep2 = ['#name-club', '#phone-club', '#email-club', '#address-club', '#city-club', '#zip-club', '#category', 'input[name="level"'];
    const stepsForm = [inputsStep1, inputsStep2];


    //Hide all steps and show first step
    $('.step').hide();
    $('.step').first().show();

    //Show or hide buttons
    buttonsForm();

    //Initial value progress
    progressForm();

    //Allow only press key numbers
    $('.input-number').on('keydown', function (e) { 
      if ((e.which < 48 || e.which > 57) && (e.which != 8) && (e.which < 37 || e.which > 40) && (e.which != 46) && (e.which != 9) && (e.which < 96 || e.which > 105)) {
          e.preventDefault();
      }
    }); 

    //Change value of progress bar when input is valid    
    $('input').on('keyup', function() {
      progressForm();
    });    
        
    //When select the category the list of corresponding levels is displayed.
    $('#category').on('change', function() {
      let formCateogrySelected = $('#category').val();
      $('.level').hide();
      $('.level-'+formCateogrySelected).show();
      progressForm();
    });

    $('input[name="level"]').on('change', function() {
      progressForm();
    });

    //Show prev step
    $('#prev').on('click tap touchstart', function() {
      $('.step:visible').hide().prev().show();
      buttonsForm();
    });

    //Show next step after confirm all inputs are valid
    $('#next').on('click tap touchstart', function() {
      let index = $('.step:visible').prop('id');
      index = parseInt(index.slice(5, index.length));
     
      for (let i = 0; i < stepsForm.length; i++) {  
        if (index === i+1) {
          validation(stepsForm[i], inscriptionForm);
        }
      }

      $('html, body').animate({
        scrollTop: 0, 
      }, 0, 'swing');
    });

    inscriptionForm.addEventListener('submit', e => {
      handleSubmit(e, stepsForm, inscriptionForm, 'la inscripción');
    }, false);

  }  
} )();