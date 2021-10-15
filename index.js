var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var appconfig = require("./config/appconfig");
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
}); 

require('./app/votesroutes')(app,console);
//require('./app')(app,console);

app.listen(appconfig.apiport, () => {
    console.log('server running at the port', appconfig.apiport);
})

var generalCallback = function(res){
    return function(err, data, msg){
        if (!err)
            res.send(data).status(200);
        else
            res.send(err);
    };
};
