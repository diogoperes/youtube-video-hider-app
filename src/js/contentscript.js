let HIDE_VIDEO_BUTTON_CONFIG = {
  labels: ['HIDE', 'SHOW'],
  identifier: 'hide',
  buttonId: 'hideButton',
  button: undefined,
};

let MINIMIZE_VIDEO_BUTTON_CONFIG = {
  labels: ['MINIMIZE', 'MAXIMIZE'],
  identifier: 'minimize',
  buttonId: 'minimizeButton',
  button: undefined,
};

let INVERT_COLORS_VIDEO_BUTTON_CONFIG = {
  labels: ['INVERT', 'INVERT'],
  identifier: 'invertColors',
  buttonId: 'invertColorsButton',
  button: undefined,
};

let CONFIGS = [
  HIDE_VIDEO_BUTTON_CONFIG,
  MINIMIZE_VIDEO_BUTTON_CONFIG,
  INVERT_COLORS_VIDEO_BUTTON_CONFIG,
];

console.log('content script loaded');
var isVideosHiden;

chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);

          if (key === 'youTubeVideoHiderAction') {
            if (storageChange.newValue === 'clear') {
              show();
            } else {
              for (let configIndex in CONFIGS) {
                if (storageChange.newValue === CONFIGS[configIndex].identifier) {
                  hide(CONFIGS[configIndex]);
                }
              }
            }
          }
        }
      });

window.onload = function () {
  console.log('YouTube Video Hider Loaded');
  chrome.storage.sync.get(['youTubeVideoHiderAction'], function (items) {
    // console.log('youTubeVideoHiderAction: ' + items.youTubeVideoHiderAction);
    for (let configIndex in CONFIGS) {
      if (items.youTubeVideoHiderAction === CONFIGS[configIndex].identifier) {
        hide(CONFIGS[configIndex]);
      }
    }
  });
};
