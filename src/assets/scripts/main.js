/**
 * Import dependencies from node_modules
 * see commented examples below
 */

import * as bootstrap from 'bootstrap';
import $ from 'jquery';
import { createApp } from 'vue';
import { buttonsForm, createMap, currentPage, progressForm, validation } from './function';

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
      /*
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
       
      */
      for (let i = 0; i < stepsForm.length; i++) {  
        if (index === i+1) {
          validation(stepsForm[i]);
        }
      }
    });
  
    //Validate last step 
   /* $('#inscription__form').on('submit', function(e) {

    });*/


    inscriptionForm.addEventListener('submit', e => {
      console.log("init");
      let index = $('.step:visible').prop('id');
      index = parseInt(index.slice(5, index.length));
      for (let i = 0; i < stepsForm.length; i++) {  
        if (index === i+1) {
          console.log(stepsForm[i]);
          validation(stepsForm[i]);
        }
      }

      console.log("after validation");

      if (!inscriptionForm.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      inscriptionForm.classList.add('was-validated');

      console.log("after bootstrap");

      handleSubmit(e, stepsForm);
    }, false);



    // Loop over them and prevent submission
    /*inscriptionForm.addEventListener('submit', handleSubmit, event => {
      console.log("aqui");
      let nameClub = $('.inscription__form__professional #name-club').is(':invalid');
      let phoneClub = $('.inscription__form__professional #phone-club').is(':invalid');
      let emailClub = $('.inscription__form__professional #email-club').is(':invalid');
      let addressClub = $('.inscription__form__professional #address-club').is(':invalid');
      let cityClub = $('.inscription__form__professional #city-club').is(':invalid');
      let zipClub = $('.inscription__form__professional #zip-club').is(':invalid');
      let category = $('.inscription__form__professional #category').is(':invalid');
      let level = $('.inscription__form__professional input[name="level"]').is(':checked');

      validation(nameClub === false && 
                phoneClub === false && 
                emailClub === false && 
                addressClub === false && 
                cityClub === false && 
                zipClub === false && 
                category === false && 
                level === true
      );
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      form.classList.add('was-validated')
    }, false);*/


  }

  //Code Bootstrap and Netlify to prevent send form
  //const inscriptionForm = document.getElementById('inscription__form');
  function handleSubmit(e) {
    e.preventDefault();
    const myForm = e.target;
    const formData = new FormData(myForm);
    
    console.log("netlify");
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        alert("Send")
          $('.status__spinner').removeClass()
          $('.status__spinner').addClass('status__spinner');
          $('.status__spinner').addClass('success');
      })
      .catch((error) => {
        alert("error")
        $('.status__spinner').removeClass()
        $('.status__spinner').addClass('status__spinner');
        $('.status__spinner').addClass('failed');
      });
  };

  
} )();