//https://webaudioapi.com/samples/rhythm/

// Start off by initializing a new context.
context = new (window.AudioContext || window.webkitAudioContext)();

if (!context.createGain)
  context.createGain = context.createGainNode;
if (!context.createDelay)
  context.createDelay = context.createDelayNode;
if (!context.createScriptProcessor)
  context.createScriptProcessor = context.createJavaScriptNode;

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame    || 
  window.oRequestAnimationFrame      || 
  window.msRequestAnimationFrame     || 
  function( callback ){
  window.setTimeout(callback, 1000 / 60);
};
})();

function playSound(buffer, time) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source[source.start ? 'start' : 'noteOn'](time);
}

function loadSounds(obj, soundMap, callback) {
  // Array-ify
  var names = [];
  var paths = [];
  for (var name in soundMap) {
    var path = soundMap[name];
    names.push(name);
    paths.push(path);
  }
  bufferLoader = new BufferLoader(context, paths, function(bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
      var buffer = bufferList[i];
      var name = names[i];
      obj[name] = buffer;
    }
    if (callback) {
      callback();
    }
  });
  bufferLoader.load();
}

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
};

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
};

var RhythmSample = function() {
  loadSounds(this, {
    kick: '../src/resources/sounds/bass_1.mp3',
    snare: '../src/resources/sounds/snare_1.mp3',
    hihat: '../src/resources/sounds/hi-hat_1.mp3'
  });
};

RhythmSample.prototype.play = function() {
  // We'll start playing the rhythm 100 milliseconds from "now"
  var startTime = context.currentTime + 0.100;
  var tempo = 80; // BPM (beats per minute)
  var eighthNoteTime = (60 / tempo) / 2;

  // x2
  // | . . . . . . . . |                             
  // | .       .       |          
  // |     .       .   |          

  // Play 2 bars of the following:
  for (var bar = 0; bar < 2; bar++) {
    var time = startTime + bar * 8 * eighthNoteTime;
    // Play the bass (kick) drum on beats 1, 5
    playSound(this.kick, time);
    playSound(this.kick, time + 4 * eighthNoteTime);

    // Play the snare drum on beats 3, 7
    playSound(this.snare, time + 2 * eighthNoteTime);
    playSound(this.snare, time + 6 * eighthNoteTime);

    // Play the hi-hat every eighthh note.
    for (var i = 0; i < 8; ++i) {
      playSound(this.hihat, time + i * eighthNoteTime);
    }
  }
};

RhythmSample.prototype.play_experimental = function() {
  var startTime = context.currentTime + 0.100;
  var tempo = 90; // BPM 
  var n4 = (60 / tempo) ; // fourthNoteTime
  var n8 = n4 / 2; // eighthNoteTime
  var n16 = n8 / 2; // sixteenthNoteTime

  // note - n | length : l
  var melody = [
    [ this.kick ,[ {"n":1,"l":n8},  {"n":1,"l":n8}, {"n":0,"l":n8}, {"n":1,"l":n8},                   {"n":0,"l":n8}, {"n":1,"l":n16}, {"n":1,"l":n16}, {"n":0,"l":n8}, {"n":0,"l":n8}                   ]],
    [ this.snare,[ {"n":0,"l":n8},  {"n":0,"l":n8}, {"n":1,"l":n8}, {"n":0,"l":n16}, {"n":1,"l":n16}, {"n":0,"l":n8}, {"n":0,"l":n8},                   {"n":1,"l":n8}, {"n":1,"l":n16}, {"n":1,"l":n16} ]],
    [ this.hihat,[ {"n":1,"l":n4},                  {"n":1,"l":n4},                                   {"n":1,"l":n4},                                   {"n":1,"l":n4}                                   ]]
  ];

    for (let iterations = 0; iterations < 8; iterations++){
      for (let bar = 1; bar < melody[0].length; bar++) { // play every tact
        let time = startTime + bar * 8 * n8;
        
        for( let track = 0; track < melody.length; track++){
          let total_delay = 0;  
          for( let note = 0; note < melody[track][bar].length; note++ ){
            if( melody[track][bar][note].n == 1 ){
              playSound(melody[track][0], time + total_delay);
            } total_delay += melody[track][bar][note].l;
          }
        }
      }
      startTime += 4 * n4;
    }
};