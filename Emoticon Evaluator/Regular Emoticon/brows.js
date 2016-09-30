/**
These functions specify what valid brows would be, as well as 
the specifications in regular and inverse formats
*/

/*
States the brows that can be both inverse and regular brows
*/
function valid_reversible_brows(brows){
	switch(brows){
		case "|":
			return true;
	}

	return false;
}

/*
States the brows which are regular brows only
*/
function valid_brows(brows){
	
	//All reversible brows are also regular brows
	if (valid_reversible_brows(brows)){
		return true;
	}
	
	switch(brows){
		case ">":
		case "}":
			return true;
	}

	return false;
}

/*
States the brows which are inverse brows only
*/
function valid_inverse_brows(brows){
	
	//All reversible brows are also inverse brows
	if (valid_reversible_brows(brows)){
		return true;
	}
	
	switch(brows){
		case "<":
		case "{":
			return true;
	}

	return false;
}
