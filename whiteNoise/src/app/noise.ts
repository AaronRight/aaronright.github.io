export class Noise {
  // @ts-ignore
  audioContext = new ( window.AudioContext ? window.AudioContext : window.webkitAudioContext)();
  fadeOutTimer: any;

  // https://noisehack.com/generate-noise-web-audio-api/
  createNoise(track: any) {

    const bufferSize = 2 * this.audioContext.sampleRate;
    const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    track.audioSource.buffer = noiseBuffer;
  }

  stopNoise(track: any) {
    if (track.audioSource) {
      clearTimeout(this.fadeOutTimer);
      try {
        track.audioSource.stop();
      } catch(err){}
    }
  }

  fadeNoise(track: any) {

    if (track.fadeOut) {
      track.fadeOut = (track.fadeOut >= 0) ? track.fadeOut : 0.5;
    } else {
      track.fadeOut = 0.5;
    }

    if (track.canFade) {
      track.gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + track.fadeOut);
      track.canFade = false;

      this.fadeOutTimer = setTimeout(() => {
        this.stopNoise(track);
      }, track.fadeOut * 1000);

    } else {
      this.stopNoise(track);
    }
  }

  buildTrack(track: any) {
    track.audioSource = this.audioContext.createBufferSource();
    track.gainNode = this.audioContext.createGain();
    track.audioSource.connect(track.gainNode);
    track.gainNode.connect(this.audioContext.destination);
    track.canFade = true; // used to prevent fadeOut firing twice
  }

  setGain(track: any) {

    track.volume = (track.volume >= 0) ? track.volume : 0.5;

    if (track.fadeIn) {
      track.fadeIn = (track.fadeIn >= 0) ? track.fadeIn : 0.5;
    } else {
      track.fadeIn = 0.5;
    }

    track.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    track.gainNode.gain.linearRampToValueAtTime(track.volume / 4, this.audioContext.currentTime + track.fadeIn / 2);
    track.gainNode.gain.linearRampToValueAtTime(track.volume, this.audioContext.currentTime + track.fadeIn);
  }

  playNoise(track: any) {

    this.stopNoise(track);
    this.buildTrack(track);
    this.createNoise(track);
    this.setGain(track);
    track.audioSource.loop = true;
    track.audioSource.start();
  }

  unlock(element: any) {
    // https://stackoverflow.com/questions/21122418/ios-webaudio-only-works-on-headphones

    /* 
       The mute toggle switch does mute WebAudio, but it does not mute HTML5 tags. 
       In order to play WebAudio you must also play at least one WebAudio sound source node and one HTML5 tag during a user action. 
       It is fine if these sounds are short bits of silence
    */
    var buffer = this.audioContext.createBuffer(1, 1, 22050); // 1/10th of a second of silence
    var source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start();

    var silenceDataURL = "data:audio/mp3;base64,//MkxAAHiAICWABElBeKPL/RANb2w+yiT1g/gTok//lP/W/l3h8QO/OCdCqCW2Cw//MkxAQHkAIWUAhEmAQXWUO"+
    "FW2dxPu//9mr60ElY5sseQ+xxesmHKtZr7bsqqX2L//MkxAgFwAYiQAhEAC2hq22d3///9FTV6tA36JdgBJoOGgc+7qvqej5Zu7/7uI9l//MkxBQHAAYi8AhEAO193vt9K"+
    "GOq+6qcT7hhfN5FTInmwk8RkqKImTM55pRQHQSq//MkxBsGkgoIAABHhTACIJLf99nVI///yuW1uBqWfEu7CgNPWGpUadBmZ////4sL//MkxCMHMAH9iABEmAsKioqKigs"+
    "LCwtVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVV//MkxCkECAUYCAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

    element.loop = false;
    element.src = silenceDataURL;
    element.play();
}

  static template = {
      volume: 0.05, // 0 - 1
      fadeIn: 2.5, // time in seconds
      fadeOut: 1.3, // time in seconds
    }
}