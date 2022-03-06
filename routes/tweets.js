const tweetRoutes = (app, fs) => {

    
    // where our data is
    const dataPath = '/Users/lukefronheiser/Desktop/CS-3203/testApp/favs.json';

    //this is reading raw json data
    let rawdata = fs.readFileSync(dataPath);
    //this is how we can read a javascript object
    let tweets = JSON.parse(rawdata);



    // helper read file method to read from json upon request
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    // helper write file method to uipdate json after changes
    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // Get all tweets (created time ("created_at"), and tweet text ("text")) in the file
    app.get('/tweets', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const outputObj = JSON.parse(data);
            res.send(outputObj);
        });
    });
    //Get all users' ID
    app.get('/tweets/users', (req,res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const arr = JSON.parse(data);
            let output = [];
            for(let i = 0; i < arr.length; i++){
                output[i] = [arr[i].user.id,arr[i].user.name];
            }
            res.send(output);
        });
    });

  //Get the details of tweet (text, created time), given ID
  app.get('/tweets/getDetails/:id', (req, res) => {
    const id = Number(req.params["id"]);
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const arr = JSON.parse(data);
        let val = 0;
        for(let i = 0; i < arr.length; i++){
            if(arr[i].id === id){
                val = i;
            }
        }
        res.send([arr[val].created_at, arr[val].text]);
    });
});



    //Create a tweet (given text and ID)
    app.post('/tweets/:id/:text', (req, res) => {
        let rawtweet = req.body;
        const tweet = {
            id: Number(rawtweet.id),
            text: rawtweet.text,
            created_at: new Date().toLocaleString()
        }
        tweets.push(tweet);
        writeFile(JSON.stringify(tweets, null, 2), () => {
            res.status(200).send('new tweet added');
        });
    });


   //Update a screen_name (given name and new screen_name)
   app.put('/tweets/changeScreenName/:name/:screen_name', (req, res) => {
    const name = req.params["name"];
    const screen_name = req.params["screen_name"];
    readFile(data => {

        let val = 0;
        for(let i = 0; i < arr.length; i++){
            if(data[i].user.name === name){
                val = i;
            }
        }
        data[val].user.screen_name = screen_name;
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`updated name`);
        });
    },
        true);
});


   //Delete a tweet (given ID)
   app.delete('/tweets/delete/:id', (req, res) => {
    const id = Number(req.params["id"]);
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const arr = JSON.parse(data);
        let val = 0;
        for(let i = 0; i < data.length; i++){
            if(data[i].id === id){
                val = i;
            }
        }
        delete data[val];
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`tweets id:${id} removed`);
        });
                });
});


};

module.exports = tweetRoutes;