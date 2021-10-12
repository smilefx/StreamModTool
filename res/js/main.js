var changeInterval = 6000;
var latestRelease = 1634076858759;
var releaseNumber = "1.0.0";

var texts = ["moderation", "streaming", "watching", "chatting"];
var currentText = 0;

var currentPage = "main";
var pages = ["main", "features", "about", "legal"]
var titles = ["Home", "Features", "FAQ", "Legal"]

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

window.onload = () => {
    var hash = window.location.hash.toLowerCase().replace("#", "");
    setFeatures();

    setInterval(() => {
        if (currentPage == "main") {
            currentText++;
            if (currentText >= texts.length) currentText = 0;
            getEle("panel-right-text").innerHTML = `A whole new <h1 class="panel-anim-1">${texts[currentText]}</h1> <h1 class="panel-anim-2">experience</h1>.`;
        }
    }, changeInterval);

    if (currentPage == "main") {
        getEle("panel-right-version").innerHTML = `v${releaseNumber} - ${getTimeDiff(latestRelease)}`;
    }

    if (hash == "") {
        switchPage("main");
    } else {
        switchPage(hash);
    }

    if(isMobile) {
        getEle("download-button").style.pointerEvents = "none";
        getEle("download-button").style.opacity = "0.3";
        getEle("download-button").innerHTML = `<i class="material-icons">smartphone</i>
                        <h1>Not supported</h1>`;
    }
}

function openDownload() {
    if(!isMobile) {
        openDownloadPopup();
        const link = document.createElement("a");
        link.href = `https://github.com/smilefx/StreamModTool/releases/latest/download/Stream-Moderation-Tool-Setup-${releaseNumber}.zip`;
        link.download = `Stream-Moderation-Tool-Setup-${releaseNumber}.zip`;
        link.click();
        // window.open(`https://github.com/smilefx/StreamModTool/releases/latest/download/Stream-Moderation-Tool-Setup-${releaseNumber}.zip`, '_blank');
    }
}

function openDownloadPopup() {
    document.body.style.overflow = "hidden";
    getEle("download-popup").style.display = "flex";
}

function closeDownloadPopup() {
    document.body.style.overflow = "auto";
    getEle("download-popup").style.display = "none";
}

window.addEventListener('hashchange', function () {
    var hash = window.location.hash.toLowerCase().replace("#", "");
    if (hash == "") {
        switchPage("main");
    } else {
        switchPage(hash);
    }
}, false);

function switchPage(hash) {
    if (hash == "main" && window.location.href.indexOf("#") != -1) {
        window.location = window.location.href.split('#')[0];
    } else if(hash == "download") {
        window.location.hash = 'download';
        pages.forEach(ele => {
            getEle("section-" + ele).style.display = "none";
        })
        getEle("section-main").style.display = "block";

        
        getEle("menu-entry-main").setAttribute("state", "inactive");
        getEle("menu-entry-features").setAttribute("state", "inactive");
        getEle("menu-entry-about").setAttribute("state", "inactive");

        getEle("mobile-entry-main").setAttribute("state", "inactive");
        getEle("mobile-entry-features").setAttribute("state", "inactive");
        getEle("mobile-entry-about").setAttribute("state", "inactive");

        getEle("menu-entry-main").setAttribute("state", "active");
        getEle("mobile-entry-main").setAttribute("state", "active");
        currentPage = "main";
        closeMobileMenu();
        scrollDownload();
    } else {
        if (pages.includes(hash)) {
            pages.forEach(ele => {
                getEle("section-" + ele).style.display = "none";
            })
            getEle("section-" + hash).style.display = "block";

            
            getEle("menu-entry-main").setAttribute("state", "inactive");
            getEle("menu-entry-features").setAttribute("state", "inactive");
            getEle("menu-entry-about").setAttribute("state", "inactive");

            getEle("mobile-entry-main").setAttribute("state", "inactive");
            getEle("mobile-entry-features").setAttribute("state", "inactive");
            getEle("mobile-entry-about").setAttribute("state", "inactive");

            if(hash == "main" || hash == "features" || hash == "about") {
                getEle("menu-entry-" + hash).setAttribute("state", "active");
                getEle("mobile-entry-" + hash).setAttribute("state", "active");
            }
            window.scrollTo(0, 0);
            closeMobileMenu();
            document.title = titles[pages.indexOf(hash)] + " - Stream Moderation Tool";
            currentPage = hash;
        } else {
            window.location = window.location.href.split('#')[0];
            switchPage("main");
        }
    }
}

function openMobileMenu() {
    getEle("mobile-header").setAttribute("state", "opened");
    getEle("mobile-icon").innerHTML = "close";
    getEle("mobile-icon").setAttribute("onclick", "closeMobileMenu();");
}

function closeMobileMenu() {
    getEle("mobile-header").setAttribute("state", "closed");
    getEle("mobile-icon").innerHTML = "menu";
    getEle("mobile-icon").setAttribute("onclick", "openMobileMenu();");
}


function scrollDownload() {
    if(currentPage != "main") {
        switchPage("download");
    }
    getEle("panel-download").scrollIntoView();
}

function setFeatures() {
    var HTML = ``;
    Object.keys(features).forEach(el => {
        var e = features[el];
        var HTML3 = `<div class="features-grid"><div class="features-header">
                <div class="main-header">
                    <img src="./res/img/small_${el.toLowerCase()}.svg" alt="">
                    <h1 class="main-header-text">${el}</h1>
                </div>
            </div>`;
        e.forEach((ele, i) => {
            HTML3 += `
                <div class="features-entry">
                    <h1 class="features-entry-header">${ele.title}</h1>
                    <p class="features-entry-desc">${ele.desc}</p>
                    <div class="features-entry-right" style="background-image: url('./res/img/features/${el.toLowerCase()}_${i}@2x.png');">
                        <div class="features-entry-grad"></div>
                    </div>
                </div>
            `;
        })
        HTML3 += `</div>`;
        HTML += HTML3;
    })
    getEle("features-showcase").innerHTML = HTML;
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


var features = {
    "Streams": [
        {
            "title": "Up to 3 concurrent streams",
            "desc": "Watch up to three streams at the same time or switch to watch only a single one in theater mode."
        },
        {
            "title": "Easily switchable",
            "desc": "Switch your current stream by choosing from your following list or entering channel names directly."
        },
        {
            "title": "Convenient stream selector",
            "desc": "Change or add new streams with one click using the unique layout position selector."
        },
        {
            "title": "Squad stream integration",
            "desc": "Automatically import all active squad members' streams into the multi stream layout."
        },
        {
            "title": "Integrated clip viewer",
            "desc": "Open clips directly in the tool and watch them via the integrated clip viewer for a fluent experience."
        },
        {
            "title": "Designated streamer mode",
            "desc": "Use the tool while streaming with all important features except stream watching."
        },
        {
            "title": "Switch single and multi stream",
            "desc": "Disable mutli stream for a better single stream watching and modding experience."
        }
    ],
    "Chats": [
        {
            "title": "Multiple simultaneous chats",
            "desc": "Open up to five simultaneous chats and switch between the flawlessly without any delay."
        },
        {
            "title": "External link highlights",
            "desc": "Highlight links in chat and warn for external link redirects."
        },
        {
            "title": "Fullscreen video chat overlay",
            "desc": "Enable a chat overlay above the fullscreen stream for an ultimate viewing and chatting experience."
        },
        {
            "title": "Twitch event alerts in chat",
            "desc": "Conveniently list all Twitch events in chat and in a designated section to keep for later."
        },
        {
            "title": "BTTV, FFZ and 7TV emote integration",
            "desc": "Use animated and custom emotes with a direct BTTV, FFZ and 7TV integration in chat."
        },
        {
            "title": "Detailed chatter list",
            "desc": "Overview all chatters in a simple list including role differentiation and bot detection."
        },
        {
            "title": "Automatic chatbot detection",
            "desc": "Common chatbots will directly be detected and highlighted in chat."
        },
        {
            "title": "Send and receive whispers",
            "desc": "Use all Twitch whisper features in a simpler and bigger whisper section."
        }
    ],
    "Moderation": [
        {
            "title": "Observe moderation actions",
            "desc": "Keep track of other moderators chat actions including timeouts, bans and chat settings."
        },
        {
            "title": "Chat moderation settings",
            "desc": "Enable or adjust chat settings with one click."
        },
        {
            "title": "Purge, timeout and ban users",
            "desc": "Rightclick a user to get access to quick actions including purge, timeout and ban."
        },
        {
            "title": "Delete single chat messages",
            "desc": "Quickly delete messages while keeping already deleted messages in chat."
        },
        {
            "title": "All messages of single users",
            "desc": "List all recently written messages of a single user."
        },
        {
            "title": "Search for specific chat messages",
            "desc": "Filter messages by searching for keywords or usernames."
        },
        {
            "title": "Profanity filter and highlights",
            "desc": "Enable the profanity filter to highlight bad messages and swear words in chat."
        }
    ],
    "Highlighting": [
        {
            "title": "Adjustable role highlights",
            "desc": "Select which different roles will appear highlighted in chat."
        },
        {
            "title": "Word highlighting with multiple colors",
            "desc": "Add custom words to highlight with different colors by creating tags and assigning them."
        },
        {
            "title": "Command highlighting",
            "desc": "Enable command highlights to easily detect and answer user written commands and questions."
        },
        {
            "title": "User tag highlights",
            "desc": "Highlight user tags and scroll to users latest messages."
        },
        {
            "title": "Only show highlighted messages",
            "desc": "Filter all messages and only show highlighted ones for a better overview in large communities."
        }
    ],
    "Hotkeys": [
        {
            "title": "Fully adjustable chat hotkeys",
            "desc": "Customize your own hotkey sets to moderate chat with only a few clicks."
        },
        {
            "title": "Editable colors and icons",
            "desc": "Set your own colors and choose from a variety of icons to personalize and quickly remember hotkeys."
        },
        {
            "title": "Infinite profile pages",
            "desc": "Create infinite profile pages to switch between multiple channels or a long list of commands."
        },
        {
            "title": "Moderation with one click",
            "desc": "Always be prepared to answer questions, execute commands or spam emotes in less than a second."
        },
        {
            "title": "Import and export profiles to share",
            "desc": "Export and share hotkey sets with your moderator colleagues or predefine sets as a streamer."
        }
    ],
    "Stats": [
        {
            "title": "Detailed stream stats",
            "desc": "Get a detailed overview of the most important stream statistics."
        },
        {
            "title": "Chat interactions per minute",
            "desc": "Monitor chat interactions like subscriptions and chat messages per minute."
        },
        {
            "title": "Message distribution per role",
            "desc": "Quickly compare the message distribution between different roles in chat."
        },
        {
            "title": "Monitor moderator activity",
            "desc": "Measure moderator chatting activity and message count."
        },
        {
            "title": "Top emotes and commands",
            "desc": "Get an insight into the most popular emotes and often used chat commands."
        }
    ],
    "Commands": [
        {
            "title": "View stream information",
            "desc": "Get a quick overview of the current game, stream title and viewer, aswell as the chatter count."
        },
        {
            "title": "Quickly change title and game",
            "desc": "Change the stream title and game within the tool featuring a huge list of games."
        },
        {
            "title": "List all available commands",
            "desc": "See all available chatbot commands for the selected channel and featured chatbots."
        },
        {
            "title": "Add, edit and remove commands",
            "desc": "Quickly add, edit and remove chatbot commands using a simple interface."
        },
        {
            "title": "Check chatbot availability",
            "desc": "Detect all online chatbots for a specific channel."
        }
    ],
    "Notifications": [
        {
            "title": "Customizable notifications",
            "desc": "Enable or disable certain desktop notifications like stream alerts and received whisper messages."
        },
        {
            "title": "Following stream going live",
            "desc": "Get alerted when your favorite streamers go live using an always up-to-date stream list to never be late."
        },
        {
            "title": "Following stream changing game",
            "desc": "Receive an alert for your following streams switching their current game."
        },
        {
            "title": "Receiving Twitch whispers",
            "desc": "Be notified for each whisper message you receive."
        }
    ],
    "Miscellaneous": [
        {
            "title": "Twitch login integration",
            "desc": "Conveniently login with Twitch to make use of all functionalities."
        },
        {
            "title": "Overview followed streams",
            "desc": "Find your following streams and important stream information always up-to-date."
        },
        {
            "title": "Twitch status on loading",
            "desc": "Stay informed about Twitch status with a possible warning indicator on loading."
        },
        {
            "title": "Vertical display support",
            "desc": "Use the tool on vertical screens with the specially designed vertical layout for an even better overview."
        }
    ]
}