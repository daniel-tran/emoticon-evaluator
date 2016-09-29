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
	
	var result = (check_emoticon(str, 0, 1, 0, 1, false) || 
				  check_emoticon(str, 0, 1, 1, 1, false) ||
				  check_emoticon(str, 1, 1, 0, 1, false) ||
				  check_emoticon(str, 1, 1, 1, 1, false) ||
				  
				  //Check inverse emoticons
				  check_emoticon(str, 1, 0, 1, 0, true) ||
				  check_emoticon(str, 1, 1, 1, 0, true) ||
				  check_emoticon(str, 1, 0, 1, 1, true) ||
				  check_emoticon(str, 1, 1, 1, 1, true) ||
				  
				  //Check Eastern emoticons, with and without sides
				  check_eastern_emoticon(str, 0, 1, 1, 1, 0) ||
				  check_eastern_emoticon(str, 1, 1, 1, 1, 1));
	
	return print(result);
}

function check_emoticon(str, brows_num, eyes_num, nose_num, mouth_num, inverse){
	
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
		
		//Check for inverse emoticons (e.g. ):, O-:{, I-8, etc.)
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

function check_eastern_emoticon(str, left_side_num, left_eye_num, mouth_num, 
									 right_eye_num, right_side_num){
	
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

/*
Extracts a substring based on the occurrence of a certain item and the number 
of items to expect in a given string. 
*/
function extract(str, item, item_num){
	
	var start = str.indexOf(item) + item.length;
	
	return str.substring(start, start + item_num);
}

/*
Determines if a number of elements in a given item validate
as being syntactically correct according to the validation function.
*/
function valid_item(item, item_num, item_func){
	for (i = 0; i < item_num; i++){
		var single_item = item.charAt(i);
		
		//If the element is not part of the syntax, the item is not valid
		if (!item_func(single_item)){
			return false;
		}
	}
	
	return true;
}

/*
Determines if a number of elements in a two given items validate
as being syntactically correct according to their respective validation 
functions.
A general validation function and their parent string are supplied so
that additional checks can be performed on the two items.
*/
function valid_item_pair(str, left_item, right_item, 
                          left_item_num, right_item_num, 
						  left_item_func, right_item_func, 
						  item_func){
							  
	/*
	Check that each left and right elements correspond according to the 
	general validation function
	*/
	for (i = 0; i < left_item_num && i < right_item_num; i++){
		var single_left_item = str.charAt(str.indexOf(left_item) + i);
		var single_right_item = str.charAt(str.indexOf(right_item) + i);
		
		//If a pair of left and right elements mismatches, the item pair is not valid.
		if (!item_func(single_left_item, single_right_item)){
			return false;
		}
	}
	
	/*
	The following code is utilised if left_item_num != right_item_num
	(i.e. if an allowed format permits pairs with non-symmetrical element numbers)
	*/
	
	if (left_item_num > right_item_num){
		
		/*
		Left side is longer than the right side, so find the excess left side
		elements and check them for validity with the supplied left item function.
		*/
		var diff = left_item_num - right_item_num;
		var locate = str.indexOf(left_item) + right_item_num;
		
		for (i = 0; i < diff; i++){	
			var single_item = str.charAt(locate + i);
			
			//An excess left item is not a valid left item
			if (!left_item_func(single_item)){
				return false;
			}
		}
	}else if (right_item_num > left_item_num){
		
		/*
		Right side is longer than the left side, so find the excess right side
		elements and check them for validity with the supplied right item function.
		*/
		var diff = right_item_num - left_item_num;
		var locate = str.indexOf(right_item) + left_item_num;
		
		for (i = 0; i < diff; i++){
			var single_item = str.charAt(locate + i);
			
			//An excess right item is not a valid right item
			if (!right_item_func(single_item)){
				return false;
			}
		}
	}
	
	return true;
}


/**********************************************************************/

function valid_eastern_eyes(left, right){
	
	if (valid_eastern_reversible_eyes(left, right)){
		return true;
	}
	
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

function valid_eastern_left_eye(eye){
	
	if (valid_eastern_reversible_eye(eye)){
		return true;
	}
	
	//Currently, no nonreversible Eastern eyes

	return false;
}

/*
Note that > is a reversible Eastern eye, but it is helpful for checking
>_< where < is nonreversible.
*//*
function valid_eastern_nonreversible_left_eye(eye){
	
	switch(eye){
		case ">":
			return true;
	}
	
	return false;
}*/

function valid_eastern_right_eye(eye){
	
	if (valid_eastern_reversible_eye(eye)){
		return true;
	}
	
	switch(eye){
		case "<":
			return true;
	}

	return false;
}
/*
function valid_eastern_nonreversible_right_eye(eye){
	switch(eye){
		case "<":
			return true;
	}

	return false;
}*/

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


function valid_eastern_left_side(left){

	switch(left){
		case "(":
			return true;
	}

	return false;
}

function valid_eastern_right_side(right){

	switch(right){
		case ")":
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