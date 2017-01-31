function script_bottom_padding() {
	var scriptbottompadding = $(window).height() - 320;
	$("#script").css("padding-bottom", scriptbottompadding);
}


$(function() {

	var speed = 0;
	var savedspeed = 0;
	var scriptstatus = 0;

	script_bottom_padding();

	window.onresize = function(e) {
		script_bottom_padding();
	};

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
			} else if (e.which == 70 && !e.shiftKey && !(e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				speed = 2;
			} else if ((e.which == 70 && e.shiftKey && !(e.ctrlKey || e.metaKey)) != (e.which == 70 && !e.shiftKey && (e.ctrlKey || e.metaKey))) {
				e.preventDefault();
				speed = 3;
			} else if (e.which == 70 && e.shiftKey && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				speed = 4;
			} else if (e.which == 82 && !e.shiftKey && !(e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				speed = -2;
			} else if ((e.which == 82 && e.shiftKey && !(e.ctrlKey || e.metaKey)) != (e.which == 82 && !e.shiftKey && (e.ctrlKey || e.metaKey))) {
				e.preventDefault();
				speed = -3;
			} else if (e.which == 82 && e.shiftKey && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				speed = -4;
			}
		}
	});

	var gamepads = {};

	function gamepadLoop(gamepadIndex) {
		gamepad = gamepads[gamepadIndex];
		setInterval(function() {
			navigator.getGamepads();
			if (Math.abs(gamepad.axes[1]) < 0.01) {
				speed = 0;
			} else {
				multiplier = (((gamepad.axes[6] * -1) + 1) * 5) + 1;
				joystickspeed = gamepad.axes[1] * 2.5;
				speed = Math.floor(joystickspeed * multiplier);
				console.log("joystickspeed: " + joystickspeed);
				console.log("speed: " + speed);
			}
			console.log(gamepad.axes[1]);
		}, 100)
	}

	function gamepadHandler(event, connecting) {
		var gamepad = event.gamepad;

		if (connecting) {
			gamepads[gamepad.index] = gamepad;
			gamepadLoop(gamepad.index);
		} else {
			delete gamepads[gamepad.index];
		}
	}


	window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
	window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);

	setInterval(function() {
		window.scrollBy(0, 1 * speed);
	}, 33);

});
