/**
These functions specify what valid Eastern eyes would be, as well as 
the specifications in regular and inverse formats
*/

/*
States if a pair of Eastern eyes are syntactically valid
*/
function valid_eastern_eyes(left, right){
	
	//Check if both are valid reversible eyes (e.g. 0.0)
	if (valid_eastern_reversible_eyes(left, right)){
		return true;
	}
	
	//Check if both are valid different eyes (e.g. >_<)
	if (valid_different_eastern_eyes(left, right)){
		return true;
	}
	
	return false;
}

/*
Evaluates the eyes of an Eastern emoticon where the eyes are not
necessarily the same character (e.g. >_<, o.O, etc.)
*/
function valid_different_eastern_eyes(left, right){
	var circle_eyes = "oO0";
	
	//o, O and 0 are all synonymous as valid eye variations
	if (circle_eyes.includes(left) && circle_eyes.includes(right)){
		return true;
	}else{
		
		//Check for emoticons like >.<
		if (left == ">" && right == "<"){
			return true;
		}
	}
	
	return false;
}

/*
Evaluates the eyes of an Eastern emoticon where the eyes are both
reversible and are the same (e.g. ^_^, ;-;, XoX, etc.)
*/
function valid_eastern_reversible_eyes(left, right){
	
	return (valid_eastern_reversible_eye(left) &&
			valid_eastern_reversible_eye(right) &&
			(left == right));
}

/*
States the Eastern eyes that can be both left and right eyes
*/
function valid_eastern_reversible_eye(eye){
	
	switch(eye){
		case "+":
		case "-":
		case "-":
		case "^":
		case "'":
		case "T":
		case "O":
		case "o":
		case "0":
		case ".":
		case "X":
		case "*":
		case "@":
		case "~":
		case ";":
		case "=":
		case ">":
			return true;
	}

	return false;
}

/*
States the Eastern eyes which are left eyes only
*/
function valid_eastern_left_eye(eye){
	
	//All reversible eyes are also left eyes
	if (valid_eastern_reversible_eye(eye)){
		return true;
	}
	
	//Currently, no nonreversible left Eastern eyes

	return false;
}

/*
States the Eastern eyes which are right eyes only
*/
function valid_eastern_right_eye(eye){
	
	//All reversible eyes are also right eyes
	if (valid_eastern_reversible_eye(eye)){
		return true;
	}
	
	switch(eye){
		case "<":
			return true;
	}

	return false;
}
