// --------------------------
// Include HTML for components
// --------------------------
function includeHTML(callback) {
    const elements = document.querySelectorAll("[include-html]");
    if (elements.length === 0) {
        if (callback) callback();
        return;
    }

    const elmnt = elements[0];
    const file = elmnt.getAttribute("include-html");
    if (!file) return;

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                elmnt.innerHTML = this.responseText;
            } else if (this.status === 404) {
                elmnt.innerHTML = "Wild MissingNo. appeared!";
            }
            elmnt.removeAttribute("include-html");
            // Recursively call until all includes are loaded
            includeHTML(callback);
        }
    };
    xhttp.open("GET", file, true);
    xhttp.send();
}

// --------------------------
// Stylize Pokémon types
// --------------------------
function stylizeTypes() {
    document.querySelectorAll(".type").forEach(el => {
        const t = el.innerText;
        switch (t) {
            case "Unknown":
                el.className = "type nkdf";
                break;
            case "???":
                el.className = "type qqq";
                break;
            default:
                el.className = "type " + t;
        }
    });
}

// --------------------------
// Cookie helpers
// --------------------------
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    document.cookie = `${cname}=${cvalue};expires=${d.toUTCString()};path=/`;
}

function getCookie(cname) {
    const name = cname + "=";
    const decoded = decodeURIComponent(document.cookie);
    const ca = decoded.split(";");
    for (let c of ca) {
        c = c.trim();
        if (c.indexOf(name) === 0) return c.substring(name.length);
    }
    return "";
}

// --------------------------
// Toggle caught/seen on click
// --------------------------
function toggleCaught(id) {
    const el = document.getElementById(id);
    if (!el) return;

    if (el.classList.contains("caught")) {
        setCookie(id, "caught", -1);
        setCookie(id, "seen", 400);
        el.classList.replace("caught", "seen");
    } else if (el.classList.contains("seen")) {
        setCookie(id, "seen", -1);
        el.classList.remove("seen");
    } else {
        setCookie(id, "caught", 400);
        el.classList.add("caught");
    }
}

// --------------------------
// Load saved caught/seen status
// --------------------------
function loadSave() {
    document.querySelectorAll(".tracker-outline").forEach(el => {
        const status = getCookie(el.id);
        if (status === "caught") el.classList.add("caught");
        else if (status === "seen") el.classList.add("seen");
    });
}

// --------------------------
// Attach click events to all trackers
// --------------------------
function attachTrackerClicks() {
    document.querySelectorAll(".tracker-outline").forEach(el => {
        // Toggle tracker on click
        el.addEventListener("click", () => toggleCaught(el.id));

        // Prevent links inside the tracker from toggling state
        const link = el.querySelector("a.dex-link");
        if (link) {
            link.addEventListener("click", (e) => {
                e.stopPropagation(); // stops the tracker click from firing
            });
        }
    });
}

// --------------------------
// Initialize everything
// --------------------------
function initPokedex(universe) {
    includeHTML(() => {
        stylizeTypes();
        loadSave();
        attachTrackerClicks();
    });
}

// --------------------------
// Initialize everything
// --------------------------
function waveCollapse() {
	var fallerThoughts = Array(
		"Hahaha, I guess not. That white hand on your shoulder... I'm just imagining it.",
		"By the way, who is that standing behind you?",
		"No, you're not the one...",
		"You guys need some imagination.",
		"But then again, life is a dream.",
		"Hello, starlight...",
		"Look at you go, I just adore you.",
		"Shhh! Please walk quietly in the hallway!",
		"I am Error.",
		"I think you are lost. It’s got to be around here somewhere...",
		"Have you ever thought of a world where everything is exactly the same... Except this page exists?",
		"I just wasn't ready for the responsibility.",
		"Please don't think about this anymore.",
		"The pain itself is reason why.",
		"Who are you running from?",
		"You know how I never like letting people see my unfinished work.",
		"Welcome to the zone between zones.",
		"This is the dimension of imagination.",
		"Don't forget... Especially, the don't."
	)
	var fun = Math.floor(Math.random()*fallerThoughts.length);
	echo = fallerThoughts[fun];
	abyss = document.getElementsByClassName("abyss");
	abyss[0].innerText = echo;
	pid = Math.floor(Math.random() * 256)
	if (pid == 66) {
		G = document.getElementsByClassName("G");
		G[0].src = "/resources/lost-giratina-shiny.png";
	}
}