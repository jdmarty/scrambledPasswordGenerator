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
  //create initial empty arrays for letters
  var lowercaseLetters = "abscdefghijklmnopqrstuvwxyz";
  var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numbers = "123456789";
  var specialChar = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  //set initial values
  var includesLCL = false;
  var includesUCL = false;
  var includesNum = false;
  var includesSpec = false;
  var passwordLength = 0;
  var characterOptions = "";

  //ask user what character options they would like in their password
  var wantLCL = confirm(`Do you want lowercase letters in your password?`);
  if (wantLCL) characterOptions += lowercaseLetters;
  var wantUCL = confirm(
    `Do you want uppercase letters in your password?\n lowercase: ${
      wantLCL ? "Yes" : "No"
    }`
  );
  if (wantUCL) characterOptions += uppercaseLetters;
  var wantNum = confirm(
    `Do you want numbers in your password?\n lowercase: ${
      wantLCL ? "Yes" : "No"
    }\n uppercase ${wantUCL ? "Yes" : "No"}`
  );
  if (wantNum) characterOptions += numbers;
  var wantSpec = confirm(
    `Do you want special characters in your password?\n lowercase: ${
      wantLCL ? "Yes" : "No"
    }\n uppercase: ${wantUCL ? "Yes" : "No"}\n numbers: ${
      wantNum ? "Yes" : "No"
    }`
  );
  if (wantSpec) characterOptions += specialChar;
  //If the user has not selected any character types, alert them and end the function
  if (!wantLCL && !wantUCL && !wantNum && !wantSpec) {
    alert("ERROR you must select at least on valid input type");
    return "";
  }
  //prompt user to enter a number between 8 and 128 until they do so successfully
  while (passwordLength < 8 || passwordLength > 128 || !passwordLength) {
    passwordLength = parseInt(
      prompt("How many characters would you like in your password? (8 to 128)")
    );
    if (!passwordLength) return "";
    if (passwordLength < 8 || passwordLength > 128 || !passwordLength)
      alert("Invalid entry please enter a number between 8 and 128");
  }
  //Show the user their selections and ask them to confirm that this is what they want to generate
  var confirmGenerate = confirm(
    `Are you sure you want a password ${passwordLength} characters long containing:\n${
      wantLCL ? "lowercase letters?\n" : ""
    }${wantUCL ? "uppercase letters?\n" : ""}${wantNum ? "numbers?\n" : ""}${
      wantSpec ? "special characters?" : ""
    }`
  );
  if (!confirmGenerate) return "";
  //until the function is returned...
  while (true) {
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