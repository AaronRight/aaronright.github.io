    export class Noise {
        // @ts-ignore
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
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

          console.log(123)

          track.audioSource.start();

          console.log(234)
        }
    
        static template = {
            volume: 0.05, // 0 - 1
            fadeIn: 2.5, // time in seconds
            fadeOut: 1.3, // time in seconds
          }
      }