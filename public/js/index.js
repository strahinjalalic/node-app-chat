var socket = io();//pravimo zahtev od klijenta ka serveru za otvaranje web socketa i odrzavanje te konekcije otvorenom
  	socket.on("connect", function() {
  		console.log("Connected to server");//metod se izvrsava na klijent strani
  	});

  	socket.on("newMessage", function(message) {//argument koji prosledjujemo je zapravo objekat kreiran na server strani
  		console.log("newMessage", message);

      var li = jQuery("<li></li>");
      li.text(`${message.from}: ${message.text}`);
      jQuery("#messages").append(li);
  	});

  	socket.on("disconnect", function() {//arrow functions ce se renderovati samo na chrome-u, zato se koriste regular functions
  		console.log("Disconnected from server");
  	});

    jQuery("#message-form").on("submit", function(e) {
      e.preventDefault();//sprecavamo refresh stranice i pojavu key/value para u URL baru => zapravo sprecavaju se sve defaultne akcije submita
    
      socket.emit("createMessage", {
        from: "User",
        text: jQuery('[name=message]').val()
      }, function() {

      });
    });



    //socket.emit("createMessage", {
    //   from: "Frank",
    //   text: "Hello everyone"
    // }, function(data){//data se odnosi na string koji smo prosledili callbacku na server strani
    //   console.log("Got it!", data); //treci argument u ovom slucaju je callback funkcija koja se zove event acknowledgements => pise se kod kojim ce server odgovoriti user-u da su podaci uspesno poslati na server
    // });