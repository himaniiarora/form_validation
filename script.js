$(document).ready(function() {
  // allow only digits in phone field
  $("#phone").on("input", function() {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  $("#username").on("input", function() {
    this.value = this.value.replace(/[^A-Za-z\s]/g, '');
  });
  
  // toggle password visibility
  $("#togglePassword").on("click", function() {
    let passwordField = $("#password");
    let fieldType = passwordField.attr("type");
    passwordField.attr("type", fieldType === "password" ? "text" : "password");
  });

  // confirm password validation
  $("#confirmPassword").on("input", function() {
    let password = $("#password").val();
    let confirmPassword = $(this).val();
    if (password !== confirmPassword) {
      $("#passwordError").text("Passwords do not match!");
    } else {
      $("#passwordError").text("");
    }
  });

  // form validation
  $("#registrationForm").on("submit", function(event) {
    event.preventDefault();
    let errors = [];

    let username = $("#username").val().trim();
    let email = $("#email").val().trim();
    let phone = $("#phone").val().trim();
    let password = $("#password").val().trim();
    let confirmPassword = $("#confirmPassword").val().trim();

    // name validation
    let nameRegex = /^[A-Za-z\s]+$/;
    if (username === "") {
      errors.push("Name is required.");
    } else if (!nameRegex.test(username)) {
      errors.push("Name must contain only letters (no numbers or special characters).");
    }

    // email validation
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Invalid email format.");
    }

    // phone validation
    let phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      errors.push("Phone number must be 10 digits.");
    }

    // password validation
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.push("Password must be at least 8 characters, include uppercase, lowercase, and a number.");
    }

    // confirm password validation
    if (password !== confirmPassword) {
      errors.push("Passwords do not match.");
    }

    // show messages
    if (errors.length > 0) {
      $("#message").removeClass("success").addClass("error")
        .html(errors.join("<br>")).fadeIn();
    } else {
      $("#message").removeClass("error").addClass("success")
        .html("Form submitted successfully!").fadeIn();
    
     // form reset
      $("#registrationForm")[0].reset();

      setTimeout(function() {
        $("#message").fadeOut();
      }, 3000);
    }
  });
});
