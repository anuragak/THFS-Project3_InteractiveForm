
//Section 1 Basic Info
//highlight the first text input
document.querySelector('#name').focus();
document.querySelector('#other-title').hidden = true;

const creditCardDiv = document.getElementById('credit-card');
const submitButton = document.querySelector('button');
const tshirtLegend = document.querySelectorAll('legend')[1];
const activitiesLegend = document.querySelectorAll('legend')[2];
const checkBoxList = document.querySelectorAll('input[type=checkbox]');
const nameId = document.querySelector('#name');
const emailId = document.querySelector('#mail');
const paymentOptions = document.getElementById('payment');
const paymentLegend = document.querySelectorAll('legend')[3];
const cardNumberId = document.querySelector('#cc-num');
const zipCodeId = document.getElementById('zip');
const cvvId = document.getElementById('cvv');
const otherJob = document.querySelector('#other-title');


//event listener to other to display the other text input box
document.querySelector(`form`).title.addEventListener('change', function(e){
  if(e.target.value === 'other'){
    otherJob.hidden = false
    otherJob.nextElementSibling.hidden = false;
  }else{
    otherJob.hidden = true;
    otherJob.nextElementSibling.hidden = true;
  }
})

//Section 2 T-Shirt Info
function clearColorOptions(){
  if(document.querySelector(`form`).design.value === `Select Theme`){
    document.getElementById(`colors-js-puns`).style.display = `none`;
  }
}

clearColorOptions();

document.querySelector(`form`).design.addEventListener('change', function(e){
  const colorOptions = document.getElementById(`colors-js-puns`);

  if(e.target.value === 'js puns'){
    colorOptions.style.display = `block`;
    for(i=0; i<colorOptions.lastElementChild.length; i++){
      colorOptions.lastElementChild[i].style.display = 'block'
      if(colorOptions.lastElementChild[i].innerHTML.includes('♥')){
        colorOptions.lastElementChild[i].style.display = 'none'
      } else{colorOptions.lastElementChild.selectedIndex=i}
    }
  }

  if(e.target.value === 'heart js'){
    colorOptions.style.display = `block`;
    for(i=0; i<colorOptions.lastElementChild.length; i++){
      colorOptions.lastElementChild[i].style.display = 'block'
      if(colorOptions.lastElementChild[i].innerHTML.includes('Puns')){
        colorOptions.lastElementChild[i].style.display = 'none'
      } else{colorOptions.lastElementChild.selectedIndex=i}
    }
  }
  clearColorOptions()
})

//Section 3 Register for Activities
document.querySelectorAll('fieldSet')[2].addEventListener('change', function(){
  const checkBoxObjects = document.querySelectorAll(`input[type=checkbox]`);
  let totalCost = 0;
  for(let i = 0; i<checkBoxObjects.length; i++){
    if (checkBoxObjects[i].checked === true){
      totalCost += Number(checkBoxObjects[i].nextSibling.data.slice(-3))
    }
  }

  function inputClash(firstNumber, secondNumber){ //
    if(checkBoxObjects[firstNumber].checked === true){
      checkBoxObjects[secondNumber].disabled = true
      checkBoxObjects[secondNumber].parentElement.style.color = 'grey'
    }
    else if(checkBoxObjects[secondNumber].disabled === true){
      checkBoxObjects[secondNumber].parentElement.style.color = ''
      checkBoxObjects[secondNumber].disabled = false
    }
    if(checkBoxObjects[secondNumber].checked === true){
      checkBoxObjects[firstNumber].disabled = true
      checkBoxObjects[firstNumber].parentElement.style.color = 'grey'
    }
    else if(checkBoxObjects[firstNumber].disabled === true){
      checkBoxObjects[firstNumber].parentElement.style.color = ''
      checkBoxObjects[firstNumber].disabled = false
    }
  }
    inputClash(1,3)
    inputClash(2,4)

  if(document.querySelector('#sumCost')){
    document.querySelector('#sumCost').remove();
  }
  const totalCostSpan = document.createElement("span");
  totalCostSpan.setAttribute('id', 'sumCost');
  totalCostSpan.innerHTML =(`Total Cost: $${totalCost}`);
  document.querySelector('.activities').appendChild(totalCostSpan);
})


//hide or show payment sections dynamically using the showHidePayment helper function
document.querySelector('#payment').addEventListener('change', function(){

  if(paymentOptions.value === 'paypal'){
    showHidePayment(true, false, true)
  } else if(paymentOptions.value === 'bitcoin'){
    showHidePayment(true, true, false);
  } else if(paymentOptions.value === 'select_method'){
     showHidePayment(true, true, true);
  } else{
    showHidePayment(false, true, true);
  }
});

//set inital payment options to credit card
showHidePayment(false, true, true);
document.querySelector('#payment').selectedIndex=1;

/* =============================================================================
                              Iffy Functions
============================================================================= */

//add a div to payment section to display helper messages
(function addPaymentDiv(){
  const some_html = `<div id='payment-helper-message'></div>`;
  document.querySelectorAll('.col-3')[1].insertAdjacentHTML('afterEnd', some_html);
})();

//add div below name, for greeting message
(function addNameDiv(){
  const some_html = `<div id='name-hello-message'></div>`;
  document.querySelector('#name').insertAdjacentHTML('afterEnd', some_html);
})();

(function addEmailDiv(){
  const some_html = `<div id='email-info-message'></div>`;
  document.querySelector('#mail').insertAdjacentHTML('afterEnd', some_html);
})();

(function addOtherJobDiv(){
  const some_html = `<div id='other-Job-message'></div>`;
  document.querySelector('#other-title').insertAdjacentHTML('afterEnd', some_html);
})();

const paymentErrorDiv = document.querySelector('#payment-helper-message');

/* =============================================================================
                            Real Time Varification
============================================================================= */

//if credit card number is not entered correctly display an error message
document.querySelector('#cc-num').addEventListener('keyup', function(){

  const blankMessage = `<p class='payment_message'>
  Please enter a credit card number.</p>`;
  const counterMessage = `<p class='payment_message'>
  You have entered ${cardNumberId.value.length} numbers.
  Please enter a number that is between 13 and 16 digits long.</p>`;
  const successMessage = `<p class='payment_message'>Awesome Possum!</p>`;
  const paragrapghId = document.querySelector('.payment_message')

  if(cardNumberId.value.length >= 13 && cardNumberId.value.length <= 16
  && IsNumeric(cardNumberId.value)){
  textInputVarified(cardNumberId, successMessage, paragrapghId, paymentErrorDiv)
  }else if(cardNumberId.value.length <2){
    textInputError(cardNumberId, blankMessage, paragrapghId, paymentErrorDiv);
  } else{
  textInputError(cardNumberId, counterMessage, paragrapghId, paymentErrorDiv);
  }
})

document.querySelector('#zip').addEventListener('keyup', function(){

  const blankMessage = `<p class='payment_message'>
  Please enter a 5 digit zip code.</p>`;
  const paragrapghId = document.querySelector('.payment_message')
  const successMessage = `<p class='payment_message'>You da boss!</p>`;

  zipCodeId.value.length === 5 && IsNumeric(zipCodeId.value) ?
  textInputVarified(zipCodeId, successMessage, paragrapghId, paymentErrorDiv) :
  textInputError(zipCodeId, blankMessage, paragrapghId, paymentErrorDiv);
})

document.querySelector('#cvv').addEventListener('keyup', function(){

  const blankMessage = `<p class='payment_message'>
  Please enter a 3 digit cvv security number.</p>`;
  const paragrapghId = document.querySelector('.payment_message')
  const successMessage = `<p class='payment_message'>Rockin it!</p>`;

  cvvId.value.length === 3 && IsNumeric(cvvId.value) ?
  textInputVarified(cvvId, successMessage, paragrapghId, paymentErrorDiv) :
  textInputError(cvvId, blankMessage, paragrapghId, paymentErrorDiv);
})

document.querySelector('#name').addEventListener('keyup', function(){

  const blankMessage = `<p id='hello_message'>
  Please enter your name.</p>`;
  const paragrapghId = document.querySelector('#hello_message')
  const nameDiv = document.querySelector('#name-hello-message');
  const successMessage = `<p id='hello_message'>Hello, ${nameId.value}!</p>`;

  validateWord(nameId.value) && nameId.value.length>0 ?
  textInputVarified(nameId, successMessage, paragrapghId, nameDiv)
  : textInputError(nameId, blankMessage, paragrapghId, nameDiv);

})

document.querySelector('#mail').addEventListener('keyup', function(){
  const emailId = document.querySelector('#mail');
  const blankMessage = `<p id='email_message'>
  Please enter your email.</p>`;
  const paragrapghId = document.querySelector('#email_message')
  const nameDiv = document.querySelector('#email-info-message');
  const successMessage = `<p id='email_message'>We will email you further
  details at ${emailId.value}</p>`;

  validateEmail(emailId.value) ?
  textInputVarified(emailId, successMessage, paragrapghId, nameDiv) :
  textInputError(emailId, blankMessage, paragrapghId, nameDiv);

})

document.querySelector('#other-title').addEventListener('keyup', function(){
  const otherJobId = document.getElementById('other-title');
  const blankMessage = `<p id='other-job'>
  Please enter your job.</p>`;
  const paragrapghId = document.querySelector('#other-job')
  const nameDiv = document.querySelector('#other-Job-message');
  const successMessage = `<p id='other-job'>You’re not alone!</p>`;


  if(otherJobId && validateWord(otherJobId.value) && otherJobId.value.length>1){
    textInputVarified(otherJobId, successMessage, paragrapghId, nameDiv)
  } else if(otherJobId){
    textInputError(otherJobId, blankMessage, paragrapghId, nameDiv);
  }
})


/* =============================================================================
                            Helper Functions
============================================================================= */

//show or hide sections of the payment section
function showHidePayment(option1, option2, option3){
  paymentLegend.removeAttribute("class");
  creditCardDiv.hidden = option1;
  creditCardDiv.nextElementSibling.hidden = option2;
  creditCardDiv.nextElementSibling.nextElementSibling.hidden = option3;
}

//use regex to validate string is an email
function validateEmail(email){
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//validate string is a string
function validateWord(text){
  const re = /\S+/;
  return re.test(text);
}

//validate int is an int
function IsNumeric(val) {
    return Number(val)==val;
}

//add css class to the legend of completed sections
function sectionComplete(id){
  id.removeAttribute("class");
  id.classList.add("section_completed");
}

//add css class to the legend of uncompleted sections and prevent form from submitting
function sectionUncompleted(id, eventObject){
  id.removeAttribute("class");
  id.classList.add("section_uncompleted_error");
  (eventObject).preventDefault();
}

/* remove css class from text input, add a css class to turn the input field green
if a helper message exists, remove it then add a new helper message */
function textInputVarified(id, successMessage, paraID, errorDiv){
  id.removeAttribute("class");
  id.classList.add("text_input_varified");
  if(paraID){
    paraID.parentNode.removeChild(paraID);
  }
  errorDiv.insertAdjacentHTML('afterBegin', successMessage);
}

/* remove css class from text input, add a css class to turn the input field red
if a helper message exists, remove it then add a new helper message */
function textInputError(id, message, paraID, errorDiv){
  id.removeAttribute("class");
  id.classList.add("text_input_error");
  if(paraID){
    paraID.parentNode.removeChild(paraID)
  }
  errorDiv.insertAdjacentHTML('afterBegin', message);
}

function hasClass(element, className) {
  return(' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}


/* =============================================================================
                            Submit Function
============================================================================= */

submitButton.addEventListener('click', function(e){

  let checkBoxCount = 0;

  document.getElementById('colors-js-puns').style.display === 'block' ?
  sectionComplete(tshirtLegend) : sectionUncompleted(tshirtLegend, e);

  const basicInfoLegend = document.querySelectorAll('legend')[0];
  const otherJobId = document.getElementById('other-title');


  if(otherJobId.hidden === false){
    if(hasClass(otherJobId, 'text_input_varified') &&
      hasClass(nameId, 'text_input_varified') &&
      hasClass(emailId, 'text_input_varified')){
      sectionComplete(basicInfoLegend)
    } else{
      sectionUncompleted(basicInfoLegend, e)
    }
  }
  else{
    if( hasClass(nameId, 'text_input_varified') &&
      hasClass(emailId, 'text_input_varified')){
      sectionComplete(basicInfoLegend)
    } else{
      sectionUncompleted(basicInfoLegend)
    }
  }

  for(i=0; i<checkBoxList.length; i++){
    if(checkBoxList[i].checked){
      checkBoxCount +=1;
    }
  }

  checkBoxCount>0 ? sectionComplete(activitiesLegend)
  : sectionUncompleted(activitiesLegend, e);

  if(paymentOptions.value === 'paypal'){
    sectionComplete(paymentLegend)
    submitButton.setAttribute('href', 'https://www.paypal.com/uk/signin');
  } else if(paymentOptions.value === 'bitcoin'){
    sectionComplete(paymentLegend)
    submitButton.setAttribute('href', 'https://www.coinbase.com/signin');
  } else if(paymentOptions.value === 'credit card'){
    if(hasClass(cardNumberId, 'text_input_varified') &&
       hasClass(zipCodeId, 'text_input_varified') &&
       hasClass(cvvId, 'text_input_varified')){
         sectionComplete(paymentLegend);
    } else {
      sectionUncompleted(paymentLegend, e);
    }
  }

})
