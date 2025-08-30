$(document).ready(function() {
  // Toggle password visibility
  $("#togglePassword").on("click", function() {
    let passwordField = $("#password");
    let fieldType = passwordField.attr("type");
    passwordField.attr("type", fieldType === "password" ? "text" : "password");
  });

  // Form validation
  $("#registrationForm").on("submit", function(event) {
    event.preventDefault();
    let errors = [];

    let username = $("#username").val().trim();
    let email = $("#email").val().trim();
    let phone = $("#phone").val().trim();
    let password = $("#password").val().trim();

    // Name validation
    if (username === "") {
      errors.push("Name is required.");
    }

    // Email validation
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Invalid email format.");
    }

    // Phone validation
    let phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      errors.push("Phone number must be 10 digits.");
    }

    // Password validation
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.push("Password must be at least 8 characters, include uppercase, lowercase, and a number.");
    }

    // Show messages
    if (errors.length > 0) {
      $("#message").removeClass("success").addClass("error")
        .html(errors.join("<br>")).fadeIn();
    } else {
      $("#message").removeClass("error").addClass("success")
        .html("Form submitted successfully!").fadeIn();

      $("#registrationForm")[0].reset();
    }
  });
});
