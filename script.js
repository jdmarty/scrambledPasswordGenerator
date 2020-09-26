//Global variables and DOM assignments
//assign strings containing each type of acceptable character"
var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "123456789";
var specialChar = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var characterOptions = ''
//assign options panel elements by ID
var lowercaseOption = document.getElementById('lowercaseOption');
var uppercaseOption = document.getElementById('uppercaseOption');
var numbersOption = document.getElementById('numbersOption');
var specialOption = document.getElementById('specialOption');
var numberOfCharacters = document.getElementById('numberOfCharacters')

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//generatePassword function
function generatePassword() {
  //set initial values
  var includesLCL = false;
  var includesUCL = false;
  var includesNum = false;
  var includesSpec = false;
  var passwordLength = 0;
  characterOptions = "";

  //reset DOM Elements
  lowercaseOption.textContent = "Lowercase";
  uppercaseOption.textContent = "Uppercase";
  numbersOption.textContent = "Numbers";
  specialOption.textContent = "Special Characters";
  numberOfCharacters.textContent = "Number of Characters: ";

  //prompt user to enter a number between 8 and 128 until they do so successfully
  var passwordLength = promptNumber();
  //if the user selected to end the prompts, end the function here
  if (!passwordLength) return "";
  //otherwise, print the users number of characters selection to the DOM
  numberOfCharacters.textContent = `Number of Characters: ${passwordLength}`;

  //ask the user if they want to include lowercase letters
  var wantLCL = promptChoice("lowercase letters", lowercaseLetters, lowercaseOption);
  //ask the user if they want to include uppercase letters and update the option in DOM
  var wantUCL = promptChoice("uppercase letters", uppercaseLetters, uppercaseOption);
  //ask the user if they want to include numbers
  var wantNum = promptChoice("numbers", numbers, numbersOption);
  //ask the user if they want to include special characters
  var wantSpec = promptChoice("special characters", specialChar, specialOption);
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

  //until the function is returned...
  while (true) {
    //set the initial password to an empty string
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
    //if all of the desired character types are present in the password, return the password, this will end the loop
    if (
      includesLCL === wantLCL &&
      includesUCL === wantUCL &&
      includesNum === wantNum &&
      includesSpec === wantSpec
    )
      return password;
  }
}

//random integer function
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//function to call a confirm containing an input string, associated characters, and DOM element to update 
function promptChoice(promptString, characters, element) {
  //ask the user to confirm if they want a certain type of character
  var wanted = confirm(`Do you want ${promptString} in your password?`);
  //if they do, update the global character options variable and the associated DOM element
  if (wanted) {
    characterOptions += characters;
    element.textContent += " ✔";
  //if they dont, just update the associated DOM element
  } else {
    element.textContent += " ❌";
  }
  //return the result of the confirm prompt
  return wanted;
}

//function to prompt the user to enter a number
function promptNumber() {
  //parse the prompt as an integer so it returns a whole number or NaN (falsy)
  var passwordLength = parseInt(prompt("How many characters do you want in your password?"));
  //validate the response is in acceptable range and truthy
  if (passwordLength < 8 || passwordLength > 128 || !passwordLength) {
    //give the user an option to end the prompts here
    var badInput = confirm("Invalid entry please enter a number between 8 and 128");
    if (!badInput) return false;
    //or run the function again if they confirm
    return promptNumber();
  } else {
    //if the password length is in range, return it
    return passwordLength;
  }
}