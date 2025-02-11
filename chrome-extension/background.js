
chrome.action.onClicked.addListener(async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
        const url = tab.url;

        //if this is a google search page, get the query, and open other search pages
        if (url.match(/^https:\/\/www\.google\.com\/search/g) != null) {

            var q_start = url.indexOf("q=") + "q=".length;
            var q_end = url.indexOf("&", q_start);

            if (q_end == -1) {

                q_end = url.length;

            }

            var query = url.substring(q_start, q_end, url.length);
            openTabs("google", query);

        //if this is a bing search page, get the query, and open other search pages
        } else if (url.match(/^https:\/\/www\.bing\.com\/search/g) != null) {

            var q_start = url.indexOf("q=") + "q=".length;
            var q_end = url.indexOf("&", q_start);

            if (q_end == -1) {

                q_end = url.length;

            }

            var query = url.substring(q_start, q_end, url.length);
            openTabs("bing", query);

        //if this is a ddg search page, get the query, and open other search pages
        } else if (url.match(/^https:\/\/duckduckgo\.com\/\?(?:q=|.*[?&]q=)/g) != null) {

            var q_start = url.indexOf("q=") + "q=".length;
            var q_end = url.indexOf("&", q_start);

            if (q_end == -1) {

                q_end = url.length;

            }

            var query = url.substring(q_start, q_end, url.length);
            openTabs("duckduckgo", query);

        }

    }

});


// function openTabs(skip, query){

//     console.log(skip, query)

// }

function openTabs(skip, query) {

    const urls = {

        "google": "https://www.google.com/search?q=" + query,
        "bing": "https://www.bing.com/search?q=" + query,
        "duckduckgo": "https://www.duckduckgo.com/?q=" + query

    }

    for (const engine in urls) {

        console.log("here is the engine", engine)
        if (engine != skip) {

            console.log("opening", urls[engine])

            chrome.tabs.create({url: urls[engine]});

        }

    }

}