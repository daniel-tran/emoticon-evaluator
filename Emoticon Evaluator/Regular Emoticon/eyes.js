/**
These functions specify what valid eyes would be, as well as 
the specifications in regular and inverse formats
*/

/*
States the eyes that can be both inverse and regular eyes
*/
function valid_reversible_eyes(eye){
	
	switch(eye){
		case ":":
		case "=":
		case "X":
		case "8":
			return true;
	}

	return false;
}

/*
States the eyes which are regular eyes only
*/
function valid_eyes(eye){
	
	//All reversible eyes are also regular eyes
	if (valid_reversible_eyes(eye)){
		return true;
	}
	
	switch(eye){
		case ";":
		case "B":
			return true;
	}

	return false;
}

/*
States the eyes which are inverse eyes only.
This is open to modification when inverse-only eyes
exist in the future
*/
function valid_inverse_eyes(eye){
	
	//All reversible eyes are also inverse eyes
	if (valid_reversible_eyes(eye)){
		return true;
	}

	return false;
}
