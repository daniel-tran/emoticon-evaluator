/**
These functions specify what a valid nose would be, as well as 
the specifications in regular and inverse formats
*/

/*
States the noses that can be both inverse and regular noses
*/
function valid_reversible_nose(nose){
	
	switch(nose){
		case "-":
		case "^":
		case "*":
		case " ":
			return true;
	}

	return false;
}

/*
States the noses which are regular noses only.
Currently, there are no regular-only noses, so it's just
checking the reversible noses, but this is open to modification.
*/
function valid_nose(nose){
	
	if (valid_reversible_nose(nose)){
		return true;
	}

	return false;
}

/*
States the noses which are inverse noses only.
Currently, there are no inverse-only noses, so it's just
checking the reversible noses, but this is open to modification.
*/
function valid_inverse_nose(nose){
	
	if (valid_reversible_nose(nose)){
		return true;
	}
	
	return false;
}
