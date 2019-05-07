function downloadVideo() {
    console.log("Download this video");
    var dl = document.getElementById("videoDownloadDropDown");
    
    if(dl.className.indexOf("shown") > -1) {
        dl.className = dl.className.replace("shown", "");
    }
    else {
        dl.className += "shown";
    }
}

function downloadURI(event) {
    event.preventDefault();
    event.stopPropagation();

    var url = event.currentTarget.getAttribute("href");
    var name = document.getElementsByTagName("title")[0].innerText;
    var datatype = event.currentTarget.getAttribute("data-type");
    var data = {url: url, name: name, sender: "YTDL", type: datatype};

    window.postMessage(data, "*");

    var dl = document.getElementById("videoDownloadDropDown");
    
    if(dl.className.indexOf("shown") > -1) {
        dl.className = dl.className.replace("shown", "");
    }
    else {
        dl.className += "shown";
    }
    
    return false;
}

window.onload = function() {
    var videoURLs = window.ytplayer.config.args.url_encoded_fmt_stream_map.split(",").map(function(item) {
        return item.split("&").reduce(function(pre, cur) {
            // console.log(pre,cur);
            cur = cur.split("=");

            return Object.assign(pre, {[cur[0]]: decodeURIComponent(cur[1])});
        }, {});
    });

    console.log("My extension has loaded", videoURLs);

    var container = document.getElementById("info");
    var btn = document.createElement("button");
    // btn.className = "";
    btn.setAttribute("role", "button");
    btn.innerText = "Download";

    var dropDown = document.createElement("div");
    dropDown.id = "videoDownloadDropDown";

    container.appendChild(dropDown);

    var dropList = document.createElement("ul");
    dropDown.appendChild(dropList);

    container.appendChild(btn);

    for(i in videoURLs) {
        var item = document.createElement("a");
        var ext = videoURLs[i]["type"].split("/")[1].split(";")[0];

        item.innerText = videoURLs[i]["quality"] + " ( " + ext +" )";
        item.setAttribute("href", videoURLs[i]["url"]);
        item.setAttribute("target", "_blank");
        item.setAttribute("data-type", videoURLs[i]["type"]);
        item.addEventListener("click", downloadURI);
        dropList.appendChild(item);
    }

    btn.addEventListener("click", downloadVideo);
}