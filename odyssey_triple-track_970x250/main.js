$(document).ready(function() {
	$("#ad").css({ width: adWidth, height: adHeight, "background-color": bgColor });

	function startAd() {
		$("#content").removeClass("hide");
		// animations here
		let animtaionDone = false;
		var t1 = new TimelineLite();
		t1.add("start", 0)
			.add("phase2", 1.8)
			.from(".putter", 0.5, { opacity: 0 })
			.from(".putter", 1.5, { rotation: 20, transformOrigin: "700px 130px", ease: Back.easeOut.config(4) }, "start")
			.fromTo(".lines", 1, { clip: "rect(0px,970px,250px,970px)" }, { clip: "rect(0px,970px,250px,0px)", ease: Power4.easeOut })
			.from(".logo2", 0.5, { opacity: 0 }, "phase2")
			.from(".cta", 0.5, { opacity: 0, delay: 0.5 }, "phase2")
			.from(".t1", 2, { opacity: 0, y: 5 }, "phase2")
			// .to(".putter", 1.5, { x: -50 })
			// .to(".putter", 2, { x: 0 })
			.add(function() {
				animtaionDone = true;
				console.log("Woohoo!");
			});
		let derection = true;
		$("#ad").mouseover(function() {
			if (animtaionDone) {
				var pushDown = new TimelineLite();

				TweenLite.to(".lines", 0.2, { clip: "rect(0px,970px,250px,970px)", ease: Power4.easeOut });
				TweenLite.to(".putter", 0.5, { rotation: -10, transformOrigin: "700px 130px" }, "start");
			}
		});
		$("#ad").mouseout(function() {
			if (animtaionDone) {
				var pushUp = new TimelineLite();
				TweenLite.to(".putter", 1, { rotation: 0, transformOrigin: "700px 130px", ease: Power2.easeOut });
				TweenLite.to(".lines", 1.5, { clip: "rect(0px,970px,250px,0px)", ease: Power2.easeIn });
			}
		});
	}

	var site = clickTag;
	if (PlatForm == "MM") {
		$("#Studio").remove();

		bgExit = document.getElementById("ad");

		bgExitHandler = function(e) {
			//Call Exits
			Enabler.exit("exit");
		};
		bgExit.addEventListener("click", bgExitHandler, false);
		startAd();
		$(".box").click(function() {
			// window.open(clickTag, "_blank");
			javascript: window.open(window.clickTag);
		});
	} else if ("DC") {
		num = clickTag.length;
		clickTag = clickTag.slice(26, num);

		if (!Enabler.isInitialized()) {
			Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitialized);
		} else {
			enablerInitialized();
		}
		function enablerInitialized() {
			// Enabler initialized.
			// In App ads are rendered offscreen so animation should wait for
			// the visible event. These are simulated with delays in the local
			// environment.
			if (!Enabler.isVisible()) {
				Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, adVisible);
			} else {
				adVisible();
			}
		}
		function adVisible() {
			// Ad visible, start ad/animation.
			startAd();
			$(".box").click(function() {
				Enabler.exit("Exit", clickTag);
			});
		}
	}
});
