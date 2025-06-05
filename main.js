//VARIABLES
var purpose = 0;
var totalPurposeGain = 0;
//idle reflection
var idleReflectionObj = {
  idleReflectionCount: 0,
  idleReflectionPrice: 10,
  idleReflectionPurposeGain: 0,
};
//sharpen focus
var sharpenFocusObj = {
  sharpenFocusCount: 0,
  sharpenFocusPrice: 30,
  sharpenFocusPurposeGain: 0,
};
//seek validation
var seekValidationObj = {
  seekValidationCount: 0,
  seekValidationPrice: 100,
  seekValidationPurposeGain: 0,
};
//find balance
var findBalanceObj = {
  findBalancePercent: 0,
  findBalancePurposeGain: 0,
  findBalanceSliderSpeed: 10,
  findBalanceValue: 0,
};
//deepen resolve
var deepenResolveObj = {
  deepenResolveCount: 0,
  deepenResolvePrice: 1000,
  deepenResolvePurposeGain: 0,
};
//smth
var operationNr = 0;
const delay = 50;
const statisticsDiv = document.getElementById("statisticsInfo");
const purposeCounter = document.getElementById("purpose");

//MENU BUTTONS
//statistics
function statisticsDropdown() {
  if (statisticsDiv.style.display === "none") {
    statisticsDiv.style.display = "block";
  } else {
    statisticsDiv.style.display = "none";
  }
}

//FUNCTIONALITY
//function for gaining purpose on click
function gainPurpose(gain) {
  //increment purpose counter
  purpose = purpose + gain;
  if ((Math.floor(purpose * 100) / 100) % 1 === 0) {
    purposeCounter.innerHTML = formatNumber(
      Number(Math.floor(purpose * 100) / 100 + ".00"),
      1e6
    );
  } else {
    purposeCounter.innerHTML = formatNumber(
      Math.floor(purpose * 100) / 100,
      1e6
    );
  }
}

//function for large numbers
function formatNumber(number, startingLength) {
  if (Math.abs(number) >= startingLength) {
    return number.toExponential(2);
  } else {
    return number.toString();
  }
}

//functions for find your balance minigame
function findBalance() {
  findBalanceObj.findBalancePercent =
    (25 - Math.abs(findYourBalanceSlider.value - 50)) * 0.05;
  findBalanceObj.findBalanceValue +=
    findBalanceObj.findBalancePercent *
    (deepenResolveObj.deepenResolveCount * 0, 4);
}

var invertVal = 1;
window.setInterval(function () {
  // Convert the slider value to an integer and add invertVal
  findYourBalanceSlider.value =
    parseInt(findYourBalanceSlider.value) + invertVal;

  // Reverse direction if the slider reaches the top or bottom
  if (findYourBalanceSlider.value >= 100 || findYourBalanceSlider.value <= 0) {
    invertVal *= -1; // Reverse direction
  }
}, findBalanceObj.findBalanceSliderSpeed);

//stars
//funny stars
const starContainer = document.getElementById("starcontainer");
function star(x, y, size, duration) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.width = star.style.height = size + "px";
  star.style.left = x + "vw";
  star.style.top = y + "vh";
  star.opacity = 1;
  star.dataset.duration = duration;
  star.dataset.totalDuration = duration;
  document.getElementById("starcontainer").appendChild(star);
}
function starFadeOut() {
  var stars = document.querySelectorAll(".star");
  for (var i = 0; i <= stars.length - 1; i++) {
    if (Number(stars[i].dataset.duration) <= 0) {
      stars[i].remove();
    }
    stars[i].dataset.duration = Number(stars[i].dataset.duration) - 20;
    stars[i].style.opacity =
      stars[i].dataset.duration / stars[i].dataset.totalDuration;
  }
}
function starSpawn() {
  if (Math.random() < 0.3) {
    star(
      Math.random() * 110 - 5,
      Math.random() * 110 - 5,
      Math.random() * 10,
      Math.random() * 3000 + 500
    );
  }
}

//functions for buying purpose gain upgrade
//buying idle reflection normal and max
function buyIdleReflection() {
  if (purpose >= idleReflectionObj.idleReflectionPrice) {
    purpose = purpose - idleReflectionObj.idleReflectionPrice;
    idleReflectionObj.idleReflectionCount =
      idleReflectionObj.idleReflectionCount + 1;
    idleReflectionObj.idleReflectionPrice = Math.round(
      idleReflectionObj.idleReflectionPrice * 1.1
    );
    document.getElementById("idleReflectionPriceDisplayID").innerHTML =
      formatNumber(idleReflectionObj.idleReflectionPrice, 1e6);
  }
}
function idleReflectionBuyMax() {
  while (purpose > idleReflectionObj.idleReflectionPrice) {
    purpose -= idleReflectionObj.idleReflectionPrice;
    idleReflectionObj.idleReflectionPrice = Math.round(
      idleReflectionObj.idleReflectionPrice * 1.1
    );
    idleReflectionObj.idleReflectionCount++;
  }
  document.getElementById("idleReflectionPriceDisplayID").innerHTML =
    formatNumber(idleReflectionObj.idleReflectionPrice, 1e6);
}

//buying sharpen focus normal and max
function buySharpenFocus() {
  if (purpose >= sharpenFocusObj.sharpenFocusPrice) {
    purpose = purpose - sharpenFocusObj.sharpenFocusPrice;
    sharpenFocusObj.sharpenFocusCount = sharpenFocusObj.sharpenFocusCount + 1;
    sharpenFocusObj.sharpenFocusPrice = Math.round(
      sharpenFocusObj.sharpenFocusPrice * 1.15
    );
    document.getElementById("sharpenFocusPriceDisplayID").innerHTML =
      formatNumber(sharpenFocusObj.sharpenFocusPrice, 1e6);
  }
}
function sharpenFocusBuyMax() {
  while (purpose > sharpenFocusObj.sharpenFocusPrice) {
    purpose -= sharpenFocusObj.sharpenFocusPrice;
    sharpenFocusObj.sharpenFocusPrice = Math.round(
      sharpenFocusObj.sharpenFocusPrice * 1.15
    );
    sharpenFocusObj.sharpenFocusCount++;
  }
  document.getElementById("sharpenFocusPriceDisplayID").innerHTML =
    formatNumber(sharpenFocusObj.sharpenFocusPrice, 1e6);
}

//buying seekvalidation normal and max
function buySeekValidation() {
  if (purpose >= seekValidationObj.seekValidationPrice) {
    purpose = purpose - seekValidationObj.seekValidationPrice;
    seekValidationObj.seekValidationCount =
      seekValidationObj.seekValidationCount + 1;
    seekValidationObj.seekValidationPrice = Math.round(
      seekValidationObj.seekValidationPrice * 1.2
    );
    document.getElementById("seekValidationPriceDisplayID").innerHTML =
      formatNumber(seekValidationObj.seekValidationPrice, 1e6);
  }
}
function seekValidationBuyMax() {
  while (purpose > seekValidationObj.seekValidationPrice) {
    purpose -= seekValidationObj.seekValidationPrice;
    seekValidationObj.seekValidationPrice = Math.round(
      seekValidationObj.seekValidationPrice * 1.2
    );
    seekValidationObj.seekValidationCount++;
  }
  document.getElementById("seekValidationPriceDisplayID").innerHTML =
    formatNumber(seekValidationObj.seekValidationPrice, 1e6);
}

//buying deepen resolve normal and max
function buyDeepenResolve() {
  if (purpose >= deepenResolveObj.deepenResolvePrice) {
    purpose = purpose - deepenResolveObj.deepenResolvePrice;
    deepenResolveObj.deepenResolveCount =
      deepenResolveObj.deepenResolveCount + 1;
    deepenResolveObj.deepenResolvePrice = Math.round(
      deepenResolveObj.deepenResolvePrice * 1.35
    );
    document.getElementById("deepenResolvePriceDisplayID").innerHTML =
      formatNumber(deepenResolveObj.deepenResolvePrice, 1e6);
  }
}
function deepenResolveBuyMax() {
  while (purpose > deepenResolveObj.deepenResolvePrice) {
    purpose -= deepenResolveObj.deepenResolvePrice;
    deepenResolveObj.deepenResolvePrice = Math.round(
      deepenResolveObj.deepenResolvePrice * 1.35
    );
    deepenResolveObj.deepenResolveCount++;
  }
  document.getElementById("deepenResolvePriceDisplayID").innerHTML =
    formatNumber(deepenResolveObj.deepenResolvePrice, 1e6);
}

//loading
var gameState;
var keys;
function load() {
  if (localStorage.getItem("incrementalPurposeSave") !== null) {
    gameState = JSON.parse(localStorage.getItem("incrementalPurposeSave"));
    keys = Object.keys(gameState);
    for (let key of keys) {
      window[key] = gameState[String(key)];
      try {
        document.getElementById(
          key.replace("Obj", "") + "PriceDisplayID"
        ).innerHTML = formatNumber(
          gameState[String(key)][key.replace("Obj", "Price")],
          1e6
        );
      } catch (e) {
        console.log(e);
      }
    }
  } else {
    alert("Save failed to load or no save found");
    gameState = {
      purpose: purpose,
      idleReflectionObj: idleReflectionObj,
      sharpenFocusObj: sharpenFocusObj,
      seekValidationObj: seekValidationObj,
      findBalanceObj: findBalanceObj,
      deepenResolveObj: deepenResolveObj,
    };
  }
}
function save() {
  gameState = {
    purpose: purpose,
    idleReflectionObj: idleReflectionObj,
    sharpenFocusObj: sharpenFocusObj,
    seekValidationObj: seekValidationObj,
    findBalanceObj: findBalanceObj,
    deepenResolveObj: deepenResolveObj,
  };
  localStorage.setItem("incrementalPurposeSave", JSON.stringify(gameState));
  console.log("Game saved!");
}
function removeSave() {
  localStorage.removeItem("incrementalPurposeSave");
  location.reload();
}

//save loop
window.setInterval(function () {
  gameState = {
    purpose: purpose,
    idleReflectionObj: idleReflectionObj,
    sharpenFocusObj: sharpenFocusObj,
    seekValidationObj: seekValidationObj,
    findBalanceObj: findBalanceObj,
    deepenResolveObj: deepenResolveObj,
  };
  save();
}, 30000);

//settings
const settingContainer = document.getElementById("settingsContainer");
function toggleSettings() {
  settingContainer.style.left = document
    .getElementById("settingsButton")
    .getBoundingClientRect().width;
  if (settingContainer.style.display !== "flex") {
    settingContainer.style.display = "flex";
  } else {
    settingContainer.style.display = "none";
  }
}

//increase purpose counter every (delay)ms
window.setInterval(function () {
  //stars
  starSpawn();
  starFadeOut();
  starContainer.style.transform =
    "rotate(" +
    String(
      Number(
        starContainer.style.transform.replace("rotate(", "").replace("deg)", "")
      ) + 0.1
    ) +
    "deg)";
  //idle reflection purpose
  idleReflectionObj.idleReflectionPurposeGain =
    idleReflectionObj.idleReflectionCount * (delay / 2000);
  //sharpen focus purpose
  sharpenFocusObj.sharpenFocusPurposeGain =
    idleReflectionObj.idleReflectionPurposeGain *
    (sharpenFocusObj.sharpenFocusCount * 0.5);
  //seek validation purpose

  seekValidationObj.seekValidationPurposeGain =
    idleReflectionObj.idleReflectionPurposeGain *
      (seekValidationObj.seekValidationCount * 0.2) +
    sharpenFocusObj.sharpenFocusPurposeGain *
      (seekValidationObj.seekValidationCount * 0.2);
  //total seek balance purpose
  //NOT YET FINAL STILL PRETTY BAD BALANCING
  findBalanceObj.findBalancePurposeGain =
    (idleReflectionObj.idleReflectionPurposeGain +
      sharpenFocusObj.sharpenFocusPurposeGain +
      seekValidationObj.seekValidationPurposeGain) *
    findBalanceObj.findBalanceValue;
  //total purpose
  totalPurposeGain =
    idleReflectionObj.idleReflectionPurposeGain +
    sharpenFocusObj.sharpenFocusPurposeGain +
    seekValidationObj.seekValidationPurposeGain +
    findBalanceObj.findBalancePurposeGain;
  gainPurpose(totalPurposeGain);

  //change statistics
  document.getElementById("idleReflectionStatistics").innerHTML = formatNumber(
    Math.round(
      (idleReflectionObj.idleReflectionPurposeGain / (delay / 1000)) * 100
    ) / 100,
    1e6
  );
  document.getElementById("sharpenFocusStatistics").innerHTML = formatNumber(
    Math.round(
      (sharpenFocusObj.sharpenFocusPurposeGain / (delay / 1000)) * 100
    ) / 100,
    1e6
  );
  document.getElementById("seekValidationStatistics").innerHTML = formatNumber(
    Math.round(
      (seekValidationObj.seekValidationPurposeGain / (delay / 1000)) * 100
    ) / 100,
    1e6
  );
  document.getElementById("findBalanceStatistics").innerHTML = formatNumber(
    Math.round((findBalanceObj.findBalancePurposeGain / (delay / 1000)) * 100) /
      100,
    1e6
  );
  document.getElementById("totalPurposeGain").innerHTML = formatNumber(
    Math.round((totalPurposeGain / (delay / 1000)) * 100) / 100,
    1e6
  );

  //change scale based on purpose
  if (purpose >= 10 && operationNr === 0) {
    purposeScale.innerHTML = "A flea notices you and jumps onto your hair.";

    operationNr = 1;
  }
  if (purpose >= 50 && operationNr === 1) {
    purposeScale.innerHTML =
      "A bird briefly lands near you before flying away.";
    //add the idle purpose button
    document.getElementById("improveYourself").style.display = "block";
    document.getElementById("idleReflectionButton").style.display = "block";
    document.getElementById("idleReflectionBuyMax").style.display = "block";
    document.getElementById("idleReflectionPriceDisplay").style.display =
      "block";
    operationNr = 2;
  }
  if (purpose >= 100 && operationNr === 2) {
    purposeScale.innerHTML = "A stray cat brushes against your leg.";
    document.getElementById("sharpenFocusButton").style.display = "block";
    document.getElementById("sharpenFocusBuyMax").style.display = "block";
    document.getElementById("sharpenFocusPriceDisplay").style.display = "block";
    operationNr = 3;
  }
  if (purpose >= 500 && operationNr === 3) {
    purposeScale.innerHTML =
      "A child looks at you, and then quickly loses interest.";
    operationNr = 4;
  }
  if (purpose >= 1000 && operationNr === 4) {
    purposeScale.innerHTML =
      "A neighbor glances at you through their window, but then averts his gaze.";
    document.getElementById("seekValidationButton").style.display = "block";
    document.getElementById("seekValidationBuyMax").style.display = "block";
    document.getElementById("seekValidationPriceDisplay").style.display =
      "block";
    operationNr = 5;
  }
  if (purpose >= 10000 && operationNr === 5) {
    purposeScale.innerHTML =
      "A stranger pauses for a moment, sensing something familiar, then continues on without a second thought.";
    operationNr = 6;
  }
  if (purpose >= 100000 && operationNr === 6) {
    purposeScale.innerHTML =
      "Far away, your mother pauses while doing the dishes, a fleeting thought of you crossing her mind, though she can't quite recall why.";
    document.getElementById("findYourBalanceTitle").style.display = "block";
    document.getElementById("findYourBalanceTip").style.display = "block";
    document.getElementById("findYourBalanceSlider").style.display = "block";
    document.getElementById("findYourBalanceButton").style.display = "block";
    document.getElementById("deepenResolveButton").style.display = "block";
    document.getElementById("deepenResolveBuyMax").style.display = "block";
    document.getElementById("deepenResolvePriceDisplay").style.display =
      "block";
    operationNr = 7;
  }
  if (purpose >= 1000000 && operationNr === 7) {
    purposeScale.innerHTML =
      "Your mother sits down with an old photo album, her heart aching with a vague sense of loss. She pauses on a picture of you but quickly moves on.";
    operationNr = 8;
  }
  if (purpose >= 10000000 && operationNr === 8) {
    purposeScale.innerHTML =
      "Strangers find themselves speaking your name in conversation, though they aren't sure where they heard it.";
    operationNr = 9;
  }
  if (purpose >= 100000000 && operationNr === 9) {
    purposeScale.innerHTML =
      "Your name appears in a forgotten note, written long ago, though no one remembers why.";
    operationNr = 10;
  }
  if (purpose >= 1000000000 && operationNr === 10) {
    purposeScale.innerHTML =
      "Whispers of your existence echo in distant places, though the source remains unknown.";
    operationNr = 11;
  }
}, delay);

//key presses
document.addEventListener("keydown", function (event) {
  console.log(event);
  if (event.key === "s") {
    save();
  }
});
