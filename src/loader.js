var s = document.createElement("script");
s.src = chrome.extension.getURL("./src/background.js");


(document.head || document.documentElement).appendChild(s);

window.addEventListener("message", function(e) {
    console.log(e);
})