var changeInterval = 6000;
var latestRelease = 1633535994909;
var releaseNumber = "1.0.0"

var texts = ["moderation", "streaming", "watching", "chatting"];
var currentText = 0;

window.onload = () => {
    setInterval(() => {
        currentText++;
        if(currentText >= texts.length) currentText = 0;
        getEle("panel-right-text").innerHTML = `A whole new <h1 class="panel-anim-1">${texts[currentText]}</h1> <h1 class="panel-anim-2">experience</h1>.`;
    }, changeInterval);
    getEle("panel-right-version").innerHTML = `v${releaseNumber} - ${getTimeDiff(latestRelease)}`;
}

function getTimeDiff(date) {
    var now = Date.now();
    var vid = new Date(date).getTime();
    var diff = now - vid;

    var upload;
    var info;
    if (diff < 60000) {
        upload = Date.dateDiff("s", vid, now);
        info = "second";
    } else if (diff >= 60000 && diff < 3600000) {
        upload = Date.dateDiff("m", vid, now);
        info = "minute";
    } else if (diff >= 3600000 && diff < 86400000) {
        upload = Date.dateDiff("h", vid, now);
        info = "hour";
    } else if (diff >= 86400000 && diff < 604800000) {
        upload = Date.dateDiff("d", vid, now);
        info = "day";
    } else if (diff >= 604800000 && diff < 2628000000) {
        upload = Date.dateDiff("w", vid, now);
        info = "week";
    } else if (diff >= 2628000000 && diff < 31536000000) {
        upload = Date.dateDiff("n", vid, now);
        info = "month";
    } else if (diff >= 31536000000) {
        upload = Date.dateDiff("y", vid, now);
        info = "year";
    }

    var d = `${upload} ${info}${upload > 1 ? "s" : ""} ago`;
    return d;
}

Date.dateDiff = function (datepart, fromdate, todate) {
    datepart = datepart.toLowerCase();
    var diff = todate - fromdate;
    var divideBy = {
        y: 31536000000,
        n: 2628000000,
        w: 604800000,
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000
    };

    return Math.floor(diff / divideBy[datepart]);
}

function getEle(id) {
    return document.getElementById(id);
}