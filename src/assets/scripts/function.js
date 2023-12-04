/**
 * Functions
 */

//Import
import L from 'leaflet';
import $, { error } from 'jquery';


//Change colors link depends of current web page
function currentPage(currentLocation) {
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

  const valuesInvalid = ['#name', '#surname', '#age', '#phone', '#email', '#address-personal', '#city-personal', '#zip-personal',
                        '#name-club', '#phone-club', '#email-club', '#address-club', '#city-club', '#zip-club', '#category'];

  const valuesChecked = ['input[name="level"]'];

  for (const value of valuesInvalid) {
    if($(value).is(':invalid') === false) {
      progressStatus = progressStatus + 6;
      progressBar.css('width', `${progressStatus}%`);
      progressBar.html(`${progressStatus}%`);
    } 
  }

  for (const value of valuesChecked) {
    if($(value).is(':checked') === true) {
      progressStatus = progressStatus + 6;
      progressBar.css('width', `${progressStatus}%`);
      progressBar.html(`${progressStatus}%`);
    } 
  }
}



//Show, hide and disable buttons Prev, Next and Submit.
function buttonsForm () {
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
  $('#step-position').html(index);
}


//Validation forms
function validation(inputsArray, form) {
    let validInputs = [];
    let invalidForm = true;    

  
    $('.help-message').addClass('invalid-feedback');

    for (let i = 0; i < inputsArray.length; i++) {
        let inputRadio = inputsArray[i].slice(0,1) === '#' ? false : true;

        if (inputRadio === false) {
            $(inputsArray[i]).is(':invalid') === true ? validInputs.push(false) : validInputs.push(true);
        } else {
            $(inputsArray[i]).is(':checked') === false ? validInputs.push(false) : validInputs.push(true);
        }
    }

    invalidForm = validInputs.includes(false);

    if ($('#'+form.id).children('.step').length > 0) {
        const lengthSteps = parseInt($('.step').length);
        let index = $('.step:visible').prop('id');
        index = parseInt(index.slice(5, index.length));

        if(!invalidForm) {
            $('#'+form.id).removeClass('was-validated');
            $('.help-message').removeClass('invalid-feedback');
            if(index !== lengthSteps) {
                $('.step:visible').hide().next().show();
            }
            buttonsForm();
        } else {
            $('#'+form.id).addClass('was-validated');
            $('input:invalid').parent().parent().children('.invalid-feedback').show();
        }
    } else {
        if(!invalidForm) {
            $('#'+form.id).removeClass('was-validated');
            $('.help-message').removeClass('invalid-feedback');
        } else {
            $('#'+form.id).addClass('was-validated');
            $('#'+form.id+' :invalid').parent().parent().children('.invalid-feedback').show();
            $('#'+form.id+' :invalid').parent().parent().children('.invalid-feedback').children().show();
        }
    }
    

    $('.was-validated input').on('keyup', function() {
        if($(this).is(':valid')) {
          $(this).parent().parent().children('.invalid-feedback').hide();
        } else {
          $(this).parent().parent().children('.invalid-feedback').show();
        }
    });

    return invalidForm;
}

//Code Bootstrap and Netlify to prevent send form
function handleSubmit(e, inputsForm, form, titleMessage) {
    e.preventDefault();
    const myForm = e.target;
    const formData = new FormData(myForm);
    let formInvalid = true;

    
    if ($('#'+form.id).children('.step').length > 0) {
        let index = $('.step:visible').prop('id');
        index = parseInt(index.slice(5, index.length));
        for (let i = 0; i < inputsForm.length; i++) {  
            if (index === i+1) {
                formInvalid = validation(inputsForm[i], form);
            }
        }
    } else {
        formInvalid = validation(inputsForm, form);
    }
    

    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    form.classList.add('was-validated');

    if(formInvalid === false) {
        $('.message-form').show();
        $('.message-form__title').html(`Enviando ${titleMessage}.`);
        $('html, body').animate({
            scrollTop: 0, 
        }, 500, 'swing');

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString(),
        })
        .then(() => {
            setTimeout(() => {
                let counter = 3;
                $('.message-form__title').html(`Se ha enviado ${titleMessage}.`);
                $('.message-form__title').addClass('success');
                $('.message-form__status__spinner').addClass('success');

                $('.message-form__info').append(`<h4>Redirigiendo a la página de inicio en:</h4><p>${counter}</p>`);

                setTimeout(() => {                
                    setInterval(() => {
                        if(counter != 0) {
                            counter = counter - 1;
                            $('.message-form__info p').text(counter);
                        } else {
                            window.location.href = '/';
                        }
                    }, 1000);
                }, 1000);
            }, 2500);
            
        })
        .catch((error) => {
            setTimeout(() => {
                $('.message-form__title').html(`No se ha podido enviar ${titleMessage}.`);
                $('.message-form__title').addClass('error');
                $('.message-form__status__spinner').addClass('error');

                $('.message-form__info').append(`<h4>Error: ${error}</h4>`);
            }, 2000);
        });
    }
  }

export { buttonsForm, createMap, currentPage, progressForm, validation, handleSubmit }