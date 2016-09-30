/**
These functions are intended for performing tests to ensure
processes are working as intended.
*/

function testEmoticons(){
	
	//*//Comment out tests so you don't have to scroll down so much on the HTML page
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

/*
The test function, printing if the result of is_emoticon(txt) matches
the given expected result.
*/
function test(txt, expect){
	document.getElementById("input").value = txt;
	var out = document.getElementById("output");
	
	//This function computes the result
	var result = is_emoticon(txt);
	
	if (result == expect){
		out.innerHTML += "<br>" + txt +" is CORRECT as being "+ expect;
	}else{
		out.innerHTML += "<br>" + txt +" is NOT "+ expect;
	}
	out.innerHTML += "<br>";
}
