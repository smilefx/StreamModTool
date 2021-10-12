var changeInterval = 6000;
var latestRelease = 1633535994909;
var releaseNumber = "1.0.0"

var texts = ["moderation", "streaming", "watching", "chatting"];
var currentText = 0;

var currentPage = "main";
var pages = ["main", "features", "about", "legal"]

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