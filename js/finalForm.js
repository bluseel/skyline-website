
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCryYznV6UftRwhD18LHV8atSD_bOxhUw0",
    authDomain: "skyline-393414.firebaseapp.com",
    projectId: "skyline-393414",
    storageBucket: "skyline-393414.appspot.com",
    messagingSenderId: "412707884025",
    appId: "1:412707884025:web:dc3aadf04fc6e538b78b28",
    measurementId: "G-WJHQYELESB"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const analytics = firebase.analytics();

 // Function to upload the image to Firebase Storage
 function uploadImageToFirebase(dataURL, filename) {
  const storage = firebase.storage();
  const storageRef = storage.ref(`images/${filename}`);
   
  // Convert dataURL to Blob
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const imageBlob = new Blob([ab], { type: mimeString });

  return storageRef.put(imageBlob)
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    })
    .catch((error) => {
      console.error("Error uploading image to Firebase Storage:", error);
    });
 }












//getting back data from admission page here as param: URLparam thingy that lets get data from one page to another
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const data = {};

for (let param of urlParams.entries()) {
  data[param[0]] = param[1];
}


//this submit button on click
//html2Canvas
function convertToJPG() {
  showMessageBox();

  // Create a new file name based on the current date and time
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0, so we add 1
  const year = now.getFullYear();
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const fileName = `New_Admission_${day}-${month}-${year}_${hour}-${minute}.jpg`;

  const options = {
    scale: 2,
    useCORS: true
  };

  const elements = document.getElementsByClassName('final__form');
  const targetElement = elements[0]; // Adjust the index if you have multiple elements with the same class

  html2canvas(targetElement, options).then(function(canvas) {
    const dataURL = canvas.toDataURL("image/jpeg", 1.0); 

     // Upload the image to Firebase Storage
     uploadImageToFirebase(dataURL,fileName)
     .then((downloadURL) => {
        console.log("Image uploaded to Firebase Storage:", downloadURL);

            
      //email sending usng emailJS
      /*this is inside .then because this funcoitn is asynch and it runs when its completes 
        when i put my emailJS code outside this I could not get the dataURL var and would get empty string even if i 'let a var' outside this and
        change its value inside .then but since its async my code of emailJS below it runs quickly and i dont get the url */
      let params = {
        name: data.name,
        fileName: fileName,
        message: downloadURL
      };

      const serviceID = "service_3uvdrk8";
      const templateID = "template_hb7x4t2";
      
      emailjs.send(serviceID, templateID, params)
      .then(res=>{
      
      })
      .catch(err=>console.log(err));

      //code continues
       hideLoadingRing();
       closeMessage=false;
       showSuccessMessage();
     })
     .catch((error) => {
       console.error("Error uploading image to Firebase:", error);
       hideLoadingRing();
       showFailureMessage();
     });


  });
}



// console.log(document.getElementsByClassName('credentials-container'));
const credentials = document.querySelector('.credentials-container');
const nameElem = credentials.querySelector('#name-input');
const fatherName = credentials.querySelector('#fatherName-input');
const casteElem = credentials.querySelector('#caste-input');
const genderElem = credentials.querySelector('#gender-input');
const religionElem = credentials.querySelector('#religion-input');
const placeOfBirthElem = credentials.querySelector('#placeOfBirth-input');
const addressElem = credentials.querySelector('#address-input');
const addressElem2 = credentials.querySelector('#address-input-two');
const phoneElem = credentials.querySelector('#phone-input');
const lastSchoolAttendedElem = credentials.querySelector('#lastSchoolAttended-input');
const dateofBirthInFiguresElem = credentials.querySelector('#dateOfBirthFigures-input');
const dateofBirthInWordsElem = credentials.querySelector('#dateOfBirthWords-input');

nameElem.innerText = data.name;
fatherName.innerText = data.fatherName;
casteElem.innerText = data.caste;
genderElem.innerText = data.gender;
religionElem.innerText = data.religion;
placeOfBirthElem.innerText = data.placeOfBirth;
if(data.address.length > 74){
  addressElem.innerText = data.address.substring(0,75);
  addressElem2.innerText = data.address.substring(75);
}else{
  addressElem.innerText = data.address;
}
phoneElem.innerText = data.phone;
lastSchoolAttendedElem.innerText = data.lastSchoolAttended; 

//month, in figures coversion
const monthMap = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12'
};
const dobStr = data.dobDate + ' - ' + monthMap[data.dobMonth] + ' - ' +  data.dobYear;
dateofBirthInFiguresElem.innerText = dobStr;





// CONVERTING FROM NUMBERS TO WORDS FOR DATE OF BIRTH
//---- year, in words conversion ----
//checking if its 2000 or 1900
let yearInWords = '';  
if(data.dobYear.charAt(0) == "2"){
  yearInWords += 'Two Thousand and '; 
}else{
  yearInWords += 'Nineteen hundered and '; 
}

//changing last 2 digits
const remainingNum = parseInt(data.dobYear.substring(2));
const units = [  '',  'One',  'Two',  'Three',  'Four',  'Five',  'Six',  'Seven',  'Eight',  'Nine',  'Ten',  'Eleven',  'Twelve',  'Thirteen',  'Fourteen',  'Fifteen',  'Sixteen',  'Seventeen',  'Eighteen',  'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

if (remainingNum < 20) {
  yearInWords += units[remainingNum];
} else {
  const digit1 = Math.floor(remainingNum / 10);
  const digit2 = remainingNum % 10;

  if (digit2 === 0) {
    yearInWords += tens[digit1];
  } else {
    yearInWords+= tens[digit1] + ' ' + units[digit2];
  }
}

console.log(yearInWords);

//---- day, in words conversion ----
const date = parseInt(data.dobDate);
const unitsD = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'];
const tensD = ['', '', 'Twenty', 'Thirty'];

let dayInWords='';
if (date >= 1 && date <= 19) {
  dayInWords += unitsD[date];
} else if (date >= 20 && date <= 31) {
  const tensDigit = Math.floor(date / 10);
  const unitsDigit = date % 10;
  const ordinalTens = tensD[tensDigit];
  const ordinalUnits = unitsD[unitsDigit];
  
  if (unitsDigit === 0) {
    dayInWords += ordinalTens;
  } else {
    dayInWords += ordinalTens + '-' + ordinalUnits;
  }
}

const DOBInWords = dayInWords + ' - ' + data.dobMonth + ' - ' + yearInWords;
dateofBirthInWordsElem.innerText = DOBInWords;


//putting data in undertaking sectoin
const undertaking = document.querySelector('.undertaking');
const UfatherNameElem = undertaking.querySelector('#fatherName-input');
const UnameElem = undertaking.querySelector('#name-input');
UfatherNameElem.innerText = data.fatherName;
UnameElem.innerText = data.name;


//preview thingy -------------------------
const mirrorContainer = document.getElementById('mirror-container');
const mirrorImage = document.getElementById('mirror');
const previewElem = document.getElementById('preview-btn');
const cross = document.getElementById('cross');
const closePreviewTextElem = document.getElementById('close-preview-text');


html2canvas(document.querySelector('.final__form')).then(function(canvas) {
  const dataURL = canvas.toDataURL();
  mirrorImage.src = dataURL;
});

previewElem.addEventListener('click', ()=>{

  mirrorContainer.setAttribute('data-visible',true);
  cross.setAttribute('data-visible',true);
  closePreviewTextElem.setAttribute('data-visible',true);
});

cross.addEventListener('click', () =>{
  mirrorContainer.setAttribute('data-visible',false);
  cross.setAttribute('data-visible',false);
  closePreviewTextElem.setAttribute('data-visible',false);
});

closePreviewTextElem.addEventListener('click', ()=>{
  mirrorContainer.setAttribute('data-visible',false);
  cross.setAttribute('data-visible',false);
  closePreviewTextElem.setAttribute('data-visible',false);
});





