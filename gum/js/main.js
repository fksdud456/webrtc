/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

var errorElement = document.querySelector('#errorMsg');
var video = document.querySelector('video');

// Put variables in global scope to make them available to the browser console.
// constraints 는 getUserMedia의 매개변수로 사용되며
// audio, video 속성을 변경할 수 있다. 아래 사이트 참고
// webrtc.github.io/samples/src/content/peerconnection/constraints
var constraints = window.constraints = {
    "audio": true,
    "video": {
        "width": {
            "min": "300",
            "max": "640"
        },
        "height": {
            "min": "200",
            "max": "480"
        }
    }
};

function handleSuccess(stream) {
  var videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log('Using video device: ' + videoTracks[0].label);
  stream.oninactive = function() {
    console.log('Stream inactive');
  };
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
        constraints.video.width.exact + ' px is not supported by your device.');
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg('getUserMedia error: ' + error.name, error);
}

function errorMsg(msg, error) {
  errorElement.innerHTML += '<p>' + msg + '</p>';
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

// .then()  허용됐을 때 실행되는 callback 함수
// .catch() 오류났을 때 실행되는 callback 함수

// getUserMedia 가 호출되면 마이크, 카메라에 접근을 허용하는지 물어본다
// 허용이되면 MediaStream을 리턴한다.
// .then(handleSuccess) : handleSuccess 함수가 실행되며 MediaStream을 parameter로 받는다.
// video태그의 srcObject 속성으로 사용된다.
navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
