function show() {
  console.log('Videos Shown');

  let head = document.getElementsByTagName('head')[0];
  let myStyleSheet = document.getElementById('youtubeVideoHider');
  if (myStyleSheet) {
    head.removeChild(myStyleSheet);
  }

  hideVideoControls();
}

function hideVideoControls() {
  console.log('hideVideoControls');

  //remove video controls always visible
  if (isShowControlsActive === true && showControlsTicker) {
    isShowControlsActive = false;
    document.getElementsByClassName('ytp-chrome-bottom')[0].style.opacity = '';
    clearInterval(showControlsTicker);
  }
}
