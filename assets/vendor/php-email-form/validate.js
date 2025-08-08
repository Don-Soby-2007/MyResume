/**
* PHP Email Form Validation - v3.9
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
// (function () {
//   "use strict";

//   let forms = document.querySelectorAll('.php-email-form');

//   forms.forEach( function(e) {
//     e.addEventListener('submit', function(event) {
//       event.preventDefault();

//       let thisForm = this;

//       let action = thisForm.getAttribute('action');
//       let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
//       if( ! action ) {
//         displayError(thisForm, 'The form action property is not set!');
//         return;
//       }
//       thisForm.querySelector('.loading').classList.add('d-block');
//       thisForm.querySelector('.error-message').classList.remove('d-block');
//       thisForm.querySelector('.sent-message').classList.remove('d-block');

//       let formData = new FormData( thisForm );

//       if ( recaptcha ) {
//         if(typeof grecaptcha !== "undefined" ) {
//           grecaptcha.ready(function() {
//             try {
//               grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
//               .then(token => {
//                 formData.set('recaptcha-response', token);
//                 php_email_form_submit(thisForm, action, formData);
//               })
//             } catch(error) {
//               displayError(thisForm, error);
//             }
//           });
//         } else {
//           displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
//         }
//       } else {
//         php_email_form_submit(thisForm, action, formData);
//       }
//     });
//   });

//   function php_email_form_submit(thisForm, action, formData) {
//     fetch(action, {
//       method: 'POST',
//       body: formData,
//       headers: {'X-Requested-With': 'XMLHttpRequest'}
//     })
//     .then(response => {
//       if( response.ok ) {
//         return response.text();
//       } else {
//         throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
//       }
//     })
//     .then(data => {
//       thisForm.querySelector('.loading').classList.remove('d-block');
//       if (data.trim() == 'OK') {
//         thisForm.querySelector('.sent-message').classList.add('d-block');
//         thisForm.reset(); 
//       } else {
//         throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
//       }
//     })
//     .catch((error) => {
//       displayError(thisForm, error);
//     });
//   }

//   function displayError(thisForm, error) {
//     thisForm.querySelector('.loading').classList.remove('d-block');
//     thisForm.querySelector('.error-message').innerHTML = error;
//     thisForm.querySelector('.error-message').classList.add('d-block');
//   }

// })();

var emailField = document.getElementById("lname");
var emailError = document.getElementById("email-error");
var subjectEmail = document.getElementById("subject");
var subjectChecker = false;
var emailChecker = false;
var nameChecker = false;


function validateEmail(){
    if(!emailField.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailError.innerHTML = "Please enter a valide email address";
        emailChecker = false;
        return false;
    }else{
        emailError.innerHTML="";
        emailChecker = true;
        return true;
    }
}

function validateName(){
    var nameEmail = document.getElementById("fname").value;
    if(/^[A-Za-z\s]+$/.test(nameEmail)){
        nameChecker = true;
        return true;
    }else{
        nameChecker = false;
        return false;
    }
    
}

$("#submit-form").submit((e)=>{
        e.preventDefault()
        if(emailChecker && nameChecker){
            $.ajax({
                url:"https://script.google.com/macros/s/AKfycbyZZyxLmVC7bbqBSOEdDf5hY20dOWIcsOkQwvdHlQCri0wax_CqH1ncyf_gl16CMttY/exec",
                data:$("#submit-form").serialize(),
                method:"post",
                success:function (response){
                    alert("Form submitted successfully")
                    window.location.reload()
                    //window.location.href="https://google.com"
                },
                error:function (err){
                    alert("Something Error")
    
                }
            })
        }else{
            alert("please input in all fieldes");
        }
    })
