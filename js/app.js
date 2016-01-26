$(function() {

	var speed = 0;
	var savedspeed = 0;
	var scriptstatus = 0;

	$.urlParam = function(name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results == null) return null;
		return results[1] || 0;
	}

	var param = $.urlParam('file');

	if (param != undefined) {
		$("#script").load("scripts/" + param, function(response, status, xhr) {
			if (status == "error") {
				$("#script").load("scripts/" + param + ".txt", function(response, status, xhr) {
					if (status == "error") {
						alert("No file found: " + param);
					} else {
						$("#marker").show();
						document.title = "ZettaPrompt || " + param + ".txt";
						scriptstatus = 1;
					}
				});
			} else {
				$("#marker").show();
				document.title = "ZettaPrompt || " + param;
				scriptstatus = 1;
			}
		});
	} else {
		$("#script-search").show("slow");
	}

	$("#script-search-input").focus();

	$('#script-search-input').keydown(function(e) {
		if (e.which == 13) {
			e.preventDefault();
			var searchinput = $("#script-search-input").val();
			window.location = window.location.href + "?file=" + searchinput;
		}
	});

	$(document).keydown(function(e) {
		if (scriptstatus == 1) {
			if (e.which == 32) {
				e.preventDefault();
				if (speed == 0 && savedspeed != 0) {
					speed = savedspeed;
				} else if (speed != 0) {
					savedspeed = speed;
					speed = 0;
				} else if (speed == 0 && savedspeed == 0) {
					speed = 1;
				}
			} else if (e.which == 40 && !e.shiftKey) {
				e.preventDefault();
				speed += 1;
			} else if (e.which == 40 && e.shiftKey) { 
				e.preventDefault();
				window.scrollBy(0, 150);
			} else if (e.which == 38 && !e.shiftKey) {
				e.preventDefault();
				speed -= 1;
			} else if (e.which == 38 && e.shiftKey) {
				e.preventDefault();
				window.scrollBy(0, -150);
			} else if (e.which == 70 && !e.shiftKey && !e.ctrlKey) { 
				e.preventDefault();
				speed = 2;
			} else if ((e.which == 70 && e.shiftKey && !e.ctrlKey) != (e.which == 70 && !e.shiftKey && e.ctrlKey)) {
				e.preventDefault();
				speed = 3;
			} else if (e.which == 70 && e.shiftKey && e.ctrlKey) { 
				e.preventDefault();
				speed = 4;
			} else if (e.which == 82 && !e.shiftKey && !e.ctrlKey) {
				e.preventDefault();
				speed = -2;
			} else if ((e.which == 82 && e.shiftKey && !e.ctrlKey) != (e.which == 82 && !e.shiftKey && e.ctrlKey)) {
				e.preventDefault();
				speed = -3;
			} else if (e.which == 82 && e.shiftKey && e.ctrlKey) {
				e.preventDefault();
				speed = -4;
			}
		}
	});

setInterval(function() {
	window.scrollBy(0, 1 * speed);
}, 33);

});