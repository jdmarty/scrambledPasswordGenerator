//Global variables and DOM assignments
//assign strings containing each type of acceptable character"
var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "123456789";
var specialChar = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
//assign list items by ID
var lowercaseOption = document.getElementById('lowercaseOption');
var uppercaseOption = document.getElementById('uppercaseOption');
var numbersOption = document.getElementById('numbersOption');
var specialOption = document.getElementById('specialOption');

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
  var characterOptions = "";
  //reset DOM Elements
  lowercaseOption.textContent = "Lowercase"
  uppercaseOption.textContent = "Uppercase"
  numbersOption.textContent = "Numbers"
  specialOption.textContent = "Special Characters"

  //ask user what character options they would like in their password
  //ask the user if they want to include lowercase letters
  var wantLCL = confirm(
    `Do you want lowercase letters in your password?`);
  //if they do, add lowercase letters to the options string
  if (wantLCL) {
    characterOptions += lowercaseLetters;
    lowercaseOption.textContent += ' ✔'
  } else {
    lowercaseOption.textContent += " ❌";
  }
  //ask the user if they want to include uppercase letters
  var wantUCL = confirm(
    `Do you want uppercase letters in your password?`
  );
  //if they do, add uppercase letters to the options string
  if (wantUCL) {
    characterOptions += uppercaseLetters;
    uppercaseOption.textContent += " ✔";
  } else {
    uppercaseOption.textContent += " ❌";
  }
  //ask the user if they want to include numbers
  var wantNum = confirm(
    `Do you want numbers in your password?`
  );
  //if they do, add numbers to the options string
  if (wantNum) {
    characterOptions += numbers;
    numbersOption.textContent += " ✔";
  } else {
    numbersOption.textContent += " ❌";
  }
  //ask the user if they want to include special characters
  var wantSpec = confirm(
    `Do you want special characters in your password?`
  );
  //if they do, add them to the options string
  if (wantSpec) {
    characterOptions += specialChar;
    specialOption.textContent += " ✔";
  } else {
    specialOption.textContent += " ❌";
  }
  //If the user has not selected any character types at this time, alert them and end the function
  if (!wantLCL && !wantUCL && !wantNum && !wantSpec) {
    alert("ERROR you must select at least on valid input type");
    return "";
  }
  //prompt user to enter a number between 8 and 128 until they do so successfully
  while (passwordLength < 8 || passwordLength > 128 || !passwordLength) {
    //password length must be parsed as an integer, meaning it will return a whole number or NaN (falsy)
    passwordLength = parseInt(
      prompt(
        `How many characters do you want in your password? (8 to 128)`
      )
    );
    //check to see if the user input is in the acceptable range and a truthy values
    if (passwordLength < 8 || passwordLength > 128 || !passwordLength) {
      //give the user an option to cancel the prompts here
      var badInput = confirm("Invalid entry please enter a number between 8 and 128");
      if (!badInput) return "";
    }
  }
  //Show the user their selections and ask them to confirm that this is what they want to generate
  var confirmGenerate = confirm(
    `Are you sure you want a password ${passwordLength} characters long containing: \n${wantLCL ? "lowercase letters?\n" : ''}${wantUCL ? "uppercase letters?\n" : ''}${wantNum ? "numbers?\n" : ""}${wantSpec ? "special characters?" : ''}`
  );
  //if the user confirms that they want to procede, continue to generating a password
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
      password = password + newChar;
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
