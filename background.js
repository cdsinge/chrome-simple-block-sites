'use strict';

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   var unwantedBaseUrls = chrome.storage.sync.get({sitesToBlockCSV: ''}).split(/,/);
   var chosenURL = changeInfo.url;
   if (chosenURL === undefined) {
	   return;
   }

   var isPresent = unwantedBaseUrls.some(function(banned) { return chosenURL.indexOf(banned) >= 0; })
   if (isPresent) {
	  alert("You wanted: " + chosenURL + "\nDisallowed by extension.");
	  var newURL = 'http://www.google.com';
      chrome.tabs.update(tabId, {url:newURL});
   }
});