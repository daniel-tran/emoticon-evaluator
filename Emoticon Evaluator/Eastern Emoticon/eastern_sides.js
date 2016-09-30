/**
These functions specify what valid Eastern sides would be
*/

/*
States the valid Eastern left sides
*/
function valid_eastern_left_side(left){

	switch(left){
		case "(":
			return true;
	}

	return false;
}

/*
States the valid Eastern right sides
*/
function valid_eastern_right_side(right){

	switch(right){
		case ")":
			return true;
	}

	return false;
}

/*
States the valid pairs of Eastern sides. Note
that this causes double definitions with the functions
specified earlier, making changes slightly more difficult.

It should also be noted that sides which are not the same 
are checked manually, to ensure invalid pairs are avoided. 
*/
function valid_eastern_sides(left, right){

	switch(left){
		case "(":
			if (right == ")"){
				return true;
			}
	}

	return false;
}