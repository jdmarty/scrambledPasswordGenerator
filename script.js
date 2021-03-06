//Global variables and DOM assignments
//assign strings containing each type of acceptable character"
var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "123456789";
var specialChar = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
//assign initial global values
var [wantLCL, wantUCL, wantNum, wantSpec] = [false, false, false, false]
var passwordLength = 0;
var characterOptions = '';
//assign DOM elements by ID
var criteria = document.getElementById('criteria');
var optionsPanel = document.getElementById('optionsPanel');
var passwordText = document.querySelector("#password");
var copiedAlert = document.getElementById('copiedAlert');

//Assign buttons
var generateBtn = document.querySelector("#generate");
var regenerateBtn = document.querySelector('#regenerate');
var copyBtn = document.querySelector('#copy');

//Write password to the #password input
function writePassword() {
  var password = generatePassword();
  passwordText.value = password;
}

//Rewrite password based on current global variables
function rewritePassword() {
  var password = buildPassword(passwordLength);
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//Add event listener to regenerate button
regenerateBtn.addEventListener("click", rewritePassword);

//Add event listener to copy button
copyBtn.addEventListener("click", copyToClipboard);

//generatePassword function
function generatePassword() {
  //reset initial values
  passwordLength = 0;
  characterOptions = "";
  //hide the options panel if it is not hidden already
  optionsPanel.style.display = "none";
  //reset DOM Elements
  numberOfCharacters.textContent = "Number of Characters: ";
  criteria.innerHTML = '';
  //prompt user to enter a number between 8 and 128 and set the global length variable to the returned value
  passwordLength = promptNumber();
  //if the user selected to end the prompts, end the function here
  if (!passwordLength) return "";
  //otherwise, print the users number of characters selection to the DOM
  numberOfCharacters.textContent = `Number of Characters: ${passwordLength}`;

  //ask the user if they want to include lowercase letters and update global variable
  wantLCL = promptChoice("lowercase letters", lowercaseLetters, 'Lowercase');
  //ask the user if they want to include uppercase letters and update global variable
  wantUCL = promptChoice("uppercase letters", uppercaseLetters, 'Uppercase');
  //ask the user if they want to include numbers and update global variable
  wantNum = promptChoice("numbers", numbers, 'Numbers');
  //ask the user if they want to include special characters and update global variable
  wantSpec = promptChoice("special characters", specialChar, 'Special Characters');
  //If the user has not selected any character types at this time, alert them and end the function
  if (!wantLCL && !wantUCL && !wantNum && !wantSpec) {
    alert("ERROR you must select at least on valid input type");
    return "";
  }

  //Show the user their selections and ask them to confirm that this is what they want to generate
  var confirmGenerate = confirm(
    `Are you sure you want a password ${passwordLength} characters long containing: \n\n${
      wantLCL ? "lowercase letters?\n" : ""
    }${wantUCL ? "uppercase letters?\n" : ""}${wantNum ? "numbers?\n" : ""}${
      wantSpec ? "special characters?" : ""
    }`
  );
  //if the user does not confirm that they want to proceed, end the function here
  if (!confirmGenerate) return "";
  
  //run the buildPassword helper function, which will keep calling until it generates a password that meets criteria
  return buildPassword(passwordLength);
}

//function to copy current password to clipboard
function copyToClipboard() {
  //check that there is something to copy
  if (password.value) {
    //if there is, select the text area and run a copy command
    passwordText.select();
    document.execCommand("copy");
    //display the copied alert
    copiedAlert.style.display = 'block';
    //after the animation is finished, hide the copied alert
    setTimeout(() => copiedAlert.style.display = 'none', 990);
  }
}

//Helper Functions//
//--------------------------------------------------------------------------------------------------------------------
//random integer function
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//function to call a confirm, containing an input string, associated characters, and DOM element to update 
function promptChoice(promptString, characters, domString) {
  //ask the user to confirm if they want a certain type of character
  var wanted = confirm(`Do you want ${promptString} in your password?`);
  //if they do, update the global character options variable and the associated DOM element
  if (wanted) {
    characterOptions += characters;
    var newCriteria = document.createElement('li');
    newCriteria.textContent = `${domString} ✔`;
    criteria.append(newCriteria);
  };
  //return the result of the confirm prompt
  return wanted;
}

//function to prompt the user to enter a number
function promptNumber() {
  //parse the prompt as an integer so it returns a whole number or NaN (falsy)
  var passwordLength = parseInt(prompt("How many characters do you want in your password?\nMin: 8 characters\nMax: 128 characters"));
  //validate the response is in acceptable range and truthy
  if (passwordLength < 8 || passwordLength > 128 || !passwordLength) {
    //give the user an option to end the prompts here
    var badInput = confirm("Invalid input. Please enter a number between 8 and 128");
    if (!badInput) return false;
    //or run the function again if they confirm
    return promptNumber();
  } else {
    //if the password length is in range, return it
    return passwordLength;
  }
}

//function to build a password of the desired length and attributes
function buildPassword(passwordLength) {
  //set initial values
  var [includesLCL, includesUCL, includesNum, includesSpec] = [false, false, false, false]
  var password = "";
  //until you have generated a password of the appropriate length...
  for (let i = 0; i < passwordLength; i++) {
    //select a new character from the string of valid options
    newChar = characterOptions[getRandomInt(characterOptions.length - 1)];
    //check what type of character you have selected and change the associated boolean value
    if (lowercaseLetters.includes(newChar)) includesLCL = true;
    if (uppercaseLetters.includes(newChar)) includesUCL = true;
    if (numbers.includes(newChar)) includesNum = true;
    if (specialChar.includes(newChar)) includesSpec = true;
    //add the new character to your password
    password += newChar;
  }
  //if all of the desired character types are present in the password...
  if (
    includesLCL === wantLCL &&
    includesUCL === wantUCL &&
    includesNum === wantNum &&
    includesSpec === wantSpec
  ) {
    //display the options panel
    optionsPanel.style.display = "block";
    //and return the password
    return password;
  } else {
    //otherwise run the function again
    return buildPassword(passwordLength);
  }
}


