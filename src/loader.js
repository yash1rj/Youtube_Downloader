var s = document.createElement("script");
s.src = chrome.extension.getURL("src/youtubedl.js");


(document.head || document.documentElement).appendChild(s);

window.addEventListener("message", function(e) {
    // console.log("download: ", e);

    var ext = e.data.type.split("/")[1].split(":")[0];
    var fn = e.data.name + "." + ext;

    console.log(fn, chrome);

    chrome.runtime.sendMessage({name: fn, url: e.data.url}, function(res) {
        console.log("result: ",res);
    });
})