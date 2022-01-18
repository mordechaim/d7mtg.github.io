var appicons = document.getElementsByClassName("appicon");
function myFunction() {
    var useragent = navigator.userAgent;
    if (useragent.indexOf("iPhone") != -1 || useragent.indexOf("iPad") != -1 || useragent.indexOf("iPod") != -1) {
        ios();
    } else if (useragent.indexOf("Macintosh") != -1) {
        macos();
    } else if (useragent.indexOf("Android") != -1) {
        android();
    }
    //on windows remove apple maps and imessage
    else if (useragent.indexOf("Windows") != -1) {
        windows();
    } else {
        //if the user is using a browser that is not ios, mac, or android, then we place the ios icons.
        ios();
    }
    //wait until all icons are loaded before we show the .container
    var interval = setInterval(function () {
        if (document.readyState === 'complete') {
            document.getElementsByClassName("container")[0].style.display = "block";
            clearInterval(interval);
        }
    }, 10);
}
window.onload = myFunction;
function macos() {
    document.getElementById("macos").classList.add("selectedOS");
    //all icons have the class appicon, so we can loop through them and change the path
    for (var i = 0; i < appicons.length; i++) {
        appicons[i].src = "macos/" + appicons[i].id + ".png";
        //remove other OS classes
        appicons[i].classList.add("macos");
    }
}
function windows() {
    document.getElementById("windows").classList.add("selectedOS");
    document.getElementById("imessage").style.display = "none";
    document.getElementById("applemaps").style.display = "none";
    for (var i = 0; i < appicons.length; i++) {
        appicons[i].src = "windows/" + appicons[i].id + ".png";
        //remove other OS classes
        appicons[i].classList.add("windows");
    }
}
function ios() {
    document.getElementById("ios").classList.add("selectedOS");
    for (var i = 0; i < appicons.length; i++) {
        appicons[i].src = "ios/" + appicons[i].id + ".png";
        //remove other OS classes
        appicons[i].classList.add("ios");
    }
}
function android() {
    document.getElementById("android").classList.add("selectedOS");
    document.getElementById("imessage").style.display = "none";
    document.getElementById("applemaps").style.display = "none";
    for (var i = 0; i < appicons.length; i++) {
        appicons[i].src = "android/" + appicons[i].id + ".png";
        //remove other OS classes
        appicons[i].classList.add("android");
    }
}
//settings
var settingswrapper = document.getElementsByClassName("settingswrapper")[0];

function opensettings() {
    var settingsOSText = document.getElementById("settingsOSText");
    //get the  OS
    var userAgent = window.navigator.userAgent;
    var OSName = "an unknown OS";
    if (userAgent.indexOf("Win") != -1) OSName = "Windows";
    if (userAgent.indexOf("Mac") != -1) OSName = "macOS";
    if (userAgent.indexOf("Linux") != -1) OSName = "Linux";
    if (userAgent.indexOf("Android") != -1) OSName = "Android";
    if (userAgent.indexOf("iPhone" || "iPad" || "iPod") != -1) OSName = "iOS";
    //set the OS name
    settingsOSText.innerHTML = "It looks like you're running " + OSName + ".";
    //show the settings
    settingswrapper.style.display = "block";
}
function closesettings() {
    settingswrapper.style.display = "none";
}

//change the OS
var OSchange = document.getElementsByClassName("OSchange");
function changeos() {
    //remove all os classes from all icons
    for (var i = 0; i < appicons.length; i++) {
        appicons[i].classList.remove("macos");
        appicons[i].classList.remove("windows");
        appicons[i].classList.remove("ios");
        appicons[i].classList.remove("android");
    }
    //as some of OS remove some icons, we need to loop through the icons again to make sure all are display block
    document.getElementById("imessage").style.display = "inline-block";
    document.getElementById("applemaps").style.display = "inline-block";
    for (var i = 0; i < OSchange.length; i++) {
        OSchange[i].classList.remove("selectedOS");
    }
    //check the os that was clicked, or it's child/parent
    var clicked = event.target;
    if (clicked.classList.contains("OSchange")) {
        clicked.classList.add("selectedOS");
    } else {
        clicked = clicked.parentElement;
        clicked.classList.add("selectedOS");
    }
    //run the function that changes the OS
    var selectedOS = document.getElementsByClassName("selectedOS")[0];
    var selectedOSid = selectedOS.id;
    if (selectedOSid == "macos") {
        macos();
    } else if (selectedOSid == "windows") {
        windows();
    } else if (selectedOSid == "ios") {
        ios();
    } else if (selectedOSid == "android") {
        android();
    }
}


    

    //settings div - 400px wide, starts out centered
    //settingswrapper is 100% high and wide
    //lets make the settingsdiv draggable within the settingswrapper div
    
    

    let settingsDiv = document.getElementsByClassName("settingsDiv")[0];
    dragElement(settingsDiv);
    function dragElement(elmnt) {

        //only run on scrrens larger than 600px
        if (window.innerWidth > 701) {

        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementsByClassName("settingsDiv")[0]) {
            //if the settings div is present, then we can drag it
            elmnt.onmousedown = dragMouseDown;
        }
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

          

          }
        
          function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
          }
        }
    }
    //close settings when clicking on settingswrapper 
    //but not on settingsDiv or its children
    var settingswrapper = document.getElementsByClassName("settingswrapper")[0];
    settingswrapper.onclick = function(e) {
        if (e.target == settingswrapper && !e.target.classList.contains("settingsDiv")) {
            closesettings();
        }
    }

