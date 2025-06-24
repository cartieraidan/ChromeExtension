console.log("Extension script loaded lol");

/*
//obsolete
//fetch('http://127.0.0.1:5000/api/users/').then(r => r.text()).then(result => {
  //console.log(result);
//});

// here to test post content for http

//##################this all works here, add to content.js 
// next step is to stop the enter button and to have a per user stored variables to be sent back as stored sensitive dat
const contentVar = "Content to be sent to api for testing";

fetch('http://localhost:5000/api/content/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content: contentVar,
    // for sending stored sensitive data
    //sensitiveDataStored: "some values"
  })
})
.then(respnose => respnose.json())
.then(data => {
  console.log('Response from server: ', data);
})
.catch(error => {
  console.error('Error posting content: ', error);
});
//#################################new implementation stops here
*/

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "log") {
    console.log("Background received:", request.message);
  }
});
