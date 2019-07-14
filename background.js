'use strict';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get({'sitesToBlockCSV': ''},
        function(result) {
            var unwantedBaseUrls = result.sitesToBlockCSV.split(/,/);

            // Avoid really short substrings, since we're not matching sensibly
            for (let i=unwantedBaseUrls.length-1; i>=0; i--) {
                if (unwantedBaseUrls[i].length < 5) {
                    unwantedBaseUrls.splice(i, 1);
                }
            }

            var chosenURL = changeInfo.url;
            if (chosenURL === undefined) {
                return;
            }
            if (chosenURL.includes('chrome')) {
                // in case CSV is very badly specified
                // try to keep urls for disabling extension
                return;
            }

            var isPresent = unwantedBaseUrls.some(function(banned) {
                return chosenURL.indexOf(banned) >= 0; }
            )
            if (isPresent) {
                alert("You wanted: " + chosenURL + "\nDisallowed by extension.");
                var newURL = 'http://www.google.com';
                chrome.tabs.update(tabId, {url:newURL});
            }
        }
    );
});
