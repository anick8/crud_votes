var pgsql = require('../lib/pgsql')
var utils = require('../common/utils')
var votes = require('./votes');
module.exports = (app, console) => {
//    var utils = require('../common/utils');

    app.post('/insertupvote',async (req, res) => {
         result  = await votes.insertUpVote(req);
         utils.handleresultdict(res,result)
        }
    )
    app.post('/insertdownvote',async (req, res) => {
        result  = await votes.insertDownVote(req);
        utils.handleresultdict(res,result)
       }
   )
    app.post('/clearvotes',async (req, res) => {
        result  = await votes.clearVotes(req);
        utils.handleresult(res,result)
       }
    )
    app.post('/getvotes',async (req, res) => {
        result  = await votes.getVotestatus(req);
        utils.handleresultdict(res,result)
        }
    )

    console.log("Installing TOKEN Routes")
};
