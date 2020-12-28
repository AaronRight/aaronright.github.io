import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Angle } from './angle';
import { Noise } from './noise';

/*
  var canvas1 = document.getElementById("canvas");
  var template = document.getElementById("template").getAttribute("d").split(/[\s,]+/);

  let M = x => y => ctx.moveTo(x, y);
  let L = x => y => ctx.lineTo(x, y);
  let C = x1 => y1 => cx => cy => x2 => y2 => ctx.bezierCurveTo(x1, y1, cx, cy, x2, y2);

  var ctx = canvas1.getContext("2d");
  ctx.clearRect(0, 0, canvas1.width, canvas1.height);

  ctx.beginPath();

  for (let i = 0, f = undefined; i < template.length; i++) {
    if (f === undefined) switch (template[i]) {
      case "M": { f = M; break; }
      case "L": { f = L; break; }
      case "C": { f = C; break; }
      default: break;
    }
    else { f = f(template[i]) }
  }
  ctx.fill();
*/

@Component({
  selector: 'app-root',
  template: `<canvas #canvas width="1000" height="1000" (click)="perform()"></canvas>
  <audio #audio></audio>`,
  styles: [
    `:host{ flex:1 }`,
  ]
})
export class AppComponent implements AfterViewInit {
  noise: Noise;
  variants: Array<any[]>;
  angle: Angle;
  play: boolean = false;
  unlockIOSAudio = true;
  rotation = 15;
  @ViewChild("canvas") canvas: ElementRef;
  @ViewChild("audio") audio: ElementRef;
  context: CanvasRenderingContext2D;

  doubleClick: boolean = false;

  square = "M 410.03327687898815,834.2973455909166  165.70263319587986,589.9667019078083"+
  " C 115.86107328202843,540.1251419939568  115.86108035309621,459.87485093497526  165.7026331958799,410.03329809219156 "+
  " L 410.03329809219167,165.70263319587986 "+
  " C 459.87485093497537,115.86108035309621  540.125141993957,115.86107328202843  589.9667019078083,165.70263319587986 "+
  " L 834.2973455909166,410.0332768789882 "+
  " C 884.1388984337004,459.8748297217719  884.1389196469038,540.1251490650247  834.2973668041202,589.9667019078083 "+
  " L 589.9667019078083,834.2973668041201 "+
  " C 540.1251490650246,884.1389196469038  459.8748297217719,884.1388984337004  410.03327687898815,834.2973455909166 Z"

  triangle = "M 268.6119206416787,784.3000029821019  268.5786371254883,589.9667019078083 "+
  " C 268.5665738838012,519.4800917859759  268.5665668127334,480.5199011429562  268.5786371254882,410.03329809219167 "+
  " L 268.61194185488216,215.70000408896578 "+
  " C 268.62402630977266,145.21340103820125  398.70378575664745,115.86107328202843  448.5453456704989,165.70263319587986 "+
  " L 692.8759893536072,410.0332768789882 "+
  " C 742.7175421963909,459.8748297217719  742.7175634095943,540.1251490650247  692.8760105668107,589.9667019078083 "+
  " L 448.5453456704988,834.2973668041202 "+
  " C 398.7037928277151,884.1389196469038  268.62398388336567,854.7865989617987  268.6119206416787,784.3000029821019 Z"

  isDarkMode() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  rotate(angle_radians: number, x: number, y: number, x_pivot: number, y_pivot: number) {
    let s = Math.sin(angle_radians * Math.PI / 180);
    let c = Math.cos(angle_radians * Math.PI / 180);

    x -= x_pivot;
    y -= y_pivot;

    let x_new = x * c - y * s;
    let y_new = x * s + y * c;

    return { x: x_new + x_pivot, y: y_new + x_pivot };
  }

  calculateSvg() {
    let template1 = this.triangle.split(/[\s,]+/);
    let template2 = this.square.split(/[\s,]+/);

    let n = 135
    let diff = new Array(template1.length + 1)
    let result = new Array(n + 1)

    for (let j = 0; j < template1.length; j++) {
      if (template1[j] !== template2[j]) diff[j] = (Number(template2[j]) - Number(template1[j])) / n
    }

    for (let i = 0; i < result.length; i++) {
      result[i] = new Array(diff.length)
      for (let j = 0; j < diff.length; j++) {
        result[i][j] = diff[j] ? (Number(template1[j]) + diff[j] * i) : template1[j]
      }
    }
    return result;
  }

  ngAfterViewInit(): void {
    const theme = this.isDarkMode() ? { color: "#777 " } : { color: "#000" };
    this.context = this.canvas.nativeElement.getContext("2d");
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.context.fillStyle = theme.color;
    this.context.fill(new Path2D(this.triangle))

    this.angle = new Angle();
    this.variants = this.calculateSvg()
    this.noise = new Noise();

    this.rotateIcon = this.rotateIcon.bind(this)
  }

  perform() {
    if (!this.doubleClick) {
      // prevent doubleclicks
      setTimeout(() => { this.play = !this.play; this.doubleClick = false; }, 400);

      if(this.unlockIOSAudio){
        this.noise.unlock(this.audio.nativeElement)
        this.unlockIOSAudio = false;
      }
      
      // sound
      this.doubleClick = true;
      if (this.play) {
        this.noise.stopNoise(Noise.template);
      } else {
        this.noise.playNoise(Noise.template);
      }

      // animation
      if (this.angle.target == this.angle.value) {
        this.angle.direction = !this.angle.direction;
        this.angle.target = 135
        this.angle.value = 0;
        this.rotateIcon()
      } else {
        this.angle.direction = !this.angle.direction;
        this.angle.target = 135 + (this.angle.value - 135)
        this.angle.value = 0;
      }
    }
  }

  rotateIcon() {
    this.angle.value += this.rotation;

    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.context.translate(this.canvas.nativeElement.width / 2, this.canvas.nativeElement.height / 2);
    this.context.rotate((this.angle.direction ? 1 : -1) * (this.rotation * Math.PI) / 180);
    this.context.translate(-this.canvas.nativeElement.width / 2, -this.canvas.nativeElement.height / 2);

    this.context.fill(new Path2D(this.variants[this.angle.direction ? 135 - this.angle.value : this.angle.value].join(" ")))

    if (this.angle.target > this.angle.value) {
      requestAnimationFrame(this.rotateIcon)
    }
  }

  title = 'White Noise';
}
