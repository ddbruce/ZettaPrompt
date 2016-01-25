$(function() {

	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results == null) return null;
		return results[1] || 0;
	}

	if ($.urlParam('file') != undefined) {
		$("#script").load("scripts/" + $.urlParam('file'), function (response, status, xhr) {
			if (status == "error") {
				$("#script").load("scripts/" + $.urlParam('file') + ".txt", function (response, status, xhr) {
					if (status == "error") {
						alert("No file found: " + $.urlParam('file'));
					} else {
						$("#marker").show();
					}
				});
			} else {
				$("#marker").show();
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

