
var emailField = document.getElementById("lname");
var subjectEmail = document.getElementById("subject");
var subjectChecker = false;
var emailChecker = false;
var nameChecker = false;

let loading = document.querySelector(".loading");
let errorMessage = document.querySelector(".error-message");
let sentMessage = document.querySelector(".sent-message");

function validateEmail(){
    if(!emailField.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)){
        emailChecker = false;
        return false;
    }else{
        emailChecker = true;
        return true;
    }
}

function validateName(){
    var nameEmail = document.getElementById("fname").value;
    if(/^[A-Za-z\s]+$/.test(nameEmail) && (nameEmail.match(/[A-Za-z]/g) || []).length >= 3){
        nameChecker = true;
        return true;
    }else{
        nameChecker = false;
        return false;
    }
    
}

// Form submit
$("#submit-form").submit((e) => {
  e.preventDefault();

  if (emailChecker && nameChecker) {
    // Show loading
    loading.style.display = "block";
    sentMessage.style.display = "none";
    errorMessage.style.display = "none";

    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbyZZyxLmVC7bbqBSOEdDf5hY20dOWIcsOkQwvdHlQCri0wax_CqH1ncyf_gl16CMttY/exec",
      data: $("#submit-form").serialize(),
      method: "post",
      success: function () {
        loading.style.display = "none";
        sentMessage.style.display = "block";

        // Hide after 4 seconds
        setTimeout(() => {
          sentMessage.style.display = "none";
        }, 4000);

        $("#submit-form")[0].reset();
      },
      error: function () {
        loading.style.display = "none";
        errorMessage.style.display = "block";

        // Hide after 4 seconds
        setTimeout(() => {
          errorMessage.style.display = "none";
        }, 4000);
      }
    });
  } else {
    // Invalid input
    loading.style.display = "none";
    errorMessage.innerText = "Please enter valid name and email.";
    errorMessage.style.display = "block";

    // Hide after 4 seconds
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 4000);
  }
});
