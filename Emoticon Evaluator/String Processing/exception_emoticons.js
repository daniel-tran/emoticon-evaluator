/**
This function checks for any emoticons which are valid, but do not
abide by a conventional abstract format.

As a short-term solution, any emoticon can be placed in this function
and validated as true, but it is suggested that if many exception
emoticons can be abstracted into a certain format, a new function
should be derived instead.
*/

/*
Checks for certain emoticons that are valid but not in a proper format
*/
function check_exception_emoticon(str){
	
	switch (str){
		case "<3":
			return true;
	}
	
	return false;
}

