var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";


MongoClient.connect(url, function(err, db){
    if(err) throw err;
    // create db
    var dbo = db.db("myDB");
    dbo.createCollection("customers", async function(err, res){
        if(err) throw err;
    
        console.log("'customers' collection created");
        
        // data to insert
        var inputCustomers = [{name: "Nate", address: "123 Main Street"}, 
            {name: "James", address: "1834 South Charles"}, 
            {name: "Tupac", address: "222 Thugs Mansion Drive"}, 
            {name: "Fred", address: "5 Cavan Green Circle"},
            {name: "Cassie", address: "56 Riverside Avenue"}];

            // insert   
        await dbo.collection("customers").insertMany(inputCustomers, async function(err,res){
            if(err) throw err;

            console.log("Inserted " + res.insertedCount + " documents into 'customers'");
            
            // sort
            var ascendSort = {name: 1};
            await dbo.collection("customers").find().sort(ascendSort).toArray( async function(err, result){
                if(err) throw err;

                console.log("Sorted: ");
                
                result.forEach(function(element) {
                    console.log(element.name + " " + element.address);
                });

                // update
                var keyValue = {name: "Cassie"};
                var updateValues = { $set: {name: "Cassie", address: "1244 William Street"} };
                await dbo.collection("customers").updateOne(keyValue, updateValues, async function(err, res){
                    if(err) throw err;

                    console.log("Updated document-------------");
                    
                    await dbo.collection("customers").find().sort(ascendSort).toArray(async function(err, result){
                        if(err) throw err;
                        console.log(result[0].name + ": " + result[0].address);
                        
                        // code to delete "customer" collection
                        await dbo.collection("customers").drop(async function(err, deleted){
                            if(err) throw err;

                            if(deleted) 
                                console.log("'customers' deleted");
                            await db.close();
                        });
                    });
                    
                });
            });
        });
        
    });    
});
