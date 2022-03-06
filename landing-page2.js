// LANDING PAGE 2 - Creating ID and UserName
var createAccount = document.querySelector("#create-account");
var p = document.querySelector("#userID");
var userName = document.querySelector("input[name='userName']");

ff.collection("users").add({}).then((docRef) => {
    p.innerHTML = docRef.id; //Prints out unique user ID // For Copy
    createAccount.addEventListener("click",function(){
        if (userName.value != "") {
            console.log("click");
            ff.collection("users").doc(docRef.id).set({
                name: userName.value,
                userID: docRef.id,
                assignments: []
            },{merge:true});
            window.location.href = "index.html";
        } else {
            alert("Please type your name in the box.");
        }
    });
});