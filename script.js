// --------------------------
// Include HTML for components
// --------------------------
function includeHTML() {
    let elements = document.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++) {
        let elmnt = elements[i];
        let file = elmnt.getAttribute("include-html");
        if (file) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Wild MissingNo. appeared!"; }
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

// --------------------------
// Stylize Pokémon types
// --------------------------
function stylizeTypes() {
    let typeElements = document.getElementsByClassName("type");
    for (let i = 0; i < typeElements.length; i++) {
        let t = typeElements[i].innerText;
        switch (t) {
            case "Unknown":
                typeElements[i].className = "type nkdf";
                break;
            case "???":
                typeElements[i].className = "type qqq";
                break;
            default:
                typeElements[i].className = "type " + t;
        }
    }
}

// --------------------------
// Cookie helpers
// --------------------------
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    document.cookie = cname + "=" + cvalue + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decoded = decodeURIComponent(document.cookie);
    let ca = decoded.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

// --------------------------
// Toggle caught/seen on click
// --------------------------
function toggleCaught(id) {
    let el = document.getElementById(id);
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
    let trackers = document.getElementsByClassName("tracker-outline");
    for (let i = 0; i < trackers.length; i++) {
        let id = trackers[i].id;
        let status = getCookie(id);
        if (status === "caught") {
            trackers[i].classList.add("caught");
        } else if (status === "seen") {
            trackers[i].classList.add("seen");
        }
    }
}

// --------------------------
// Attach click events to all trackers
// --------------------------
function attachTrackerClicks() {
    const trackers = document.getElementsByClassName("tracker-outline");
    for (let i = 0; i < trackers.length; i++) {
        let id = trackers[i].id; // each tracker has a unique ID from the HTML
        trackers[i].addEventListener("click", () => toggleCaught(id));
    }
}