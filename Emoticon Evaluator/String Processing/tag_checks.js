/**
These functions specify methods of managing tag strings
as possible emoticons without applying HTML tags themselves.
*/

/*
This method converts HTML input and prints it as plain text.
Regex conditions ensure that all matches for a given character are converted

Source: https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/
By Chris Coyier, apparently updated on 14 September, 2010
*/
function htmlEntities(str) {
	
    //Convert str to a String to ensure that replace() is applied properly
    return String(str).replace(/&/g, '&amp;')
	              .replace(/</g, '&lt;')
		      .replace(/>/g, '&gt;')
		      .replace(/"/g, '&quot;');
}

