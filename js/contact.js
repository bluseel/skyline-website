//*************************** EMAIL VERFICATION ***************************
function validateEmail() {
  
  var emailField = document.getElementById("email");
  var email = emailField.value;
  
  // Regular expression for email validation
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if(email===""){
    emailField.setAttribute("placeholder", "Error: Email field can not be empty");
    emailField.value = "";
    emailField.classList.add("error");
    emailField.classList.add("error-input-animation");
    emailField.focus();
    return false;
    
  }else if ( !emailRegex.test(email)) {
    emailField.setAttribute("placeholder", "Error: Invalid email");
    emailField.value = "";
    emailField.classList.add("error");
    emailField.classList.add("error-input-animation");
    emailField.focus();
    return false;
    
  } else {
    emailField.setAttribute("placeholder", "eg. shafiquesahito@example.com");
    emailField.classList.remove("error-placeholder");
    emailField.classList.remove("error-input-animation");
    
    return true;
  }
}

//*************************** Name VERFICATION ***************************
function validateName() {
  
  var nameField = document.getElementById("name");
  var name = nameField.value;
  
  // Regular expression for name validation
  var nameRegex = /^[A-Za-z]+$/;
  
  if(name===""){
    nameField.setAttribute("placeholder", "Error: Name field can not be empty");
    nameField.value = "";
    nameField.classList.add("error");
    nameField.classList.add("error-input-animation");
    nameField.focus();
    return false;
    
  }else if ( !nameRegex.test(name)) {
    nameField.setAttribute("placeholder", "Error: Invalid name");
    nameField.value = "";
    nameField.classList.add("error");
    nameField.classList.add("error-input-animation");
    nameField.focus();
    return false;
    
  } else {
    nameField.setAttribute("placeholder", "eg. Shafique Sahito");
    nameField.classList.remove("error");
    nameField.classList.remove("error-input-animation");
    
    return true;
  }
}

//*************************** Message VERFICATION ***************************
function validateMessage() {
  
  var messageField = document.getElementById("message");
  var message = messageField.value;
  
  if(message===""){
    messageField.setAttribute("placeholder", "Error: Message field can not be empty");
    messageField.value = "";
    messageField.classList.add("error");
    messageField.classList.add("error-input-animation");
    messageField.focus();
    return false;
    
  }else {
    messageField.setAttribute("placeholder", "Any thing you want to ask from us");
    messageField.classList.remove("error");
    messageField.classList.remove("error-input-animation");
    
    return true;
  }
}

function sendMail() {
  if (validateName() && validateEmail() && validateMessage()){
    var params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };
  }else{
    return;
  }
  
  
  const serviceID = "service_3uvdrk8";
  const templateID = "template_hb7x4t2";

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Your message sent successfully!!")

    })
    .catch(err=>console.log(err));

}
