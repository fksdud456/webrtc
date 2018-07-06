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




### RTCPeerConnection

RTC는 offer(신호를 보내는 쪽) -  answer(신호를 받는 쪽) 이 존재한다.
SDP(Session Description Protocol)을 주고받아 서로 통신이 가능하게 만들어줘야 한다.

#### A-B 통신을 위한 과정
1. `A` createdOffer
2. `A` setLocalDescription
3. `B` setRemoteDescription
4. `B` createAnswer
5. `B` setLocalDescription
6. `A` setRemoteDescription

```
local_Peer.createOffer( function( offer_sdp ) {
    local_Peer.setLocalDescription( offer_sdp, function( ) {
        // offer_sdp send to answer
    } );        
} );

// recive by offer
remote_Peer.setRemoteDescription( new RTCSessionDescription( offer_sdp ) );
remote_Peer.setLocalDescription( answer_sdp, function( ) {
    // answer_sdp send to offer
} );

// recive by offer
remote_Peer.setRemoteDescription( new RTCSessionDescription( answer_sdp ) );
```

#### 네트워크 정보 교환
네트워크 정보는 사용할 수 있는 대기 상태가 발생할때마다 호출이 된다. 이때 발생되는 데이터를 ice candidate라고 부른다. 이 ice candidate를 상대방이 받으면 상대방은 addIceCandidate 함수를 호출하여 상대방의 네트워크 정보를 추가하면 된다. 하지만 이상하게도 개인적으로 가장 고생한 부분이었다. 계속 말하는 것이지만, 순서가 중요하다고 하였다. 다른 webRTC소스들을 살펴보면 onicecandidate 이벤트 발생시, 순서대로 넘겨주어야 한다는 설명이 전무하여 일주일 가까이 고생한 것 같다. 설명하면 순서대로 넘겨주기 위해서 이벤트 발생때마다 담아두었다가 e.currentTarget.iceGatheringState 변수를 통해서 완료가 되었을때 순서대로 상대방에게 보내도록 하였다. 이제 정상적으로 모든 ice candidate를 교환하고 나면, 위에서 RTC 객체 생성시 걸어둔 remote_Peer.onaddstream 이벤트가 발행하여 화면이 보인다!

참고사이트 : [webRTC로 화상채팅 구현하기](http://blim.co.kr/archives/183)
