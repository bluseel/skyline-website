const messageBoxElem = document.getElementById('message');
const overlayElem = document.getElementById('overlay');
const submitElem = document.getElementById('submit-btn');

const response = messageBoxElem.querySelector('#response-message-container');
const icon = messageBoxElem.querySelector('#response-icon-container');
const btn = response.querySelector('#response-button-container');



// Function to show the loading ring
function showMessageBox() {
  messageBoxElem.style.display = 'block';
  overlay.style.display = 'block';
}

// Function to hide the loading ring
function hideLoadingRing() {
  const loadingRingElem = messageBoxElem.querySelector('#loading-ring');
  const loadingMessageElem = messageBoxElem.querySelector('#loading-message');
  loadingRingElem.style.display= 'none';
  loadingMessageElem.style.display= 'none';
}


// Function to show the success message
function showSuccessMessage(message) {
  response.style.display= 'flex';
  icon.style.display= 'flex';
  
  //change icon to 'Tick', message to 'Success' and button to 'Go Home'
  icon.querySelector('img').setAttribute('src','images/tickMessage.png')
  response.firstChild.textContent = "Form sent Successfully :) Please visit our school to confirm your admission. Address is on Contact Page";
  btn.firstChild.innerText = 'Go To Main Page';
 
}


//Function to show unsuccess message
function showFailureMessage() {

  response.style.display= 'flex';
  icon.style.display= 'flex';
  
  icon.querySelector('img').setAttribute('src','images/crossMessage.png')
  response.firstChild.textContent = "Error while sending form :( Please visit our campus to get your admission. Address is on Contact Page";
  btn.firstChild.innerText = 'Close';
  // btn.setAttribute('href', "https://www.google.com")

}

function showFailureMessageForContact(){
  response.style.display= 'flex';
  icon.style.display= 'flex';
  
  icon.querySelector('img').setAttribute('src','images/crossMessage.png')
  response.firstChild.textContent = "Error while sending :( Please visit our campus to get while we fix the issue";
  btn.firstChild.innerText = 'Close';
  response-button-container.setAttribute('href','contact.html');
}

function showSuccessMessageForContact(message) {
  response.style.display= 'flex';
  icon.style.display= 'flex';
  
  //change icon to 'Tick', message to 'Success' and button to 'Go Home'
  icon.querySelector('img').setAttribute('src','images/tickMessage.png')
  response.firstChild.textContent = "Message sent Successfully :) We will respond back as soon as possible";
  btn.firstChild.innerText = 'Close';
  response-button-container.setAttribute('href','contact.html');
  return true;

}


// Function to handle form submission
submitElem.addEventListener('click', ()=> {
  // Show the loading ring while the image is being uploaded
  showMessageBox();
});

//this variable here decides if the message box will only be closed or it will send you to home page
let closeMessage = true;

btn.addEventListener('click', (event)=>{
  event.preventDefault();
  if(closeMessage){
    messageBoxElem.style.display='none';
    overlayElem.style.display = 'none';
  }else{
    window.location.href = 'index.html';
  }
});