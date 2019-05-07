chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    console.log("Received ", request, sender, callback);

    chrome.downloads.download({url: request.url, filename: request.name.split(";")[0].replace(/[^a-zA-Z0-9.]/g, "")});
}); 