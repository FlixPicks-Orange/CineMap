class Cinemap {
    constructor() {
      this.enabled = false;
      setTimeout(() => {
        this.video = new NetflixVideo();
        CinemapOverlay.toggle();
      if(CinemapOverlay.enabled && !CinemapOverlay.video.found) { CinemapOverlay.disableCinemap(); }
    }, 4000); // 4-second delay


    }

    connectVideo() {
        var tempVideo = new NetflixVideo();
        this.video = tempVideo;
    }
  
    toggle() {
      if(!this.enabled) {
        console.log(this.video);
        if(this.video.found) this.enableCinemap();
        else alert("Sorry, there is no video here to overlay!");
      } else this.disableCinemap();
    }
  
    enableCinemap() {
      if(this.video.found) {
        // Insert Interface Contorls
        this.generateConrols();
        document.body.appendChild(this.btnCloseCinemap);
        document.body.appendChild(this.btnLike);
        document.body.appendChild(this.btnDislike);
        // Cinemap Enabled
        this.enabled = true;
        console.log("Cinemap Overlay Enabled!");
      }
    }
  
    disableCinemap() {
      // Remove Interface Contorls
      document.body.removeChild(this.btnCloseCinemap);
      document.body.removeChild(this.btnLike);
      document.body.removeChild(this.btnDislike);
      // Cinemap Disabled
      this.enabled = false;
      console.log("Cinemap Overlay Disabled!");
    }
  
    sendLike() {
      console.log(this.video.getVideoInfo("12345", "LIKE"));
    }
  
    sendDislike() {
      console.log(this.video.getVideoInfo("12345", "DISLIKE"));
    }
  
    generateConrols() {
      var top = this.video.getPosTop()+10;
      var left = this.video.getPosLeft()+10;
      this.btnCloseCinemap = this.generateButton("closeCinemap", "CLOSE", top, left);
      this.btnCloseCinemap.addEventListener('click', function() { CinemapOverlay.toggle(); });
      left = left + 12;
      this.btnLike = this.generateButton("likeMovie", "LIKE", top, left);
      this.btnLike.addEventListener('click', function() { CinemapOverlay.sendLike(); });
      left = left + 10;
      this.btnDislike = this.generateButton("thumbDownMovie", "DISLIKE", top, left);
      this.btnDislike.addEventListener('click', function() { CinemapOverlay.sendDislike(); });
    }
  
    generateButton(id, txt, top, left) {
      const button = document.createElement('button');
      button.innerText = txt;
      button.id = id;
      button.style.position = 'relative';
      button.style.top = top+'px';
      button.style.left = left+'px';
      button.style.zIndex = "9999";
      return button;
    }
  }
  
  




  class NetflixVideo {
    constructor() {
      this.linkVideo();
    }
  
    linkVideo() {
      console.log("seek video");
      this.video = document.querySelector("video");
      // If video returns true and src is not blank
      if(this.video && this.video.src!="") {
        this.found = true;
        console.log("THERE IS A VIDEO ON THIS PAGE");
        //Attach Event Watchers
        this.video.addEventListener("play", this.eventPlay);
        this.video.addEventListener("pause", this.eventPause);
        console.log(this.video.currentSrc);
      } else {
        this.found = false;
        console.log("NO VIDEO FOUND");
      }
    }
  
    getPlayerObject() {
      return this.video;
    }
  
    getPlayerInfo() {
      const rect = this.video.getBoundingClientRect();
      const playerInfo = {
        width: rect.width,
        height: rect.height,
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      };
      return playerInfo;
    }
  
    getPosTop() {
      var info = this.getPlayerInfo();
      return info["top"];
    }
  
    getPosLeft() {
      var info = this.getPlayerInfo();
      return info["left"];
    }
  
    getVideoInfo(User="000000", Action="UNKNOWN") {
      /*var title = document.title
      title = title.replace(" - YouTube","");*/
      const VideoInfo = {
        UserID: User,
        Action: Action,
        time: this.video.currentTime,
        durration: this.video.duration,
        title: "video_title",
        src: this.video.currentSrc
        };
      return VideoInfo;
    }
  
    eventPlay() { console.log("Video is playing."); }
    eventPause() { console.log("Video is paused."); }
  }



const CinemapOverlay = new Cinemap();
//setTimeout(CinemapOverlay.connectVideo, 4000);

// Listen For Toggle Request From Popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.toggleOverlay) { CinemapOverlay.toggle(); }
});