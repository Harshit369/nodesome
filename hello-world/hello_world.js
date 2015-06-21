console.log("helloooooo! papagera");

var rl = require('readline');
var interface = rl.createInterface(process.stdin,process.stdout,null);

interface.question("What's ur name? -> ",function(answer){
		console.log("hmm " + answer);
	interface.close();
	process.stdin.destroy();
});