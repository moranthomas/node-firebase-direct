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



function firebasePostNew(path, sessionId, email) {

    return new Promise((resolve, reject) => {

        var options = {
            hostname: firebaseHost,
            port: 443,
            path: path + ".json",
            method: 'POST'
        };


        var obj = {
            sessionId: sessionId,
            email: email,
            profile_picture: '',
            username: ''
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


console.log('POSTING NEW !');

var emailSupplied = getEmailData();
var sessionIdSupplied = getSessionData();

function getEmailData() {
    var email = 'MJ@Superhuman.com'
    console.log('The email supplied is : ' + email);
    return email;
}

function getSessionData() {
    var sessionId = 'session20000'
    console.log('The sessionId supplied is : ' + sessionId);
    return sessionId;
}

// Invoke the POST NEW function 
firebasePostNew("/users/", sessionIdSupplied, emailSupplied).then(data => {
    console.log('SESSION IS : ', sessionIdSupplied);
    console.log('EMAIL IS : ', emailSupplied);
}, function (reason) {
    console.log('Put request was rejected !');
});


console.log('GETTING NEW !');

//Invoke GET function
fbGet("/users").then(data => {
    // Transform response Object to Array of objects
    let users = Object.keys(data).map((k) => data[k]);
    console.log('The List of Users is ', users);
})


// PUT THE session from the event into the current user object to tie it back
