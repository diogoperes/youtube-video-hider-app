// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   if (changeInfo && changeInfo.status == 'complete') {
//     chrome.storage.sync.get(['isVideosHiden'], function (items) {
//       let data = items.isVideosHiden; //get attribute from data
//       console.log('isVideosHiden: ' + data);
//       if (data === 'true') {
//         chrome.tabs.sendMessage(tab.id, { type: 'url_changed', isVideosHiden: data },
//           function (response) {
//             console.log('response: ' + response);
//           });
//
//         chrome.browserAction.setIcon({ path: '../img/blink.png', tabId: tab.id });
//       };
//     });
//   }
// });

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.type === 'isVideosHidenStateChanged') {
//       console.log('isVideosHidenStateChanged'); //message from popup
//       chrome.tabs.query({ currentWindow: true }, function (tabs) { //get tabs from current window
//         for (var tab in tabs) {
//           if (tabs[tab].url.indexOf('https://www.youtube.com') !== -1) { //if tab contains
//             chrome.tabs.sendMessage(tabs[tab].id,
//               { type: request.type, isVideosHiden: request.isVideosHiden },
//               function (response) {
//                 console.log('response: ' + response);
//               });
//           }
//         }
//       });
//     }
//
//     sendResponse('Background message received');
//   });
