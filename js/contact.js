//*************************** PHONE VERFICATION ***************************
var nameField = document.getElementById("name");
var emailField = document.getElementById("email");
var phoneField = document.getElementById("phone");
var queryField = document.getElementById("query");



function validatePhone() {
  
  var phone = phoneField.value;
  
  // Regular expression for name validation
  var nameRegex = /^[A-Za-z]+$/;
  
  if(phone===""){
    phoneField.setAttribute("placeholder", "Error: Phone field can not be empty");
    phoneField.value = "";
    phoneField.classList.add("error");
    phoneField.classList.add("error-input-animation");
    phoneField.focus();
    return false;
    
  }else if (nameRegex.test(phone)) {
    phoneField.setAttribute("placeholder", "Error: Invalid phone number");
    phoneField.value = "";
    phoneField.classList.add("error");
    phoneField.classList.add("error-input-animation");
    phoneField.focus();
    return false;
    
  } else {
    phoneField.setAttribute("placeholder", "eg. 030-1234567, 030-7654321 ...");
    phoneField.classList.remove("error");
    phoneField.classList.remove("error-input-animation");
    
    return true;
  }
}




//*************************** EMAIL VERFICATION ***************************
function validateEmail() {
  
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
function validateQuery() {
  
  var query = queryField.value;
  
  if(query===""){
    queryField.setAttribute("placeholder", "Error: Message field can not be empty");
    queryField.value = "";
    queryField.classList.add("error");
    queryField.classList.add("error-input-animation");
    queryField.focus();
    return false;
    
  }else {
    queryField.setAttribute("placeholder", "Any thing you want to ask from us");
    queryField.classList.remove("error");
    queryField.classList.remove("error-input-animation");
    
    return true;
  }
}


function scrollToElement(element) {
  const offsetTop = element.getBoundingClientRect().top;
  const scrollOptions = {
    behavior: 'smooth',
    block: 'start', 
    inline: 'nearest', 
  };

  //this adds extra 7 percent to scroll so i can see label also
  const offsetPixels = 7 * window.innerHeight / 100;
  window.scrollBy({ top: offsetTop - offsetPixels, ...scrollOptions });
}

function sendMail() {

  if(!validateName()){
    scrollToElement(nameField);
    return;
  }else if (!validateEmail()){
    scrollToElement(emailField);
    return;
  }else if(!validatePhone()){
    scrollToElement(phoneField);
    return;
  }else if(!validateQuery()){
    scrollToElement(queryField);
    return;
  }else{
    var params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("query").value,
    };
  }


  showMessageBox();

  const serviceID = "service_3uvdrk8";
  const templateID = "template_ge2gp0p";

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("query").value = "";
        document.getElementById("phone").value = "";
        console.log(res);
        hideLoadingRing();
        showSuccessMessageForContact();
    })
    .catch(err=>{
      console.log(err);
      hideLoadingRing();
      if(!showSuccessMessageForContact())
        showFailureMessageForContact();
    });

}
