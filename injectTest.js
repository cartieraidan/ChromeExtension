(function () {

   setInterval(() => {
        var data = { type: "FROM_PAGE", text: "Message from webpage"};
   window.postMessage(data, "*");
   }, 1000); 
   //look into doing handshakes
})();
