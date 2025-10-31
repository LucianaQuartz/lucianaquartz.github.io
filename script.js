function includeHTML() {
	var z, i, elmnt, file, xhttp;
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		file = elmnt.getAttribute("include-html");
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {elmnt.innerHTML = this.responseText;}
					if (this.status == 404) {elmnt.innerHTML = "Wild MissingNo. appeared!";}
					elmnt.removeAttribute("include-html");
					includeHTML();
				}
			}      
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
}

function buildPokedex(addLinks, externalMode, otherUniverse) {
	
	var dexLinks, dexSprites, dexTrackers, i;
	
	dexTrackers = document.getElementsByClassName("dex-tracker");
	slotHeaders = document.getElementsByClassName("slot-header");
	spriteCells = document.getElementsByClassName("sprite-cell");
	typeRows = document.getElementsByClassName("type-row");
	
	if (addLinks == true) {
		dexLinks = document.getElementsByClassName("dex-link");
		dexSprites = document.getElementsByClassName("dex-sprite");
	}
	
	for (i = 0; i < (dexTrackers.length); i++) {
		iString = i.toString();
		dexTrackers[i].id = iString;
		functionString = "toggleCaught('" + iString + "')"
		slotHeaders[i].setAttribute("onclick", functionString);
		spriteCells[i].setAttribute("onclick", functionString);
		typeRows[i].setAttribute("onclick", functionString);
		if (addLinks == true) {
			dexSprites[i].src = "Sprites/" + dexLinks[i].innerText + ".png";
		}
		if (addLinks == true) {
			if (externalMode == false) {
				//Originally developed for the HANDY910is model of Pokédex, this simple upgrade incorporates the functionality to handle multiple Pokémon forms, including gender differences.
				if (dexLinks[i].classList.contains("form")) {
					dexLinks[i].innerHTML = dexLinks[i].id;
				}
				dexLinks[i].href = "Pokédex/" + dexLinks[i].innerText + ".html";
				dexLinks[i].setAttribute("onclick", "event.stopPropagation()");
			} else {
				//Originally developed for the HANDY910is model of Pokédex, this simple upgrade incorporates the functionality to handle multiple Pokémon forms, including gender differences.
				if (dexLinks[i].classList.contains("form")) {
					dexLinks[i].innerHTML = dexLinks[i].id;
				}
				dexLinks[i].href = otherUniverse + dexLinks[i].innerText + ".html";
				dexLinks[i].setAttribute("onclick", "event.stopPropagation()");
			}
			
		}
	}
}

function toggleBar(id) {
	var bar = document.getElementById(id);
	if (bar.style.display === "none") {
		bar.style.display = "block";
		bar.style.background = "url('/Resources/MobileButtonActive.png') no-repeat";
	}
	else {
		bar.style.display = "none";
		bar.style.background = "url('/Resources/MobileButton.png') no-repeat";
	}
}

function stylizeTypes() {
	var typeP, i;
	typeP = document.getElementsByClassName("type");
	for (i = 0; i < (typeP.length); i++) {
		switch (typeP[i].innerText) {
			case "Unknown":
				typeP[i].className = "type nkdf";
				break;
			case "???":
				typeP[i].className = "type qqq";
				break;
			default:
				typeP[i].className = "type " + typeP[i].innerText;
		}
	}
}

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
		}
	}
	return "";
}

function toggleCaught(pid) {
	//Inspired by Lyra's website, this lets you track which Pokémon you have caught in each ROM hack/fan game
	
	var element = document.getElementById(pid);
	
	if (element.classList.contains("caught")) {
		setCookie(pid, "caught", -1);
		setCookie(pid, "seen", 400);
		element.classList.toggle("caught");
		element.classList.toggle("seen");
	} else if (element.classList.contains("seen")) {
		setCookie(pid, "seen", -1);
		element.classList.toggle("seen");
	} else {
		setCookie(pid, "caught", 400);
		element.classList.toggle("caught");
	}
}

function loadSave() {
	var slot, i;
	slot = document.getElementsByClassName("dex-tracker");
	for (i = 0; i < (slot.length); i++) {
		if (getCookie(i.toString()) == "caught") {
			slot[i].classList.toggle("caught");
			setCookie(i.toString(), "caught", 400);
		} else if (getCookie(i.toString()) == "seen") {
			slot[i].classList.toggle("seen");
			setCookie(i.toString(), "seen", 400);
		}
	}
}

function loadSavedForms() {
	var slot, i;
	slot = document.getElementsByClassName("dex-tracker");
	for (i = 0; i < (slot.length); i++) {
		if (getCookie(slot[i].id) == "caught") {
			slot[i].classList.toggle("caught");
			setCookie(slot[i].id, "caught", 400);
		}
	}
}

function waveCollapse() {
	var fallerThoughts = Array(
		"Hahaha, I guess not. That white hand on your shoulder... I'm just imagining it.",
		"By the way, who is that standing behind you?",
		"No, you're not the one...",
		"I'm going to go for help. Wait in the usual place.",
		"I wonder what he meant. Ice cream, maybe?",
		"Where... Where am I?",
		"Hello, starlight...",
		"Shhh! Please walk quietly in the hallway.",
		"You've met with a terrible fate, haven't you?",
		"I think you are lost. It’s got to be around here somewhere...",
		"Have you ever thought of a world where everything is exactly the same... except you don't exist?",
		"Please don't think about this anymore.",
		"Yes, your friend... The one behind you, with the creepy smile.",
		"I just wasn't ready for the responsibility.",
		"Can anyone hear me? Help...",
		"It's dark... It's so dark here...",
		"It could not be.",
		"The pain itself is reason why.",
		"It's funny because we're all living in a simulation and free will is a lie.",
		"Who are you running from?",
		"You know how I never like letting people see my unfinished work.",
		"Seven years of computer science for this, huh?",
		"Waiting for something to happen?",
		"Welcome to the zone between zones.",
		"Warning: Nonstandard Spacetime",
		"If you're not careful and noclip out of reality in the wrong areas, you'll end up in this error page.",
		"This is the dimension of imagination."
	)
	var fun = Math.floor(Math.random()*fallerThoughts.length);
	echo = fallerThoughts[fun];
	abyss = document.getElementsByClassName("abyss");
	abyss[0].innerText = echo;
	pid = Math.floor(Math.random() * 66) + 1
	if (pid == 66) {
		G = document.getElementsByClassName("G");
		G[0].src = "/Resources/Giratina-Origin-Shiny.png";
	}
}