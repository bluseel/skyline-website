const formElem = document.getElementById("form-section");
const nameElem = formElem.querySelector('#name-input');
const fatherNameElem = formElem.querySelector('#father-name-input');
const casteElem = formElem.querySelector('#caste-input');
const genderElem = formElem.querySelector('#gender-input');
const religionElem = formElem.querySelector('#religion-input');
const placeOfBirthElem = formElem.querySelector('#place-of-birth-input');
const addressElem = formElem.querySelector('#address-input');
const phoneElem = formElem.querySelector('#phone-input');
const lastSchoolAttendedElem = formElem.querySelector('#last-school-attended-input');
const dateElem = formElem.querySelector('#date-of-birth-day');
const monthElem = formElem.querySelector('#date-of-birth-month');
const yearElem = formElem.querySelector('#date-of-birth-year');

const data = {
  name: 'none', 
  fatherName: 'none',
  caste: 'none',
  gender: 'none',
  religion: 'none',
  placeOfBirth: 'none',
  address: 'none',
  phone: 'none',
  lastSchoolAttended: 'none',
  dobDate: 'none',
  dobMonth: 'none',
  dobYear: 'none'
};


formElem.querySelector('#terms-text').addEventListener("click", function() {
  var checkbox = document.getElementById("terms-cb");
  checkbox.checked = !checkbox.checked;
});

//scrolls to that field
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

//validation for text-notEmpty
function validation(inputElem, validationType){
  
  if(validationType === "text" || validationType === "number" || validationType === "address" ){
    if(inputElem.value === ""){
      inputElem.setAttribute("placeholder", "This field can not be empty");
      inputElem.classList.add("error-placeholder");
      inputElem.classList.add("error-input-animation");
      
      scrollToElement(inputElem);
      // After the animation completes, remove the error-input-animation class, so i can re-use it
      setTimeout(function() {
        inputElem.classList.remove('error-input-animation');
      }, 1100);

      return false;
    }else{

      if(validationType === 'text'){
        const regex = /^[^0-9]+$/;
        if(!regex.test(inputElem.value)){
          inputElem.value = "";
          inputElem.setAttribute("placeholder", "This field can only have text");
          inputElem.classList.add("error-placeholder");
          inputElem.classList.add("error-input-animation");
      
         scrollToElement(inputElem);
          // After the animation completes, remove the error-input-animation class, so i can re-use it
          setTimeout(function() {
            inputElem.classList.remove('error-input-animation');
          }, 1100);

          return false;
        }
      }else if (validationType === 'number'){
        var numberRegex = /^[0-9- , ]+$/;
        if(!numberRegex.test(inputElem.value)){
          inputElem.value = "";
          inputElem.setAttribute("placeholder", "This field can only have numbers");
          inputElem.classList.add("error-placeholder");
          inputElem.classList.add("error-input-animation");
      
          scrollToElement(inputElem);
          // After the animation completes, remove the error-input-animation class, so i can re-use it
          setTimeout(function() {
            inputElem.classList.remove('error-input-animation');
          }, 1100);

          return false;
        }
      }



    }

  }else if (validationType === "div"){
    currentSelectionStr = inputElem.querySelector(".select-selected").textContent;
    if(currentSelectionStr.charAt(0) === '-'){
      currentSelection = inputElem.querySelector(".select-selected");
      
      currentSelection.classList.add("red-text");
      inputElem.classList.add("error-input-animation");
      
      scrollToElement(inputElem);
      // After the animation completes, remove the error-input-animation class, so i can re-use it
      setTimeout(function() {
        inputElem.classList.remove('error-input-animation');
      }, 1100);

      return false;
    }

  }
  


  return true;
}


function tncBoxValidation (){
  const tncBox = document.getElementById('terms-cb');
  if(tncBox.checked){
    tncBox.parentElement.classList.remove('error-input-animation');
    return true;
  }else{
    tncBox.parentElement.classList.add('error-input-animation')
    setTimeout(function() {
      tncBox.parentElement.classList.remove('error-input-animation');
    }, 1100);
    return false;
  }
}

//includes all validations
function validateAll(){
 

  const isValid = 
  (validation(nameElem, "text") && validation(fatherNameElem, "text") && validation(casteElem, "text") &&
  validation(genderElem, "div") && validation(religionElem, "text") && validation(placeOfBirthElem, "address") &&
  validation(dateElem, "div") && validation(monthElem, "div") && validation(yearElem, "div") &&
  validation(addressElem, "address") && validation(phoneElem, "number") && validation(lastSchoolAttendedElem, "text") &&
  tncBoxValidation());

  if(isValid){
    
    //saving data in object, that i will pass as url parameter
    data.name = nameElem.value;
    data.fatherName = fatherNameElem.value;
    data.caste = casteElem.value;
    data.gender = genderElem.innerText;
    data.religion = religionElem.value;
    data.placeOfBirth = placeOfBirthElem.value;
    data.address = addressElem.value;
    data.phone = phoneElem.value;
    data.lastSchoolAttended = lastSchoolAttendedElem.value;
    data.dobDate = dateElem.innerText;
    data.dobMonth = monthElem.innerText;
    data.dobYear = yearElem.innerText;
    
    return true;
  }else{
    return false;
  }
}

const myButton = document.getElementById('submit-button');
const errorPrompt = document.getElementById('errorPrompt');
myButton.addEventListener('click', (event) => {
  event.preventDefault();
  if(validateAll()){
    errorPrompt.setAttribute('data-visible', 'false');

    const params = new URLSearchParams(data);
    const queryString = params.toString();
    const url = 'finalForm.html?' + queryString;
    window.location.href = url;

  }else{
    errorPrompt.setAttribute('data-visible', 'true');
  }
});

