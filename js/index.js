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


    console.log("---------------------");
  });
}

// Call the loadAnnouncements function to fetch the JSON data
loadAnnouncements();