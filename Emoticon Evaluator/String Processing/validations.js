/**
These functions specify abstract validation functions for determining
if a string matches as a valid item or pair of items.
*/

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
