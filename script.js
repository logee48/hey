function abcd(){
  this.render = function(head,otherstuff){
    var a = document.getElementById('border');
    var one = document.getElementById('one');
    var two = document.getElementById('two');
    var three = document.getElementById('three');
  }
  /*this.cancel = function(){
    document.getElementById('border').style.display = "none";
    document.getElementById('one').style.display = "none";
    document.getElementById('two').style.display = "none";
    document.getElementById('three').style.display = "none";
    document.getElementById('four').style.display = "none";
  }*/
  this.ok = function(){
    document.getElementById('border').style.display = "none";
    document.getElementById('one').style.display = "none";
    document.getElementById('two').style.display = "none";
    document.getElementById('three').style.display = "none";
    document.getElementById('four').style.display = "none";

    const username = document.getElementById('prompt_value1').value;

    const firebaseConfig = {
      apiKey: "AIzaSyCd-fxdY_uYnpZaCD6YGJH0SA67R9G5c5U",
      authDomain: "three-91e61.firebaseapp.com",
      databaseURL: "https://three-91e61-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "three-91e61",
      storageBucket: "three-91e61.appspot.com",
      messagingSenderId: "1057079527103",
      appId: "1:1057079527103:web:33fc32778464d7939f280a"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // initialize database
    const db = firebase.database();

    // get user's data


    // submit form
    // listen for submit event on the form and call the postChat function
    document.getElementById("message-form").addEventListener("submit", sendMessage);

    // send message to db
    function sendMessage(e) {
      e.preventDefault();

      // get values to be submitted
      const timestamp = Date.now();
      const messageInput = document.getElementById("message-input");
      const message = messageInput.value;

      // clear the input box
      messageInput.value = "";

      //auto scroll to bottom   // this one doesn't work at all
       //document
        //.getElementById("messages")
        //.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

      //auto scroll thing that i created works perfectly fine
      function scroll_to(div){
       if (div.scrollTop < div.scrollHeight - div.clientHeight)
            div.scrollTop += 10; // move down
      }
      scroll_to('message');

      // create db collection and send in the data
      db.ref("messages/" + timestamp).set({
        username,
        message,
      });
    }

    // display the messages
    // reference the collection created earlier
    const fetchChat = db.ref("messages/");

    // check for new messages using the onChildAdded event listener
    fetchChat.on("child_added", function (snapshot) {
      const messages = snapshot.val();
      const message = `<li class=${
        username === messages.username ? "sent" : "receive"
      }><span>${messages.username}: </span>${messages.message}</li>`;
      // append the message on the page
      document.getElementById("messages").innerHTML += message;
    });
  }
}
var aa = new abcd();
