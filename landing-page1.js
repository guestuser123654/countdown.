//FIREBASE LANDING PAGE 1 - Getting Input --> Using Data + Setting Information
var inputUserID = document.querySelector("input[name='userID']");
var inputUserName = document.querySelector("input[name='userName']");
var loginButton = document.querySelector("#login");

loginButton.addEventListener("click", function(){
    ff.collection("users").doc(inputUserID.value).get().then((doc) => { // Grabs Document
        if(doc.exists){
            if(doc.data().name == inputUserName.value){
                sessionStorage.setItem("document", inputUserID.value); // If exists, sets key "document" with value "inputUserID.value"
                sessionStorage.setItem("name", inputUserName.value); // If exists, sets key "name" with value "inputUserName.value"
                window.location.href = "landing-page.html";
            } else {
                alert("Invalid username.  Make sure to type in exactly same as your created one.");
            }
        } else {
            alert("Invalid userID. Generate new one if you have lost it.");
        }
    });

});