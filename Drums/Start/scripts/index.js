/*
data model
+-----------------+-------------------+----
|      --------      | Takt № info |  ...
+-----------------+-------------------+----
|  Track info |    { notes}     |  ...
*/

var SOUNDS = {};
SOUNDS[36] = { name : 'Bass', sound: ''}; 
SOUNDS[37] = { name : 'Stick', sound: ''};
SOUNDS[38] = { name : 'Snare', sound: ''};
SOUNDS[41] = { name: 'Low Floor Tom', sound: ''};
SOUNDS[42] = { name: 'Closed Hi-Hat', sound: ''};
SOUNDS[43] = { name: 'High Floor Tom', sound: ''};
SOUNDS[44] = { name: 'Pedal Hi-Hat', sound: ''};
SOUNDS[45] = { name: 'Low Tom', sound: ''};
SOUNDS[46] = { name: 'Open Hi-Hat', sound: ''};
SOUNDS[47] = { name: 'Low-Mid Tom', sound: ''};
SOUNDS[48] = { name: 'Hi-Mid Tom', sound: ''};
SOUNDS[49] = { name: 'Crash Cymbal 1', sound: ''};
SOUNDS[50] = { name: 'Hi Tom', sound: ''};
SOUNDS[51] = { name: 'Ride Cymbal', sound: ''};
SOUNDS[52] = { name: 'Chinese Cymbal', sound: ''};
SOUNDS[53] = { name: 'Ride Bell', sound: ''};
SOUNDS[55] = { name: 'Splash Cymbal', sound: ''};
SOUNDS[56] = { name: 'Cowbell', sound: ''};
SOUNDS[57] = { name: 'Crash Cymbal 2', sound: ''};

var INSTRUMENTS = { 
	'BASS' : [ 36 ], 		'SNARE' : [ 37, 38 ],		'HI-HAT' : [ 42, 44, 46 ],
	'RIDE' : [ 51, 53 ],	'CRASH' : [ 49, 57 ],		'TOM-TOM' : [ 41, 43, 45, 47, 48, 50 ],
	'SPLASH' : [ 55 ], 	'COWBELL' : [ 56 ], 		'CHINA' : [ 52 ]
}

class Track {
  constructor(instrument) { this.instrument = instrument; }
  getInstrument(){ return getKeyByValue(INSTRUMENTS, this.instrument);}
  play() { alert(this.instrument); }
  setInstrument(instrument){ this.instrument = instrument; }
}

class Takt {
  constructor(size) { this.size = size; }
  play() { alert(this.size); /* 4/4 = 1 */}
}

class Note {
  constructor(num, len) { this.num = num; this.len = len; }
  play() { alert(this.len); /* 1/8 */}
  getNum(){return this.num;}
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

Vue.prototype.melody = [ 
			[	false , new Takt(1), new Takt(1) ],
			generateTrackRow(INSTRUMENTS['BASS']),
			generateTrackRow(INSTRUMENTS['HI-HAT']),
			generateTrackRow(INSTRUMENTS['SNARE'])
		];
		
Vue.prototype.choosing = false;

Vue.component('v-track', {
	props: ['title', 'row'],
  template: `<div class='v-track'>
						<div>{{ title }}</div>
						<div>
							<v-takt  v-for="(t,index) in melody[row]" v-bind:row="row" v-bind:column="index"></v-takt> 
						</div>
					 </div>`
});

Vue.component('v-takt', {
	props:['row', 'column'],
  template: `<div class='v-takt'>
					 	<v-note  v-for="(t,index) in melody[row][column]" v-if="index!='instrument'" 
							v-bind:checked="t.getNum()" :x='row' :y='column' :z='index'></v-note> 
					 </div>`
})

Vue.component('v-test', {
	template:' <div>{{choosing}}<button @click="handleClick()">123</button></div>',
	methods:{
		handleClick(){
			if(Vue.prototype.choosing) 
				Vue.prototype.choosing = false;
			else
				Vue.prototype.choosing = true;
		}
	}
})

Vue.component('v-note', {
  props:['checked'],
  template: `<label class='v-note'>
						<input v-if='!choosing' type='checkbox' class='v-note-value' :checked='checked'/>
						<input v-if='choosing' type='checkbox' class='v-note-chooser'/>
					 </label>`
})


var vue_app = new Vue({
	el: '#vue-app',
	data: {}
});

/* Generate data */
function generateNotes(size, array_size){
	var array = [];
	for(var i=0; i<array_size; i++){array.push( new Note(0, size) );}
	return array;
}

function generateTrackRow(instrument){
	var array=[];
	array.push(new Track(instrument));
	for(var i=0; i<4; i++){
		array.push(generateNotes(1/4, 4));
	}
	return array;
}

/*TODO*/
function play() {
	new Audio('./bass_1.mp3').play();
}
