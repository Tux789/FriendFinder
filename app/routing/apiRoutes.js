var friends = require("../data/friends");

module.exports = function(app){
	app.get("/api/friends", getFriends);
	app.post("/api/friends", addFriends);
}

function getFriends(req,res){
console.log(friends);
return res.json(friends);
}

function addFriends(req,res){
var newFriend = req.body;
console.log()
console.log(newFriend);
 var closeFriend = findFriend(friends, newFriend.scores);
friends.push(newFriend);
return res.json(closeFriend);
}

function findFriend(friendArray, scores){
	var differenceTotals = [];
	for(var i=0;i<friendArray.length;i++){
		differenceTotals.push({totalDifference: 0, indexPos: i});
		for(var j=0;j<10;j++){
			differenceTotals[i].totalDifference += Math.abs(friendArray[i].scores[j] - scores[j]);
		}
	}
	differenceTotals = differenceTotals.sort(function(a,b){
		return a.totalDifference - b.totalDifference;
	});
	console.log(differenceTotals);
	return friends[differenceTotals[0].indexPos];
}