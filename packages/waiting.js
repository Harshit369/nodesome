var waiting = function(message){
	while(1){
		console.log(message + " " );
		delay(1000);
		console.log(".");
		delay(1000);
		console.log("\b");
		delay(1000);
		console.log("..");
		delay(1000);
		console.log("\b\b");
		delay(1000);
		console.log("...");
		delay(1000);
		console.log("\b\b\b");
	}
};

exports = waiting;