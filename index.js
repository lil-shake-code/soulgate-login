// let xhr = new XMLHttpRequest();
// let root = "http://65.19.132.211:3001";
// let url = root + "/auth";
// xhr.open("POST", url);
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.setRequestHeader("Authorization", "Bearer your-auth-token");
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === XMLHttpRequest.DONE) {
//     // handle the response here
//     console.log(xhr.responseText);
//   }
// };
// let data = { uuid: "spaceman" };
// let payload = JSON.stringify(data);
// xhr.send(payload);

//readurl params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const queueId = urlParams.get("q");

const firebaseConfig = {
  apiKey: "AIzaSyA_7kUt92gDuSEBPJU4eqOpjFtstO2clfM",
  authDomain: "sneks-83e56.firebaseapp.com",
  databaseURL: "https://sneks-83e56-default-rtdb.firebaseio.com",
  projectId: "sneks-83e56",
  storageBucket: "sneks-83e56.appspot.com",
  messagingSenderId: "585859265597",
  appId: "1:585859265597:web:2c7bdc5d06320bcb96e654",
  measurementId: "G-5HDC70Z30C",
};

firebase.initializeApp(firebaseConfig);
// FirebaseUI config
//hide div id update-username
document.getElementById("update-username").style.display = "none";
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      //onsole.log(authResult);

      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

//set persistent
firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function () {
    // Firebase Authentication persistence is enabled.
  })
  .catch(function (error) {
    // Handle error.
  });

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var uid = user.uid;

    //show user name and all that
    //add elemnts to dom
    var userDiv = document.createElement("div");
    userDiv.setAttribute("id", "userDiv");
    userDiv.setAttribute("class", "userDiv");
    document.body.appendChild(userDiv);
    var userText = document.createElement("p");
    userText.setAttribute("id", "userText");
    userText.setAttribute("class", "userText");
    userText.innerHTML = "Welcome " + displayName + "!";
    //centre that text and make it bold and look nice
    userText.style.textAlign = "center";
    userText.style.fontWeight = "bold";
    userText.style.fontSize = "30px";
    userText.style.fontFamily = "Arial, Helvetica, sans-serif";

    userDiv.appendChild(userText);

    //have userdiv just under firebaseui-auth-container
    var firebaseuiAuthContainer = document.getElementById(
      "firebaseui-auth-container"
    );
    firebaseuiAuthContainer.appendChild(userDiv);

    //get username from rt db
    var username;
    var usernameRef = firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid);
    usernameRef.on("value", (snapshot) => {
      username = snapshot.val().username;
      //show div id update-username
      document.getElementById("update-username").style.display = "block";
      //set the text input text to soemthing
      console.log(username);
      document.getElementById("new-username").value = username;
      //center update-username div in the website
      document.getElementById("update-username").style.margin = "auto";
      document.getElementById("update-username").style.width = "50%";

      document.getElementById("update-username").style.padding = "20px";
      //show all ements in that div under each other
      document.getElementById("update-username").style.display = "flex";
      document.getElementById("update-username").style.flexDirection = "column";
      document.getElementById("update-username").style.justifyContent =
        "center";
      document.getElementById("update-username").style.alignItems = "center";

      //there is an attribute called deck, which is an array of numbers
      //create a 2 side inventory system to show the user what cards they have on the left side
      //and show all cards in a nice rounded shadow card view, which when clicked, gets removed from the list
      //and edited on server
      const deck = snapshot.val().deck;
      //console.log(deck);
      //create a div for the deck
      var deckDiv = document.createElement("div");
      deckDiv.setAttribute("id", "deckDiv");
      deckDiv.setAttribute("class", "deckDiv");
      //have a grid view here

      //create a div for the cards
      var cardsDiv = document.createElement("div");
      cardsDiv.setAttribute("id", "cardsDiv");
      cardsDiv.setAttribute("class", "cardsDiv");
      document.body.appendChild(cardsDiv);
      const sampleUrl =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa2CYFzWG7HhV3BPOwUW-ysU1j3oJFEITm5IegR-jitRIm6xDEtdHQmaavxoOkWLuGNJw&usqp=CAU";

      const cardData = [
        // Repeat for all 10 cards with specific data
      ];

      //for every card in the deck, create a div with the card number and show it in the deckDiv
      // for (let i = 0; i < JSON.parse(deck).length; i++) {
      //   //create a div for the card
      //   cardData.push({
      //     id: "fcard" + i,
      //     imageUrl: sampleUrl,
      //     boldText: JSON.parse(deck)[i],
      //   });
      // }
      // console.log(cardData);
      // //create a div of class grid-container
      // var gridContainer = document.getElementById("gc");

      // cardData.forEach((data) => {
      //   //create a new cardDiv and add it to the grid of deckDiv
      //   const cardDiv = document.createElement("div");
      //   cardDiv.setAttribute("id", data.id);
      //   cardDiv.setAttribute("class", "cardDiv");
      //   //add the image to the cardDiv
      //   const cardImage = document.createElement("img");
      //   cardImage.setAttribute("src", data.imageUrl);

      //   cardDiv.appendChild(cardImage);
      //   //add the card name in bold h3
      //   const cardName = document.createElement("h3");
      //   cardName.innerHTML = data.boldText;
      //   cardDiv.appendChild(cardName);
      //   //add to gridContainer
      //   gridContainer.appendChild(cardDiv);
      // });
      //document.body.appendChild(gridContainer);
    });
    // ...

    //so now a uuid exists for the user, we can use this to store data in the database
    //check if user exists in database
    //if not, create user in database

    //FINALLY TELL THE NODE SERVER ON THE OTHER LINE TO REMOVE THIS CLIENT FROM THE QUEUE
    //make a post request to localhost
    //make a post request to localhost
    let xhr = new XMLHttpRequest();
    let root = "https://b742-65-19-132-211.ngrok-free.app";
    let url = root + "/auth";
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer your-auth-token");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        // handle the response here
      }
    };
    let data = { uuid: uid, queueId: queueId };
    let payload = JSON.stringify(data);
    xhr.send(payload);
  } else {
    // User is signed out.
    // Redirect to login page or show login button.
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    // Display the FirebaseUI login form
    ui.start("#firebaseui-auth-container", uiConfig);
  }
});
const updateUsernameButton = document.getElementById("update-btn");

updateUsernameButton.addEventListener("click", () => {
  // Get the new username from the text input
  const newUsername = document.getElementById("new-username").value;
  if (newUsername == "user") {
    // alert("You can't use that username!");
    return;
  }
  //cant be over 10 characters
  if (newUsername.length > 10) {
    alert("Username must be less than 10 characters!");
    return;
  }

  // Update the username in Firebase realtime database
  firebase
    .database()
    .ref(`users/${firebase.auth().currentUser.uid}/username`)
    .set(newUsername)
    .then(() => {
      deckDiv.innerHTML = "";
      // Update successful.
      console.log("username updated");
      //show message username updated
      var usernameUpdated = document.createElement("p");
      usernameUpdated.setAttribute("id", "usernameUpdated");
      usernameUpdated.setAttribute("class", "usernameUpdated");
      usernameUpdated.innerHTML = "Username updated to " + newUsername + "!";
      //centre that text and make it bold and look nice
      usernameUpdated.style.textAlign = "center";
      usernameUpdated.style.fontWeight = "bold";
      usernameUpdated.style.fontSize = "5px";
      document.body.appendChild(usernameUpdated);
      //make it red
      usernameUpdated.style.color = "red";
    });
});
