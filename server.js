var http = require("net");
//var MongoClient = require('mongodb').MongoClient;
var gname=2;
var intCount=0;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';



var findRestaurants = function(db, callback) {
   var cursor =db.collection('test_insert').find();
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        intCount++;
    //     console.dir(doc);
      } else {
         callback();
      }
   });
};

MongoClient.connect(url, function(err, db) {


  assert.equal(null, err);
  findRestaurants(db, function() {
  //  console.log(intCount);
      db.close();
  });


});

var one=function(conn){
  conn.write(JSON.stringify(

    {data :intCount,response :"fa"}


        ));   
}



 //Create a simple server
 var server = http.createServer(function(conn) {
    console.log("Server: Client connected");

//console.log(server);
//this.intCount=13;
//console.log("345");

//console.log(global.intCount);

    // If connection is closed
    conn.on("end", function() {
        console.log('Server: Client disconnected');
        // Close the server
        server.close();
        // End the process
        process.exit(0);
    });

    // Handle data from client
    conn.on("data", function(data) {
        data = JSON.parse(data);
        console.log("Response from client: %s", data.response);
    });

    
one(conn);
  
//  console.log(global.val);
  
//);



});


server.listen(1900,"localhost", function () {
    console.log("Server: Listening");
});