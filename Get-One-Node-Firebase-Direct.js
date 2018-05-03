var https = require('https');
var firebaseHost = "fir-database-quickstart-100fb.firebaseio.com";

/*
  =>  This is an arrow function. Arrow functions are a short syntax, introduced by ECMAscript 6, that can be used similarly to the way you would use function expressions. In other words, you can often use them in place of expressions like function (foo) {...}. But they have some important differences. For example, they do not bind their own values of this. Arrow functions are part of the ECMAscript 6 specification, but not part of "normal" JavaScript in use in most browsers today. They are, however, partially supported in Node v. 4.0+ and in many browsers.
*/

function fbGet(key) {
    return new Promise((resolve, reject) => {
        var options = {
            hostname: firebaseHost,
            port: 443,
            path: key + ".json",
            method: 'GET'
        };
        var req = https.request(options, function (res) {
            res.setEncoding('utf8');
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                resolve(JSON.parse(body))
            });
        });
        req.end();
        req.on('error', reject);
    });
}


function firebasePut(key, value) {

    return new Promise((resolve, reject) => {

        var options = {
            hostname: firebaseHost,
            port: 443,
            path: key + ".json",
            method: 'PUT'
        };

        var req = https.request(options, function (res) {
            res.setEncoding('utf8');
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                resolve(body)
            });
        });
        req.end(JSON.stringify(value));
        req.on('error', reject);
    });
}


function firebasePostNew(path, email) {

    return new Promise((resolve, reject) => {

        var options = {
            hostname: firebaseHost,
            port: 443,
            path: path + ".json",
            method: 'POST'
        };


        var obj = {
            email: email,
            profile_picture: 'prof',
            username: 'timm'
        };

        var req = https.request(options, function (res) {
            res.setEncoding('utf8');
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                resolve(body)
            });
        });
        req.end(JSON.stringify(obj));
        req.on('error', reject);
    });
}



/***********************************************************************************/

console.log('HELLO! Looking for the information on the user you supplied: ');
var argument2;

process.argv.forEach(function (val, index, array) {
    if (index == 2) {
        argument2 = val;
    }
});


//INVOKE GET function
fbGet("/users").then(data => {
    // Transform response Object to Array of objects
    let users = Object.keys(data).map((k) => data[k]);
    //console.log('The List of Users is ', users);

    users.forEach(user => {

        if (user.sessionId == argument2) {
            console.log('FOUND the information on that user ! ');

            console.log(user.sessionId);
            console.log(user.profile_picture);
            console.log(user.email);
            console.log(user.username);
        } else {
            console.log('Sorry nothing FOUND for that user ');

        }

    })
})


// PUT THE session from the event into the current user object to tie it back 

/* "event" object contains payload from Motion AI
    {
        "from":"string", // the end-user's identifier (may be FB ID, email address, Slack username etc, depends on bot type)
        "session":"string", // a unique session identifier
        "botId":"string", // the Motion AI ID of the bot
        "botType":"string", // the type of bot this is (FB, Slack etc)
        "customPayload":"string", // a developer-defined payload for carrying information
        "moduleId":"string", // the current Motion AI Module ID
        "moduleNickname":"string", // the current Motion AI Module's nickname
        "inResponseTo":"string", // the Motion AI module that directed the conversation flow to this module
        "reply":"string", // the end-user's reply that led to this module
        "result":"string" // any extracted data from the prior module, if applicable,
        "replyHistory":"object" // an object containing the current session's conversation messages
        "nlpData":"object" // stringified NLP data object parsed from a user's message to your bot if NLP engine is enabled
        "customVars":"string" // stringified object containing any existing customVars for current session
        "fbUserData":"string" // for Messenger bots only - stringified object containing user's meta data - first name, last name, and id
        "attachedMedia":"string" // for Messenger bots only - stringified object containing attachment data from the user
    }
*/
