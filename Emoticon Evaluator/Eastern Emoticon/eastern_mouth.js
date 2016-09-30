/**
These functions specify what a valid Eastern mouth would be
*/

function valid_eastern_mouth(mouth){

	switch(mouth){
		case "_":
		case "-":
		case ".": 
		case "!":
		case "n":
		case "0":
		case "O":
		case "o":
		case "J":
		case "~":
			return true;
	}

	return false;
}
