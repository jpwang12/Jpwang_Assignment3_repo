//set up params from headder, order array, and error value
let params = (new URL(document.location)).searchParams;
let error;

//type this sells
let type = 'mat';

//get if there was an error before
error = params.get('error');

//name of store for redirect
let storeName = 'stone';
document.getElementById('storeName').value += storeName;
//cookie params
let signin = decodeURIComponent(getCookieValue('signIn'));
let username = decodeURIComponent(getCookieValue('username')); // Replace with your logic to get the username
let fullName = decodeURIComponent(getCookieValue('fName'));

//sign in replace to sign out
document.addEventListener("DOMContentLoaded", function() {
    
    if (signin == 'true') {
        // Replace the Sign In link with a cute icon and the username
        document.getElementById("loginPlaceholder").innerHTML = 
            `<form id="signOutForm" action="signOutKeepCart" method="POST">
            <button type="submit" class="text-button">Sign Out</button>
            </form>`;
    }
});

//cookie params for product, if 0, full in
let cards = decodeURIComponent(getCookieValue('card'));
let mat = decodeURIComponent(getCookieValue('mat'));
let boxes = decodeURIComponent(getCookieValue('box'));
console.log(cards);
if(cards == 'null'){
    console.log('cardsBad');
    cards = '0,0,0,0,0,0';
}
if(boxes == 'null'){
    console.log('cardsBad');
    boxes = '0,0,0,0,0,0';
}
if(mat == 'null'){
    console.log('cardsBad');
    mat = '0,0,0,0,0,0';
}
//append strings create array
let totalString = boxes + ","+cards+","+mat;
let arrayString = totalString.split(",");
var order = arrayString.map(function(item) {
    return +item;
});
console.log(order);
var numInCart = order.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);

document.getElementById('cartText').innerHTML = `View Cart (${numInCart})`;

//gets params from url

let totalOnline = params.get('totalOnline');


//puts the fullName in the field
document.getElementById('fullNameHere').value = fullName;
document.getElementById('type').value = type;

//checks if username is not empty, if there is a username, populate it all and disable buttons
if(username !== null && fullName !== '' && fullName !== 'null' && signin=='true'){
    //disable buttons
    
    //sets the welcomeDiv, and adds the image and message depending on size 
    document.getElementById('WelcomeDiv').innerHTML += `<h3 class="text">Welcome ${fullName}!</h3>`;
    
    //fill hidden value
    document.getElementById('usernameEntered').value = username;

}
overflow = decodeURIComponent(params.get('overflow'));
console.log(overflow)
console.log(overflow !== 'null' && overflow !== null && typeof(overflow) !== null);
//if there is an error submitted, then show the error text in errorDiv
if(error == 'true'){
    
    document.getElementById('errorDiv').innerHTML += `<h2 class="text-danger">Input Error - Please Fix!</h2><br>`;
}
if(overflow == '' || (overflow !== 'null' && overflow !== null && typeof(overflow) !== null)){
    console.log('here');
    document.getElementById('errorDiv').innerHTML += `<h2 class="text-danger">${overflow}</h2><br>`;
}

/*
DISPLAYS PRODUCT TABLE
*/
for (let i = 0; i < products.length; i++) {
    if(type == products[i]['type']){
    document.querySelector('.row').innerHTML += 
        `<div class="col-md-6 product_card mb-4">
        <div class="card">
            <div class="text-center">
                <img src="${products[i].image}" class="card-img-top border-top imgMat" alt="Product Image">
            </div>
            <div class="card-body">
                <h5 class="card-title">${products[i].card}</h5>
                <p class="card-text">
                    Price: $${(products[i].price).toFixed(2)}<br>
                    Available: ${products[i].qty_available}<br>
                    Total Sold: ${products[i].total_sold}<br>
                    In Cart: ${order[i]}
                </p>
                
                <input type="text" placeholder="0" name="quantity_textbox" id="${[i]}" class="form-control mb-2" oninput="validateQuantity(this)" onload="validateQuantity(this)" style="border-color: black;">
                <p id="invalidQuantity${[i]}" class="text-danger"></p>
                    <div class="d-flex justify-content-center">
                        <input type="submit" value="Add to Cart" class="btn btn-secondary">
                    </div>
                </div>
            </div>
        </div>`
        validateQuantity(document.getElementById(`${[i]}`));
    }
 ;}
//runs to generate a validation message
function validateQuantity(quantity) {
    // Set variables and grab the number from the quantity and set it to a number
    let valMessage = '';
    let quantityNumber = Number(quantity.value);
    let inputElement = document.getElementById(quantity.id);

    // Reset the border color to black before performing validation
    inputElement.style.borderColor = "black";


    // Check for validation errors and set the border color to red if an error is found
    if (isNaN(quantityNumber)) {
        valMessage = "Please Enter a Number";
        inputElement.style.borderColor = "red";
    } else if (quantityNumber < 0 && !Number.isInteger(quantityNumber)) {
        valMessage = "Please Enter a Positive Integer";
        inputElement.style.borderColor = "red";
    } else if (quantityNumber < 0) {
        valMessage = "Please Enter a Positive Value";
        inputElement.style.borderColor = "red";
    } else if (!Number.isInteger(quantityNumber)) {
        valMessage = "Please Enter an Integer";
        inputElement.style.borderColor = "red";
    } else if (quantityNumber > products[quantity.id]['qty_available']) {
        valMessage = "We Do Not Have " + quantityNumber + " Available!";
        inputElement.style.borderColor = "red";
        inputElement.value = products[quantity.id]['qty_available'];
    } else {
        valMessage = '';
    }

    // Set the valMessage to the innerHTML of the section
    document.getElementById(`invalidQuantity${quantity.id}`).innerHTML = valMessage;
}

function getCookieValue(cookieName){
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++){
        let cookiePair = cookies[i].trim().split('=');
        if(cookiePair[0] === cookieName){
            return cookiePair[1]
        }
        
    }
    return null;
};