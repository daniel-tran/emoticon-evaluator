/**
These functions specify what a valid mouth would be, as well as 
the specifications in regular and inverse formats
*/

/*
States the mouths that can be both inverse and regular mouths
*/
function valid_reversible_mouth(mouth){

	switch(mouth){
		case "O":
		case "0":
		case "o":
		case "D":
		
		case "C":
		case "c":
		case "T":
		case "K":
		case "S":
		case "s":
		case "I":
		case "v":
		case "V":	
		case "L":
		
		case "<":
		case "(":
		case ">":
		case ")":
		case "{":
		case "}":
		case "]":
		case "[":
		
		case "/":
		case "\\":
		case "|":
			return true;
	}

	return false;
}

/*
States the mouths which are regular mouths only
*/
function valid_mouth(mouth){

	//All reversible mouths are also regular mouths
	if (valid_reversible_mouth(mouth)){
		return true;
	}
	
	switch(mouth){
		case "P":
		case "p":
		case "F":
		case "J":
		case "B":
		case "b":
		case "3":
			return true;
	}

	return false;
}

/*
States the mouths which are inverse mouths only
*/
function valid_inverse_mouth(mouth){
	
	//All reversible mouths are also inverse mouths
	if (valid_reversible_mouth(mouth)){
		return true;
	}
	
	switch(mouth){
		
		case "d":
		case "q":
			return true;
	}

	return false;
}