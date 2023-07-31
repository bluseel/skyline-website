const allMessageContainerElem = document.getElementById('allMessageContainer');
const messagesContainerElem = allMessageContainerElem.querySelector('#messages-container');
const headingElem = allMessageContainerElem.querySelector('#messages-container___header');

headingElem.addEventListener("click", ()=>{
  allMessageContainerElem.style.display = "none";
});


// Create an empty array to store the announcements
let announcementsData = [];

// Function to fetch the JSON data and process the announcements
function loadAnnouncements() {
  fetch('js/Announcement.json')
    .then(response => response.json())
    .then(data => {
      // Assign the fetched data to the announcementsData array
      announcementsData = data;
      
      // Call a function to process the announcements
      processAnnouncements();
    })
    .catch(error => {
      console.error('Error loading announcements:', error);
    });
}

// Function to process the announcements (you can customize this as needed)
function processAnnouncements() {
  // Filter out null values from the announcementsData array
  const filteredAnnouncements = announcementsData.filter(announcement => announcement !== null);

  // Check if all announcements are null
  if (filteredAnnouncements.length === 0) {
    console.log("Nothing to announce");
    allMessageContainerElem.style.display = "none";
    return;
  }
  
  // Access each index in the filtered array and perform any desired operations
  filteredAnnouncements.forEach((announcement, index) => {
    
    //check if it has a button at end, announcment.addButton returns false if doesn't exist
    if(announcement.addButton){
      console.log(`Announcement ${index + 1}:`);
      console.log("Does Exist:", announcement.doesExists);
      console.log("Heading:", announcement.heading);
      console.log("Subtext:", announcement.subtext);
      console.log("Add Button:", announcement.addButton);
      console.log("Button Name:", announcement.buttonName);
      console.log("Button Type:", announcement.buttonType);
      console.log("Link:", announcement.link);

    }else{
      console.log(`Announcement ${index + 1}:`);
      console.log("Does Exist:", announcement.doesExists);
      console.log("Heading:", announcement.heading);
      console.log("Subtext:", announcement.subtext);
    }

    addAnnouncementToHTML(announcement);

    console.log("---------------------");
  });
}

function addAnnouncementToHTML(announcement){
  const message = document.createElement('div');
  message.classList.add('message');
  
  const messageTitle = document.createElement('div');
  messageTitle.classList.add('message--title');
  messageTitle.textContent = announcement.heading;
  
  const messageDetail = document.createElement('div');
  messageDetail.classList.add('message__detail');

  const messageDetail_Text = document.createElement('div');
  messageDetail_Text.classList.add('message__detail--text');
  messageDetail_Text.textContent = announcement.subtext;

  const messageDetail_ButtonContainer = document.createElement('div');
  messageDetail_ButtonContainer.classList.add('message__detail--button-container');

  const messageDetail_Button_Ahref = document.createElement('a');
  messageDetail_Button_Ahref.classList.add('message__detail--button--ahref');
  messageDetail_Button_Ahref.setAttribute('href',announcement.link);

  const messageDetail_Button = document.createElement('button');
  messageDetail_Button.classList.add('message__detail--button');
  messageDetail_Button.textContent = announcement.buttonName;
  

  if(announcement.addButton){
     // Append the elements to the container
     messageDetail_Button_Ahref.appendChild(messageDetail_Button);
     messageDetail_ButtonContainer.appendChild(messageDetail_Button_Ahref);

     messageDetail.appendChild(messageDetail_Text);
     messageDetail.appendChild(messageDetail_ButtonContainer);

     message.appendChild(messageTitle);
     message.appendChild(messageDetail);

     messagesContainerElem.appendChild(message);
  }else{
     // Append the elements to the container
     messageDetail.appendChild(messageDetail_Text);

     message.appendChild(messageTitle);
     message.appendChild(messageDetail);

     messagesContainerElem.appendChild(message);
  }

}

// Call the loadAnnouncements function to fetch the JSON data
loadAnnouncements();