$(function() {

	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results == null) return null;
		return results[1] || 0;
	}

	var param = $.urlParam('file');

	if (param != undefined) {
		$("#script").load("scripts/" + param, function (response, status, xhr) {
			if (status == "error") {
				$("#script").load("scripts/" + param + ".txt", function (response, status, xhr) {
					if (status == "error") {
						alert("No file found: " + param);
					} else {
						$("#marker").show();
						document.title = "ZettaPrompt || " + param + ".txt";
					}
				});
			} else {
				$("#marker").show();
				document.title = "ZettaPrompt || " + param;
			}
		});
	} else {
		$("#script-search").show("slow");
	}

	$("#script-search-input").focus();

	$('#script-search-input').keypress(function(e) {
		if (e.which == 13) {
			e.preventDefault();
			var searchinput = $("#script-search-input").val();
			window.location = window.location.href + "?file=" + searchinput;
		}
	});
});

