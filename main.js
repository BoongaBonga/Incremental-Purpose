//VARIABLES
let purpose = 0;
let totalPurposeGain = 0;
//idle reflection
let idleReflectionCount = 0;
let idleReflectionPrice = 10;
let IdleReflectionPurposeGain = 0;
//sharpen focus
let sharpenFocusCount = 0;
let sharpenFocusPrice = 30;
let sharpenFocusPurposeGain = 0;
//seek validation
let seekValidationCount = 0;
let seekValidationPrice = 100;
let seekValidationPurposeGain = 0;
//find balance
let findBalancePercent = 0;
let findBalancePurposeGain = 0;
let findBalanceSliderSpeed = 10;
let findBalanceValue = 0;
//deepen resolve
let deepenResolveCount = 0;
let deepenResolvePrice = 1000;
let deepenResolvePurposeGain = 0;
let operationNr = 0;
const delay = 50;
const statisticsClass = document.getElementsByClassName("statistic");

//MENU BUTTONS
//statistics
function statisticsDropdown(){
    for(let i = 0; i < statisticsClass.length; i++){
        if(statisticsClass[i].style.visibility === "hidden"){
            statisticsClass[i].style.visibility = "visible";
        } else{
            statisticsClass[i].style.visibility = "hidden";
        }
    }
}


//FUNCTIONALITY
//function for gaining purpose on click
function gainPurpose(gain){
    //increment purpose counter
    purpose = purpose + gain;
    
}

//functions for find your balance minigame
function findBalance(){
    findBalancePercent = (25 - Math.abs(findYourBalanceSlider.value - 50)) * 0.05;
    findBalanceValue += findBalancePercent * (deepenResolveCount * 0,4);
}

let invertVal = 1;
window.setInterval(function(){
    // Convert the slider value to an integer and add invertVal
    findYourBalanceSlider.value = parseInt(findYourBalanceSlider.value) + invertVal;

    // Reverse direction if the slider reaches the top or bottom
    if (findYourBalanceSlider.value >= 100 || findYourBalanceSlider.value <= 0) {
        invertVal *= -1; // Reverse direction
    }
}, findBalanceSliderSpeed);



//functions for buying purpose gain upgrade
//buying idle reflection normal and max
function buyIdleReflection(){
    if(purpose >= idleReflectionPrice){
        purpose = purpose - idleReflectionPrice;
        idleReflectionCount = idleReflectionCount + 1;
        idleReflectionPrice = Math.round(idleReflectionPrice * 1.1);
        document.getElementById("idleReflectionPriceDisplayID").innerHTML = idleReflectionPrice;
    }
}
function idleReflectionBuyMax(){
    while(purpose > idleReflectionPrice){
        purpose -= idleReflectionPrice;
        idleReflectionPrice = Math.round(idleReflectionPrice * 1.1);
        idleReflectionCount ++;
    }
    document.getElementById("idleReflectionPriceDisplayID").innerHTML = idleReflectionPrice;
}

//buying sharpen focus normal and max
function buySharpenFocus(){
    if(purpose >= sharpenFocusPrice){
        purpose = purpose - sharpenFocusPrice;
        sharpenFocusCount = sharpenFocusCount + 1;
        sharpenFocusPrice = Math.round(sharpenFocusPrice * 1.15);
        document.getElementById("sharpenFocusPriceDisplayID").innerHTML = sharpenFocusPrice;
    }
}
function sharpenFocusBuyMax(){
    while(purpose > sharpenFocusPrice){
        purpose -= sharpenFocusPrice;
        sharpenFocusPrice = Math.round(sharpenFocusPrice * 1.15);
        sharpenFocusCount ++;
    }
    document.getElementById("sharpenFocusPriceDisplayID").innerHTML = sharpenFocusPrice;
}

//buying seekvalidation normal and max
function buySeekValidation(){
    if(purpose >= seekValidationPrice){
        purpose = purpose - seekValidationPrice;
        seekValidationCount = seekValidationCount + 1;
        seekValidationPrice = Math.round(seekValidationPrice * 1.2);
        document.getElementById("seekValidationPriceDisplayID").innerHTML = seekValidationPrice;
    }
}
function seekValidationBuyMax(){
    while(purpose > seekValidationPrice){
        purpose -= seekValidationPrice;
        seekValidationPrice = Math.round(seekValidationPrice * 1.2);
        seekValidationCount ++;
    }
    document.getElementById("seekValidationPriceDisplayID").innerHTML = seekValidationPrice;
}

//buying deepen resolve normal and max
function buyDeepenResolve(){
    if(purpose >= deepenResolvePrice){
        purpose = purpose - deepenResolvePrice;
        deepenResolveCount = deepenResolveCount + 1;
        deepenResolvePrice = Math.round(deepenResolvePrice * 1.35);
        document.getElementById("deepenResolvePriceDisplayID").innerHTML = deepenResolvePrice;
    }
}
function deepenResolveBuyMax(){
    while(purpose > deepenResolvePrice){
        purpose -= deepenResolvePrice;
        deepenResolvePrice = Math.round(deepenResolvePrice * 1.35);
        deepenResolveCount ++;
    }
    document.getElementById("deepenResolvePriceDisplayID").innerHTML = deepenResolvePrice;
}


//increase purpose counter every (delay)ms
window.setInterval(function(){
    //idle reflection purpose
    IdleReflectionPurposeGain = idleReflectionCount * (delay/2000);
    //sharpen focus purpose
    sharpenFocusPurposeGain = IdleReflectionPurposeGain * (sharpenFocusCount * 0.5);
    //seek validation purpose
    seekValidationPurposeGain = IdleReflectionPurposeGain * (seekValidationCount * 0.2);
    seekValidationPurposeGain = seekValidationPurposeGain + sharpenFocusPurposeGain * (seekValidationCount * 0.2);
    //total seek balance purpose
    findBalancePurposeGain = (IdleReflectionPurposeGain + sharpenFocusPurposeGain + seekValidationPurposeGain) * findBalanceValue;
    //total purpose
    totalPurposeGain = IdleReflectionPurposeGain + sharpenFocusPurposeGain + seekValidationPurposeGain + findBalancePurposeGain;
    purpose = purpose + totalPurposeGain;
    document.getElementById("purpose").innerHTML = Math.round(purpose);

    //change statistics
    document.getElementById("idleReflectionStatistics").innerHTML = Math.round(IdleReflectionPurposeGain / (delay/1000) * 100)/100;
    document.getElementById("sharpenFocusStatistics").innerHTML = Math.round(sharpenFocusPurposeGain / (delay/1000) * 100)/100;
    document.getElementById("seekValidationStatistics").innerHTML = Math.round(seekValidationPurposeGain / (delay/1000) * 100)/100;
    document.getElementById("findBalanceStatistics").innerHTML = Math.round(findBalancePurposeGain / (delay/1000) * 100)/100;
    document.getElementById("totalPurposeGain").innerHTML = Math.round(totalPurposeGain / (delay/1000) * 100)/100;
    
    //change scale based on purpose
    if(purpose >= 10 && operationNr === 0){
        purpose_scale.innerHTML = "A flea notices you and jumps onto your hair.";
        
        operationNr = 1;
    }
    if(purpose >= 50 && operationNr === 1){
        purpose_scale.innerHTML = "A bird briefly lands near you before flying away.";
        //add the idle purpose button
        document.getElementById("improveYourself").style.display = "block";
        document.getElementById("idleReflectionButton").style.display = "block";
        document.getElementById("idleReflectionBuyMax").style.display = "block";
        document.getElementById("idleReflectionPriceDisplay").style.display = "block";
        operationNr = 2;
    }
    if(purpose >= 100 && operationNr === 2){
        purpose_scale.innerHTML = "A stray cat brushes against your leg.";
        document.getElementById("sharpenFocusButton").style.display = "block";
        document.getElementById("sharpenFocusBuyMax").style.display = "block";
        document.getElementById("sharpenFocusPriceDisplay").style.display = "block";
        operationNr = 3;
    }
    if(purpose >= 500 && operationNr === 3){
        purpose_scale.innerHTML = "A child looks at you, and then quickly loses interest.";
        operationNr = 4;
    }
    if(purpose >= 1000 && operationNr === 4){
        purpose_scale.innerHTML = "A neighbor glances at you through their window, but then averts his gaze.";
        document.getElementById("seekValidationButton").style.display = "block";
        document.getElementById("seekValidationBuyMax").style.display = "block";
        document.getElementById("seekValidationPriceDisplay").style.display = "block";
        operationNr = 5;
    }
    if(purpose >= 10000 && operationNr === 5){
        purpose_scale.innerHTML = "A stranger pauses for a moment, sensing something familiar, then continues on without a second thought.";
        operationNr = 6;
    }
    if(purpose >= 100000 && operationNr === 6){
        purpose_scale.innerHTML = "Far away, your mother pauses while doing the dishes, a fleeting thought of you crossing her mind, though she can't quite recall why.";
        document.getElementById("findYourBalanceTitle").style.display = "block";
        document.getElementById("findYourBalanceTip").style.display = "block";
        document.getElementById("findYourBalanceSlider").style.display = "block";
        document.getElementById("findYourBalanceButton").style.display = "block";
        document.getElementById("deepenResolveButton").style.display = "block";
        document.getElementById("deepenResolveBuyMax").style.display = "block";
        document.getElementById("deepenResolvePriceDisplay").style.display = "block";
        operationNr = 7;
    }
    if(purpose >= 1000000 && operationNr === 7){
        purpose_scale.innerHTML = "Your mother sits down with an old photo album, her heart aching with a vague sense of loss. She pauses on a picture of you but quickly moves on.";
        operationNr = 8;
    }
    if(purpose >= 10000000 && operationNr === 8){
        purpose_scale.innerHTML = "Strangers find themselves speaking your name in conversation, though they aren't sure where they heard it.";
        operationNr = 9;
    }
    if(purpose >= 100000000 && operationNr === 9){
        purpose_scale.innerHTML = "Your name appears in a forgotten note, written long ago, though no one remembers why.";
        operationNr = 10;
    }
    if(purpose >= 1000000000 && operationNr === 10){
        purpose_scale.innerHTML = "Whispers of your existence echo in distant places, though the source remains unknown.";
        operationNr = 11;
    }
}, delay);