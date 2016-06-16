window.onload = function() {
	console.log("loaded");

	var initTime = new Date().getTime();
		var currTime = initTime;

		var millisToColors = [ {
			ms : 1000,
			color : "#ffa500"
		}, {
			ms : 2000,
			color : "#777777"
		} ];
		var heartRates = [
		{
			title: "heart100",
			ms: 600,
			accum: 0
		}, {
			title: "heart110",
			ms: 545,
			accum: 0
		}, {
			title: "heart120",
			ms: 500,
			accum: 0
		}, {
			title: "heart130",
			ms: 461,
			accum: 0
		}, {
			title: "heart140",
			ms: 428,
			accum: 0
		}, {
			title: "heart150",
			ms: 400,
			accum: 0
		}
		];

		//tick
		function showCurrTime() {
			console.log('tick');
			var now = new Date();
			var initTimeDiff = now.getTime() - initTime;
			var initTimeDiffRest = initTimeDiff % getMaxTime(millisToColors);
			
			
			var timeDiff = now - currTime;
			currTime = now;

			for (var i = heartRates.length - 1; i >= 0; i--) {
				var hr = heartRates[i];
				hr.accum += timeDiff;
				if (hr.accum >= hr.ms) {
				var rest = hr.accum % hr.ms;
					hr.accum = rest;
					document.getElementById(hr.title).style.opacity = "1";				
				} else {
					document.getElementById(hr.title).style.opacity -= 0.07;
				}
			}

			function formatSeconds(diff) {
				var ss = diff / 1000;
				var ms = (diff % 1000) / 100;
				return Math.floor(ss) + "." + Math.floor(ms);
			}

			function getStyle(diff, msToColors) {
				var accum = 0;
				for (var i = 0; i < msToColors.length; i++) {
					var msToColror = msToColors[i];
					accum += msToColror.ms;
					if (diff <= accum)
						return msToColror.color;
				}
				throw "Can't get style for diff = " + diff
						+ ". millisToStyles = " + millisToStyles;
			}

			function getMaxTime(msToColors) {
				var result = 0;
				for (var i = 0; i < msToColors.length; i++) {
					var msToColror = msToColors[i];
					result += msToColror.ms;
				}
				return result;
			}

			
			document.getElementById('time').innerText = formatSeconds(initTimeDiffRest);
			document.body.style.backgroundColor = getStyle(initTimeDiffRest, millisToColors);
		}

		setInterval(showCurrTime, 33);
}

