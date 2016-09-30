/**
These functions specify how to validate certain emoticons
*/

/*
Extracts a substring based on the occurrence of a certain item and the number 
of items to expect in a given string. 
*/
function extract(str, item, item_num){
	
	//Find said item, but start at the end of it
	var start = str.indexOf(item) + item.length;
	
	//Gets the string of item_num length beginning at start
	return str.substring(start, start + item_num);
}

/*
Checks if str meets the required format specified by the num variables
(e.g. if check_emoticon(str, 1, 1, 2, 0, false) then str is required to have
only one brow, one eyes and two noses to be considered valid)

The inverse specifier indicates if the emoticon is considered in its inverse
format 
(e.g. if check_emoticon(str, 1, 1, 2, 0, true) then str is required to have
only one mouth, one nose and two eyes to be considered valid)
*/
function check_emoticon(str, brows_num, eyes_num, nose_num, mouth_num, inverse){
	
	//Invalidate strings that exceed the expected format length
	var expect_length = brows_num + eyes_num + nose_num + mouth_num;
	if (str.length != expect_length){
		return false;
	}
	
	var temp = "";
	var brows = str.substring(0, brows_num);
	
	temp += brows;
	var eyes = extract(str, temp, eyes_num);
	
	temp += eyes;
	var nose = extract(str, temp, nose_num);
	
	temp += nose;
	var mouth = extract(str, temp, mouth_num);
	
	/*
	Prevent emoticons such as BB from passing (B is both an eye and mouth 
	character). However, B-B is still technically valid, although it appears
	more like an Eastern emoticon despite it not being part of that syntax.
	*/
	if (eyes == mouth && eyes_num > 0 && mouth_num > 0 && nose_num <= 0){
		return false;
	}
	
	var result = true;
	if (inverse){
		
		/*
		Check for inverse emoticons (e.g. ):, O-:{, I-8, etc.) by simply
		changing the validation functions for each element
		*/
		result = (valid_item(brows, brows_num, valid_inverse_mouth) &&
				  valid_item(eyes, eyes_num, valid_inverse_nose) &&
				  valid_item(nose, nose_num, valid_inverse_eyes) &&
				  valid_item(mouth, mouth_num, valid_inverse_brows));
	}else{
		
		//Check for regular emoticons (e.g. :), >;^], B-T, etc.)
		result = (valid_item(brows, brows_num, valid_brows) &&
				  valid_item(eyes, eyes_num, valid_eyes) &&
				  valid_item(nose, nose_num, valid_nose) &&
				  valid_item(mouth, mouth_num, valid_mouth));
	}
	
	return result;
}

/*
Checks if str meets the required Eastern emoticon format specified by the 
num variables.
(e.g. if check_eastern_emoticon(str, 1, 0, 1, 2, 0) then str is required to have
only one left side, one mouth and two right eyes to be valid)
*/
function check_eastern_emoticon(str, left_side_num, left_eye_num, mouth_num, 
									 right_eye_num, right_side_num){
	
	//Invalidate strings that exceed the expected format length
	var expect_length = left_side_num + left_eye_num + mouth_num + 
						right_eye_num + right_side_num;
	if (str.length != expect_length){
		return false;
	}
	
	var temp = "";
	var left_side = str.substring(0, left_side_num);
	
	temp += left_side;
	var left_eye = extract(str, temp, left_eye_num);
	
	temp += left_eye;
	var mouth = extract(str, temp, mouth_num);
	
	temp += mouth;
	var right_eye = extract(str, temp, right_eye_num);
	
	temp += right_eye;
	var right_side = extract(str, temp, right_side_num);
	
	//Prevent emoticons such as --- and ... from passing
	if (left_eye == mouth && right_eye == mouth){
		return false;
	}
	
	//Check that the sides and eyes are paired correctly, and mouth is valid
	var result = (valid_item_pair(str, left_side, right_side, 
	                                  left_side_num, right_side_num, 
									  valid_eastern_left_side, valid_eastern_right_side, 
									  valid_eastern_sides) &&
				 valid_item_pair(str, left_eye, right_eye, 
	                                  left_eye_num, right_eye_num, 
									  valid_eastern_left_eye, valid_eastern_right_eye, 
									  valid_eastern_eyes) &&
				 valid_item(mouth, mouth_num, valid_eastern_mouth) );
	
	return result;
}
