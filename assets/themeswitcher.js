//from  http://www.w3schools.com/js/js_cookies.asp

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

/////////----END---- cookie.js -----///////

function themeswitcher(autorun) {
	var theme = getCookie("theme");
	var default_t = getdefaulttheme();
	setthemebar();
	
	if (theme.indexOf(default_t) == -1)
		settheme(theme);
	return;
}

function settheme(t) {
	var cookielife = 14;
	var stylesheet = null;
	var items = document.getElementsByTagName('link');
	for (i=0;i<items.length;i++) {
		if (items[i].href.contains("/themes")) {
			stylesheet = items[i];
			break;
		}
	}
	var themes = themelist();
	if (themes.indexOf(t) > -1) {
		stylesheet.href = 'http://strapdownjs.com/v/0.2/themes/'+t+'.min.css';
		old_t = getcurrenttheme();
		setthemebar_unselected(old_t);
		setCookie("theme",t,cookielife);
		setthemebar_selected(t);
		return 1;
	} else
		return 0;
}

function themelist() {
	var t = ["amelia","cerulean","cyborg","journal","readable","simplex","slate","spacelab","spruce","superhero","united"];
	return t;
}

function setthemebar() {
	var ts = themelist();
	var tc = document.getElementById('settheme').parentNode.parentNode;
	var r = '';
	for (n=0;n<ts.length;n++) {
		r = r + "<li><a onclick=\"settheme('"+ts[n]+"')\">"+ts[n]+"</a></li>";
	}
	tc.innerHTML = r;
	return (r.length > 0);
}

function setthemebar_selected(t) {
	elems = document.getElementsByTagName('a');
	for (i = 0; i < elems.length; i++) {
		z = elems[i].innerHTML;
		if (z.indexOf(t) >= 0) {
			elems[i].style.backgroundColor = "black";
			elems[i].style.color = "white";
			elems[i].style.fontWeight = 600;
			return 1;
		}
	}
	return 0;
}

function setthemebar_unselected(t) {
	elems = document.getElementsByTagName('a');
	for (i = 0; i < elems.length; i++) {
		z = elems[i].innerHTML;
		if (z.indexOf(t) >= 0) {
			elems[i].style.backgroundColor = null;
			elems[i].style.color = null;
			elems[i].style.fontWeight = null;
			return 1;
		}
	}
	return 0;
}

function getcurrenttheme() {
	var t = getCookie("theme");
	var ts = themelist();
	if (ts.indexOf(t) > -1) {
		return t;
	} else {
		return getdefaulttheme();
	}
}

function getdefaulttheme() {
	return "simplex";
}

;(function(){
	themeswitcher(true);
})();