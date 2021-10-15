var pgsql = require('../lib/pgsql')
var hash =require('../lib/hash')

var getVote = async (VoteUUID,IdentityUUID) => {
    var qarg=[VoteUUID,IdentityUUID]
    qname='select "VoteStatus" from "Votes" where "VoteUUID"=$1 and "IdentityUUID"= $2' 
    try{
        result =await pgsql.conquery(qname,qarg)
        console.log(result.rowCount)
        if (result.rowCount == 1)
        {
            return {'error':null,'data':result.rows,'msg':"Already voted"}
        }
        else if(result.rowCount == 0)
            return {'error':null,'data':null,'msg':"No votes"}
            
    }
    catch(err)
    {
        return {'error':err,'data':null,'msg':"Error getting Vote from the database : "+err.detail}
    }

};
var updateVote = async (VoteUUID,IdentityUUID,VoteStatus) => {
    var qarg=[VoteUUID,IdentityUUID,VoteStatus]
    qname='update "Votes" set "VoteStatus"=$3 where "VoteUUID"=$1 and "IdentityUUID"=$2' 
    try{
        result =await pgsql.conquery(qname,qarg)
        console.log(result.rowCount)
        if (result.rowCount == 1)
            data = {"VoteUUID":VoteUUID}
            return {'error':null,'data':data,'msg':"Successfully Voted"}
    }
    catch(err)
    {
        return {'error':err,'data':null,'msg':"Error Inserting Vote to the database : "+err.detail}
    }

};
var insertVote = async (VoteUUID,IdentityUUID,VoteStatus) => {
    var qarg=[VoteUUID,IdentityUUID,VoteStatus]
    qname='Insert into "Votes" ("VoteUUID","IdentityUUID","VoteStatus") values($1,$2,$3)' 
    try{
        result =await pgsql.conquery(qname,qarg)
        console.log(result.rowCount)
        if (result.rowCount == 1)
            data = {"VoteUUID":VoteUUID}
            return {'error':null,'data':data,'msg':"Successfully Voted"}
    }
    catch(err)
    {
        return {'error':err,'data':null,'msg':"Error Inserting Vote to the database : "+err.detail}
    }

};

exports.insertUpVote = async (req) => {
        var {VoteUUID,IdentityUUID} = req.body;
        try
        {   
            vote = await getVote(VoteUUID,IdentityUUID)
            if (vote.data)
            {
                result = await updateVote(VoteUUID,IdentityUUID,1)
                if (result.data)
                {
                    data ={'IdentityUUID':IdentityUUID,'VoteUUID':VoteUUID}
                    return {'error':null,'data':data,'msg':"changed vote status to upvote"}
                }
                else 
                    return {'error':result.error,'data':null,'msg':"No votes"}
            }
            else
            {
                result = await insertVote(VoteUUID,IdentityUUID,1)
                if (result.data)
                {
                    data ={'IdentityUUID':IdentityUUID,'VoteUUID':VoteUUID}
                    return {'error':null,'data':data,'msg':"inserted an upvote"}
                }
                else 
                    return {'error':result.error,'data':null,'msg':"No votes"}
            }
        }
        catch(err)
        {
            return {'error':err,'data':null,'msg':"Error inserting vote to database : "+err.detail}
        }


};
exports.insertDownVote = async (req) => {
    var {VoteUUID,IdentityUUID} = req.body;
    try
    {   
        Vote = await getVote(VoteUUID,IdentityUUID)
        if (Vote.data)
        {
            result = await updateVote(VoteUUID,IdentityUUID,-1)
            if (result.data)
            {
                data ={'IdentityUUID':IdentityUUID,'VoteUUID':VoteUUID}
                return {'error':null,'data':data,'msg':"changed vote status to down vote"}
            }
            else 
                return {'error':result.error,'data':null,'msg':"No votes"}
        }
        else
        {
            result = await insertVote(VoteUUID,IdentityUUID,-1)
            if (result.data)
            {
                data ={'IdentityUUID':IdentityUUID,'VoteUUID':VoteUUID}
                return {'error':null,'data':data,'msg':"inserted downvote"}
            }
            else if(result.rowCount == 0)
                return {'error':result.error,'data':null,'msg':"No votes"}
        }
    }
    catch(err)
    {
        return {'error':err,'data':null,'msg':"Error inserting vote to database : "+err.detail}
    }


};
exports.clearVotes = async (req) => {
    var {VoteUUID} = req.body;
    var qarg=[VoteUUID]
    qname='delete from "Votes" where "VoteUUID"=$1' 
    try{
        result =await pgsql.conquery(qname,qarg)
        console.log(result.rowCount)
        if (result.rowCount == 1)
            data = {"VoteUUID":VoteUUID}
            return [null,data,"Successfully deleted votes"]
    }
    catch(err)
    {
        return [err,null,"Error deleting votes from database: "+err.detail]
    }

};



exports.getVotestatus = async (req) => {
    var {VoteUUID,IdentityUUID} = req.body;
    result = await getVote(VoteUUID,IdentityUUID)
    return {'error':result.error,'data':result.data,'msg':resut.msg}
}






