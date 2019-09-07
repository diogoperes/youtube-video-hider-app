var isShowControlsActive;
var showControlsTicker;

function hide(actionConfig) {
  console.log('Videos Hiden');
  let head = document.getElementsByTagName('head')[0];
  let myStyleSheet = document.getElementById('youtubeVideoHider');
  if (myStyleSheet) {
    head.removeChild(myStyleSheet);
    hideVideoControls();
  }

  let file;

  if (actionConfig.identifier === HIDE_VIDEO_BUTTON_CONFIG.identifier) {
    file = '/css/hide.css';
  } else if (actionConfig.identifier === MINIMIZE_VIDEO_BUTTON_CONFIG.identifier) {
    file = '/css/minimize.css';
    showVideoControls();
  } else if (actionConfig.identifier === INVERT_COLORS_VIDEO_BUTTON_CONFIG.identifier) {
    file = '/css/invert.css';
  } else {
    console.error('Action not recognized');
  }

  let stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = chrome.extension.getURL(file);
  stylesheet.id = "youtubeVideoHider";
  head.appendChild(stylesheet);

}

function showVideoControls() {
  console.log('showVideoControls');
  if (isShowControlsActive === undefined || isShowControlsActive === false) {
    isShowControlsActive = true;
    var ytControls;

    showControlsTicker = setInterval(function () {
      if (ytControls === undefined) {
        ytControls = document.getElementsByClassName('ytp-chrome-bottom')[0];
      } else {
        ytControls.style.opacity = 1;
        document.getElementsByClassName('ytp-time-current')[0].innerHTML = msToHMS(document.getElementsByTagName('video')[0].currentTime * 1000);
        document.getElementsByClassName('ytp-play-progress')[0].style.transform = 'scaleX(' + document.getElementsByTagName('video')[0].currentTime
          / document.getElementsByTagName('video')[0].duration + ')';
      }
    }, 100);

  }
}

function msToHMS( ms ) {
  // 1- Convert to seconds:
  let seconds = ms / 1000;
  // 2- Extract hours:
  let hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  let minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = parseInt(seconds % 60);
  seconds = seconds <= 9 ? '0' + seconds : seconds;
  if(hours === 0) {
    return minutes+":"+seconds;
  }else {
    minutes = minutes <= 9 ? '0' + minutes : minutes;
    return hours+":"+minutes+":"+seconds;
  }
}