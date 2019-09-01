let HIDE_VIDEO_BUTTON_CONFIG = {
  labels: [
    'HIDE', 'HIDE'
  ],
  identifier: 'hide',
  buttonId: 'hideButton',
  button: undefined
};

let MINIMIZE_VIDEO_BUTTON_CONFIG = {
  labels: [
    'MINIMIZE', 'MINIMIZE'
  ],
  identifier: 'minimize',
  buttonId: 'minimizeButton',
  button: undefined
};

let INVERT_COLORS_VIDEO_BUTTON_CONFIG = {
  labels: [
    'INVERT', 'INVERT'
  ],
  identifier: 'invertColors',
  buttonId: 'invertColorsButton',
  button: undefined
};

let CONFIGS = [HIDE_VIDEO_BUTTON_CONFIG, MINIMIZE_VIDEO_BUTTON_CONFIG, INVERT_COLORS_VIDEO_BUTTON_CONFIG];

let lastYouTubeVideoHiderAction = undefined;

let eyeOpenPath = '../img/eye.png';
let eyeClosedPath = '../img/eyeClosed.png';

window.addEventListener('DOMContentLoaded', function () {
  console.log('Popup Loaded');

  // link buttons and add button listener based on config
  for (let configIndex in CONFIGS) {
    CONFIGS[configIndex].button = document.getElementById(CONFIGS[configIndex].buttonId);
    CONFIGS[configIndex].button.addEventListener('click', function () {
      changeAction(CONFIGS[configIndex]);
    });
  }

  // get lastYouTubeVideoHiderAction and change buttons accordingly
  chrome.storage.sync.get(['youTubeVideoHiderAction'], function (items) {
    console.log('lastYouTubeVideoHiderAction: ' + items.youTubeVideoHiderAction);
    if (items.youTubeVideoHiderAction && items.youTubeVideoHiderAction !== 'clear') {
      lastYouTubeVideoHiderAction = items.youTubeVideoHiderAction;
    }
    ;

    for (let configIndex in CONFIGS) {
      if (items.youTubeVideoHiderAction === CONFIGS[configIndex].identifier) {
        CONFIGS[configIndex].button.getElementsByClassName('text')[0].innerHTML = CONFIGS[configIndex].labels[1];
        CONFIGS[configIndex].button.classList.add('active');
        chrome.browserAction.setIcon({path: eyeClosedPath});
        lastYouTubeVideoHiderAction = CONFIGS[configIndex];
      }
    }
  });

  let clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', function () {
    clear();
  });

}, false);

function changeAction(actionConfig) {
  console.log('Action: ' + actionConfig.identifier);
  console.log('lastYouTubeVideoHiderAction: ' + lastYouTubeVideoHiderAction);
  if (lastYouTubeVideoHiderAction && lastYouTubeVideoHiderAction.identifier === actionConfig.identifier) {
    chrome.storage.sync.set({
      youTubeVideoHiderAction: 'clear'
    }, function () {
      console.log('Settings saved');
    });

    chrome.browserAction.setIcon({path: eyeOpenPath});
    lastYouTubeVideoHiderAction = undefined;
    actionConfig.button.getElementsByClassName('text')[0].innerHTML = actionConfig.labels[0];
    actionConfig.button.classList.remove('active');
  } else {
    chrome.storage.sync.set({
      youTubeVideoHiderAction: actionConfig.identifier
    }, function () {
      console.log('Settings saved');
    });

    if (lastYouTubeVideoHiderAction) {
      lastYouTubeVideoHiderAction.button.classList.remove('active');
      lastYouTubeVideoHiderAction.button.getElementsByClassName('text')[0].innerHTML = lastYouTubeVideoHiderAction.labels[0];
    }

    chrome.browserAction.setIcon({path: eyeClosedPath});
    lastYouTubeVideoHiderAction = actionConfig;
    actionConfig.button.getElementsByClassName('text')[0].innerHTML = actionConfig.labels[1];
    actionConfig.button.classList.add('active');
  }
};

function clear() {
  console.log('Action: Clear');
  console.log('lastYouTubeVideoHiderAction: ' + lastYouTubeVideoHiderAction);
  if (lastYouTubeVideoHiderAction) {
    chrome.storage.sync.set({
      youTubeVideoHiderAction: 'clear'
    }, function () {
      console.log('Settings saved');
    });

    chrome.browserAction.setIcon({path: eyeOpenPath});
    lastYouTubeVideoHiderAction.button.getElementsByClassName('text')[0].innerHTML = lastYouTubeVideoHiderAction.labels[0];
    lastYouTubeVideoHiderAction.button.classList.remove('active');
    lastYouTubeVideoHiderAction = undefined;
  }
};
