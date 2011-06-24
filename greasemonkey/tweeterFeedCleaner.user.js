// ==UserScript==
// @name           STUF
// @description	   No config. Add a "Clean" button that removes every answer from the twitter user timeline viewed. No more.
// @version        0.4
// @namespace      http://codeblessyou.com/
// @include        http://twitter.com/#!/*
// @include        https://twitter.com/#!/*
// @match          http://twitter.com/#!/*
// @match          https://twitter.com/#!/*
// ==/UserScript==

function stuf(){
	var nb_try = 10; // try 10 times to init

	function init() {
		console.log("init");
		if (isTwitterReady()) {
			var newButtonHtml = '<div id="sanitizeTwitterUserFeed" class="button">Clean feed</div>';
			$(".buttons").first().prepend(newButtonHtml); // add buttons
			$("#sanitizeTwitterUserFeed").click(cleanStream); // bind click
		} else if (nb_try--){
			window.setTimeout(init, 1000); // loop for waiting
		}
	}

	function isTwitterReady() {
		return typeof $ != 'undefined' && $('div.buttons').length;
	}
	
	function cleanStream(){
		$(".stream-items>div").filter(function(index){
			//filter on elements that start with @
			return $(this).find(".tweet-text").html().substring(0,1)=='@';
		}).hide();
	}

	init();
}
console.log("loaded");
var stuf_script = document.createElement("script"); // add new script element
stuf_script.id = 'stuf_script';
stuf_script.text ="(function"+ stuf.toString().substr(13)+"\n"+ ')()';
document.body.appendChild(stuf_script); //inject




