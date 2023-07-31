// Generate options for days
const dayDropdown = document.getElementById("date-of-birth-day");
var dayDropDownList = dayDropdown.querySelector(".select-options");

for (var day = 1; day <= 31; day++) {
  var div = document.createElement('div');
  if(day<10){
    div.textContent = '0'+day;
  }else{
    div.textContent = day;
  }
  div.classList.add('select-option');
  dayDropDownList.appendChild(div);
  
}

// Generate options for months
var monthDropdown = document.getElementById("date-of-birth-month");
var monthDropDownList = monthDropdown.querySelector(".select-options");
var months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
for (var i = 0; i < months.length; i++) {
  var div = document.createElement('div');
  div.textContent = months[i];
  div.classList.add('select-option');
  monthDropDownList.appendChild(div);
  
}

// Generate options for years
var yearDropdown = document.getElementById("date-of-birth-year");
var yearDropDownList = yearDropdown.querySelector(".select-options");
for (var year = 2023; year >= 1970; year--) {
  var div = document.createElement('div');
  div.textContent = year;
  div.classList.add('select-option');
  yearDropDownList.appendChild(div);
  
}



//meow
const selectDropdowns = document.querySelectorAll('.custom-select');

selectDropdowns.forEach(function(selectDropdown) {
  const selectSelected = selectDropdown.querySelector('.select-selected');
  const selectOptions = selectDropdown.querySelector('.select-options');

  selectSelected.addEventListener('click', function() {
    selectOptions.style.display = selectOptions.style.display === 'block' ? 'none' : 'block';
  });
  
  const selectOptionElements = selectDropdown.querySelectorAll('.select-option');
  selectOptionElements.forEach(function(option) {
    option.addEventListener('click', function() {
      selectSelected.textContent = this.textContent;
      selectOptions.style.display = 'none';

      //this here returns the selectedOption color back to black which is converted red in admission.js during validation
      selectSelected.classList.add("black-text");
    });
  });
});
