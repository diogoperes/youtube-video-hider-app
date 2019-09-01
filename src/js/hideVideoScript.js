var isShowControlsActive;
var showControlsTicker;

function hide(actionConfig) {
  console.log('Videos Hiden');
  let head = document.getElementsByTagName('head')[0];
  let myStyleSheet = document.getElementById('myStyleSheet');
  if (myStyleSheet) {
    head.removeChild(myStyleSheet);
    hideVideoControls();
  }

  let css = document.createElement('style');
  css.type = 'text/css';
  css.id = 'myStyleSheet';
  let styles = '';

  if (actionConfig.identifier === HIDE_VIDEO_BUTTON_CONFIG.identifier) {
    styles = hideVideos();
  } else if (actionConfig.identifier === MINIMIZE_VIDEO_BUTTON_CONFIG.identifier) {
    styles = minimize();
    showVideoControls();
  } else if (actionConfig.identifier === INVERT_COLORS_VIDEO_BUTTON_CONFIG.identifier) {
    styles = invertColors();
  }

  if (css.styleSheet) {
    css.styleSheet.cssText = styles;
  } else {
    css.appendChild(document.createTextNode(styles));
  }
  ;

  head.appendChild(css);

}

function minimize() {
  console.log('hideVideos');
  let style = '';
  style += 'ytd-thumbnail.ytd-compact-video-renderer, ' + 'ytd-thumbnail.ytd-compact-radio-renderer, ' + 'ytd-playlist-thumbnail.ytd-compact-playlist-renderer {' + 'height: 34px !important;' + 'width: 61px !important;' + '}';
  style += 'ytd-thumbnail.style-scope.ytd-compact-video-renderer:hover, ' + 'ytd-thumbnail.style-scope.ytd-compact-radio-renderer:hover, ' + 'ytd-playlist-thumbnail.ytd-compact-playlist-renderer:hover {' + 'height: 94px !important;' + 'width: 168px !important;' + '}';
  style += '#metadata-line.style-scope.ytd-video-meta-block {' + 'display: none;' + '}';

  //main video
  style += '.html5-main-video {' + 'opacity: 0 !important;' + '}';
  style += '#player-container {' + 'height: 90px !important; background: #000000; border-radius: 5px;' + '}';
  style += '#player {' + 'height: 100px !important;' + '}';

  return style;
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
        document.getElementsByClassName('ytp-time-current')[0].innerHTML = millisToMinutesAndSeconds(document.getElementsByTagName('video')[0].currentTime * 1000);
        document.getElementsByClassName('ytp-play-progress')[0].style.transform = 'scaleX(' + document.getElementsByTagName('video')[0].currentTime
          / document.getElementsByTagName('video')[0].duration + ')';
      }
    }, 100);

  }
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (
    seconds < 10
      ? '0'
      : '') + seconds;
};

function hideVideos() {
  var styleToApply = 'opacity: 0;';
  var classesToHide = ['#thumbnail #img', '#movie_player .html5-video-container'];
  let style = '';

  for (let c in classesToHide) {
    style += classesToHide[c] + ' {' + styleToApply + '}';
  }

  return style;
}

function invertColors() {
  var styleToApply = 'filter: invert(1);';
  var classesToHide = ['#thumbnail #img', '#movie_player .html5-video-container'];
  let style = '';

  for (let c in classesToHide) {
    style += classesToHide[c] + ' {' + styleToApply + '}';
  }

  return style;
}
