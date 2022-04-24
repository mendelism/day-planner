currentTime = moment();
inputEls = $("textarea");
saveBtn = $(".saveBtn");

// Object that will be sent to/updated by local storage
let savedItems = {
  nine: "",
  ten: "",
  eleven: "",
  twelve: "",
  one: "",
  two: "",
  three: "",
  four: "",
  five: "",
  six: "",
}

// Add date and time to header
$("#currentDay").text(currentTime.format("MMM Do, YYYY"));
$("#currentTime").text(currentTime.format("hh:mma"));

// Check whether an input row of time planTime is current, past, or in the future
// and color the row accordingly
for (i = 0; i < inputEls.length; i++) {
  planTime = parseInt(inputEls[i].attributes[2].value);
  currentHour = parseInt(currentTime.format("H"));
  if (planTime < currentHour) {
    $(inputEls[i]).addClass("past");
  } else if (planTime == currentHour) {
    $(inputEls[i]).addClass("present");
  } else {
    $(inputEls[i]).addClass("future");
  }
};

// Gets input saved by button click and calls saveToStorage on it
let saveItem = function(event) {
  event.preventDefault();
  let targetTime = $(event.target).attr("data-btn-time"); // time attribute of clicked button
  let targetInputField = $("[data-input-time='" + targetTime + "']") // textarea element associated with clicked button
  let targetInput = targetInputField.val(); // value oftextarea element
  let targetTimeString = targetInputField.attr("id"); // target time as a string
  saveToStorage(targetInput, targetTimeString); // save input to storage
}

// take input and its time (as a string) and save it to the savedItems property of the same name, then save the object to storage
function saveToStorage(input, idString) {
  if (idString == "nine") {
    savedItems.nine = input;
  } else if (idString == "ten") {
    savedItems.ten = input;
  } else if (idString == "eleven") {
    savedItems.eleven = input;
  } else if (idString == "twelve") {
    savedItems.twelve = input;
  } else if (idString == "one") {
    savedItems.one = input;
  } else if (idString == "two") {
    savedItems.two = input;
  } else if (idString == "three") {
    savedItems.three = input;
  } else if (idString == "four") {
    savedItems.four = input;
  } else if (idString == "five") {
    savedItems.five = input;
  } else if (idString == "six") {
    savedItems.six = input;
  }
  localStorage.setItem("savedItems", JSON.stringify(savedItems));
};

// retrieve savedItems from local storage
function getFromStorage() {
  let retrievedItems = JSON.parse(localStorage.getItem("savedItems"));
  // if any properties of savedItems from local storage exist, write them to savedItems
  if (retrievedItems) {
    savedItems = retrievedItems;
  }
// populate time textareas with saved property values
  let i = 0;
  for (const prop in retrievedItems) {
    console.log(`retrievedItems.${prop} = ${retrievedItems[prop]}`)
    $(inputEls[i]).val(`${retrievedItems[prop]}`);
    i++;
  }
}

saveBtn.on("click", saveItem);

getFromStorage();