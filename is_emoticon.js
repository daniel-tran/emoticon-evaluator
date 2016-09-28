/*
Emoticon Evaluator, by Daniel Tran
*/

document.getElementById("process").onclick = 
function(){
	var str = document.getElementById("input");
	is_emoticon(str.value);
}

document.getElementById("enter").onclick = 
function(){
	testEmoticons();
}

function testEmoticons(){
	
	//Test basic emoticons
	test(":)", true);
	test(":-)", true);
	test(">:)", true);
	test(">:-)", true);
	
	//Test basic inverse emoticons
	test("):", true);
	test(")-:", true);
	test(")-:{", true);
	test("):{", true);
	
	//Test basic eastern emoticons and some false cases
	test(";~;", true);
	test("(;~;)", true);
	test("---", false);
	test("(---)", false);
	test("((-~-))", false);
	
	//*//Comment out tests so you don't have to scroll down so much on the HTML page
	//Test double ups on emoticon elements (expected to fail)
	test("::-P", false);
	test(":-^)", false);
	test(":-)O", false);
	test(":-^))", false);
	test(";:-^))", false);
	
	//Test double ups on inverse emoticon elements (expected to fail)
	test(")O^:", false);
	test("O^^:", false);
	test("O^:8", false);
	test(")O^-:", false);
	test(")O-:8", false);
	test(")O*-:8", false);
	
	//Test non-face emoticons
	test("<3", true);
	
	//*/
	//Test emoticons with elements in multiple categories (e.g. < is both a mouth and inverse brow)
	test(">:", true);
	test(">:<", true);
	test(">O<", true);
	test(": T", true);
	test(":  ", false);
	test("BB", false);
	test("B-B", true);
}

function test(txt, expect){
	document.getElementById("input").value = txt;
	var result = is_emoticon(txt);
	var out = document.getElementById("output");
	
	if (result == expect){
		out.innerHTML += "<br>" + txt +" is CORRECT as being "+ expect;
	}else{
		out.innerHTML += "<br>" + txt +" is NOT "+ expect;
	}
	out.innerHTML += "<br>";
}

function is_emoticon(str){
	
	//Manual check for all emoticons not in the standard face form e.g. <3, ...
	//For compilation reasons, </3 is a valid emoticon but will not be printed 
	//in the standard way. (< is interpreted as a tag entry)
	
	switch (str){
		case "<3":
		case "</3": 
			return print(true);
	}
	
	var len = str.length; //This is just a truncation variable
	var last_char = len - 1;
	var first_index = 0;
	var nose_index = first_index + 1;
	
	var inverse_brows_index = 0;
	var inverse_eyes_index = inverse_brows_index + 1; //Use >:( as the template
	var inverse_nose_index = last_char - 1;
	
	var std_emot_length = 2; //Length of a simple emoticon (e.g. :L, XD, etc.)
	var brows_emot_length = std_emot_length + 1;
	
	//is it an Asian emoticon? e.g. o_O, ;_;, ...
	if (is_eastern_emoticon(str)){
		return print(true);
	}
	
	//Emoticon eyes are presumed as first character
	var eyes = str.charAt(first_index);

	//If the emoticon is an eyes-first icon e.g. :P, :O, ...
	if (valid_eyes(eyes)){

		//Check if emoticon has enough characters with a valid mouth. (e.g. :-I, etc.)
		if (str.length >= std_emot_length){
			var mouth = str.charAt(last_char);
			
			//Check for a valid nose and that only one nose is present
			if (str.length >= brows_emot_length){	
			
				var nose = str.charAt(nose_index);
				
				/*
				Invalid emoticon has multiple noses or mouths.
				The check is made here because the error can be caught 
				better, otherwise the emoticon escapes into the else part
				of this code segment, and enumerates to being true.
				*/
				if (!single_instance(str, nose) || !single_instance(str, mouth)){
					return print(false);
				}
				
				//Check for the format: eyes nose mouth (e.g. :-T)
				return print(valid_eyes(eyes) && valid_nose(nose) && valid_mouth(mouth));
			}else{
				
				/*
				Check for only one instance of the mouth and valid eyes
				This is to check for any characters that can be both eyes and mouths
				(e.g. consider :B and B] where B is common).
				Also check that eyes and mouth are different, so BB as an emoticon is not passed.
				*/
				if ((!single_instance(str, mouth) && !valid_eyes(eyes)) || (eyes == mouth)){
					return print(false);
				}
				
				//Check for the format: eyes mouth (e.g. :J)
				return print(valid_eyes(eyes) && valid_mouth(mouth));
			}   
	    }
	   
	//If the emoticon is a brows-first emoticon (e.g. >:), >:D, etc.)
	}else if (valid_brows(eyes) && valid_eyes(str.charAt(inverse_eyes_index))){

		//Exception for >: and }:, which are indeed inverse emoticons but recognised mouth as brows
		if (str.length == std_emot_length){
			return print(true);
		}

		//Remove brows and recheck the emoticon if valid
		str = str.slice(inverse_eyes_index, len);
		
		/*
		If there are more brows than necessary, it is not an emoticon.
		Reprocess a simpler format of the emoticon with recursion.
		*/
		var first_char = str.charAt(first_index);
		if (!valid_brows(first_char)){
			return is_emoticon(str);
		}
		
	//If the emoticon is a mouth-first emoticon (e.g. D:, 0:, ):, etc.)
	}else if (valid_inverse_mouth(eyes)){

		//Re-label eyes as mouth (gets confusing if not changed)
		var mouth = eyes;
		
		//Check for a new set of eyes, and set them up if allowed
		if (str.length >= std_emot_length){    
			var new_eyes = str.charAt(last_char);
			var nose = str.charAt(inverse_nose_index);
			
			//Check for inverse brows (e.g. ]:<, etc.)
			if (valid_inverse_brows(new_eyes) && valid_inverse_eyes(nose)){
				
				  str = str.slice(first_index, last_char); //Cut off the brows
				  
				  /*
				  Check that there are no more inverse brows than necessary
				  and reprocess a simpler format of the emoticon with recursion
				  */
				  var final_char = str.charAt(last_char);
				  if (!valid_brows(final_char)){
					  return is_emoticon(str);
				  }
			}
			
			//Emoticon has 3 characters, implied that there is a nose 
			if (str.length >= brows_emot_length){
				
				/*
				Invalid emoticon has multiple noses or mouths.
				The check is made here because the error can be caught 
				better, otherwise the emoticon escapes into the else part
				of this code segment, and enumerates to being true.
				*/
				if (!single_instance(str, nose) || !single_instance(str, mouth)){
					return print(false);
				}
				
				//Check for format: mouth nose eyes (e.g. L-:, D*:, etc.)
				return print(valid_inverse_eyes(new_eyes) && valid_inverse_nose(nose) 
				          && valid_inverse_mouth(mouth));
									
			}else{
				
				//Check for only one instance of the mouth
				if (!single_instance(str, mouth)){
					return print(false);
				}
				
				//Check for format: mouth eyes (e.g. O:)
				return print(valid_inverse_mouth(mouth) && valid_inverse_eyes(new_eyes));
			}
		}
	}
	
	return print(false);
}


/**********************************************************************/

function is_eastern_emoticon(str){
	
	var left = str.slice(0, 1);
	var right = str.slice(str.length - 1, str.length);
	var east_emot_length = 3;
	
	if (str.length == east_emot_length){
		
		var mouth = str.slice(1, 2);
		
		//Emoticons such as ___ and --- are not allowed, where all characters are the same.
		if (left == mouth && right == mouth){
			return false;
		}
		
		return valid_eastern_eyes(left, right) && valid_eastern_mouth(mouth);
	}else if (valid_eastern_sides(left, right)){
		
		//Cuts off the sides to properly evaluate the actual emoticon
		str = str.slice(1, str.length - 1);
		
		//Check that only one layer of sides exists. This means ((O.o)) and >>_<<is not valid
		left = str.slice(0, 1);
		right = str.slice(str.length - 1, str.length);
		
		if (valid_eastern_sides(left, right)){
			return false;
		}
		
		return is_eastern_emoticon(str);
	}

	return false;
}

function valid_eastern_eyes(left, right){
	
	switch(left){
		case "+":
		case "-":
		case "-":
		case "^":
		case "'":
		case "T":
		case "O":
		case "o":
		case "0":
		case ">":
		case ".":
		case "X":
		case "*":
		case "@":
		case "~":
		case ";":
		case "=":		
			if ((right == left) || valid_different_eastern_eyes(left, right)){
					return true;
			}
			break;
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

function valid_eastern_sides(left, right){

	switch(left){
		case "(":
			if (left == "(" && right == ")"){
				return true;
			}
	}

	return false;
}

/**********************************************************************/

function valid_reversible_brows(brows){
	switch(brows){
		case "|":
			return true;
	}

	return false;
}

function valid_brows(brows){
	
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

function valid_inverse_brows(brows){
	
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

/**********************************************************************/

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

function valid_eyes(eye){
	
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

function valid_inverse_eyes(eye){
	
	if (valid_reversible_eyes(eye)){
		return true;
	}

	return false;
}

/**********************************************************************/

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


function valid_nose(nose){
	
	if (valid_reversible_nose(nose)){
		return true;
	}

	return false;
}

/*
All noses are reversible, but this function exists in 
case non-reversible noses are introduced.
*/
function valid_inverse_nose(nose){
	
	if (valid_reversible_nose(nose)){
		return true;
	}
	
	return false;
}

/**********************************************************************/

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

function valid_mouth(mouth){

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

function valid_inverse_mouth(mouth){
	
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

/**********************************************************************/

/*
Checks that a given string has only one instance of a given character.
This function is intended for general emoticon application, so both the 
reverse and regular emoticons need to be checked for.

This function works by taking the character called nose (can be any
part of the emoticon in reality) in the string str and the characters
to the immediate sides of nose (nbext and prev).
Nose is type-checked with next and prev using same_type() and returns
false if there is a match of nose && next, or nose and prev.
*/
function single_instance(str, nose){
	
	var pos = str.indexOf(nose);
	var next = str.charAt(pos + 1);
	var prev = str.charAt(pos - 1);
	
	//Check for emoticons in both directions e.g. :-^), and (^-:
	if (same_type(nose, next) ||
	    same_type(nose, prev)){
		return false;
	}
	return true;
}

/*
Type checking that two items are of the same category.
valid_inverse_nose() is left commented in case it is implemented later on.
*/
function same_type(temp1, temp2){
	
	return ((valid_eyes(temp1) && 
	         valid_eyes(temp2)) || 
			 
	        (valid_inverse_eyes(temp1) && 
			 valid_inverse_eyes(temp2)) ||
			 
	        (valid_nose(temp1) && 
			 valid_nose(temp2)) || //valid_inverse_nose(temp) ||
			 
	        (valid_mouth(temp1) && 
			 valid_mouth(temp2)) || 
			 
			(valid_inverse_mouth(temp1) && 
			 valid_inverse_mouth(temp2)) ||
			 
	        (valid_brows(temp1) && 
			 valid_brows(temp2)) || 
			 
			(valid_inverse_brows(temp1) && 
			 valid_inverse_brows(temp2))
			);
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

