/**
Emoticon Evaluator, by Daniel Tran
*/

/*
User clicks on a screen element to perform evaluation
*/
document.getElementById("process").onclick = 
function(){
	var str = document.getElementById("input");
	is_emoticon(str.value);
}

/*
User clicks on a screen element to perform preset tests
*/
document.getElementById("enter").onclick = 
function(){
	testEmoticons();
}

/*
States what formats constitute as valid formats for emoticons
*/
function is_emoticon(str){
	
	              //Check conventional left-to-right emoticons
	var result = (check_emoticon(str, 0, 1, 0, 1, false) || 
				  check_emoticon(str, 0, 1, 1, 1, false) ||
				  check_emoticon(str, 1, 1, 0, 1, false) ||
				  check_emoticon(str, 1, 1, 1, 1, false) ||
				  
				  //Check inverse emoticons
				  check_emoticon(str, 1, 0, 1, 0, true) ||
				  check_emoticon(str, 1, 1, 1, 0, true) ||
				  check_emoticon(str, 1, 0, 1, 1, true) ||
				  check_emoticon(str, 1, 1, 1, 1, true) ||
				  
				  //Check Eastern emoticons, with and without sides
				  check_eastern_emoticon(str, 0, 1, 1, 1, 0) ||
				  check_eastern_emoticon(str, 1, 1, 1, 1, 1) ||
				  
				  //Check emoticons that are valid but not in a standard format
				  check_exception_emoticon(str));
	
	return print(result);
}



/**********************************************************************/

/*
Standard printing method for emoticons.

The process involves taking the (raw) input text,
printed with some text padding and then the output
evaluation.

Simply returns whatever was placed into the parameters.
*/
function print(out){
	var str = document.getElementById("input").value;
	var padding = " #### ";
	
	document.getElementById("output").innerHTML += "<br>" + str + padding + out;
	return out;
}