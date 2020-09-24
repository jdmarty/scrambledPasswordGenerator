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
  var lowercaseLetters = 'abscdefghijklmnopqrstuvwxyz';
  var uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numbers = '123456789'
  var specialChar = " !\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
  //set initial values
  var includesLCL = false;
  var includesUCL = false;
  var includesNum = false;
  var includesSpec = false;
  var passwordLength = 0;
  var characterOptions = '';
  //prompt user to enter a number between 8 and 128 until they do so successfully
  while (passwordLength < 8 || passwordLength > 128 || !passwordLength) {
    passwordLength = parseInt(prompt('How many characters would you like in your password? (8 to 128)'));
    if (!passwordLength) return ''
    if (passwordLength < 8 || passwordLength > 128 || !passwordLength) alert("Invalid entry please enter a number between 8 and 128");
  }

}


//random integer function
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}