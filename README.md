# WebRTC



### [Basic getUserMedia demo](https://webrtc.github.io/samples/src/content/getusermedia/gum/) 

`getUserMedia()`  첫번째 예제

1. `index.html  ` 에서는 video 태그만 추가해주면 된다.

2. `main.js` 에서는 `getUserMedia()` 역할

   ```javascript
   navigator.mediaDevices.getUserMedia(constraints).
       then(handleSuccess).catch(handleError);
   // 카메라 접근이 허락된 경우 MediaStream을 리턴하고 handleSuccess를 호출
   ```

   [video, audio 속성 constraints](webrtc.github.io/samples/src/content/peerconnection/constraints)

   

참고사이트 : [Stream video from your webcam](https://codelabs.developers.google.com/codelabs/webrtc-web/#3)





