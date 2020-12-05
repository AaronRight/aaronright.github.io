import { AfterViewInit, Component } from '@angular/core';
import { Noise } from './noise';
/* 
<path *ngIf="!play; else elseBlock" d="M 3.2723216,2 6.7276787,2 C 7.4325448,2 8,2.5674553 8,3.2723213 
          L 8, 6.7276787 C 8,7.4325447 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 
          L 2, 3.2723213 C 2,2.5674553 2.5674556,2 3.2723216,2 Z">
        </path>
        <ng-template #elseBlock>
          <path style="transform-origin: center center; transform: rotate(-135deg) translate(10%, -10%);" *ngIf="play; else elseBlock" d="M 3.6258562,2.3535346 5.0002355,3.7274432 C 5.4987364,4.2257735 5.7742266,4.5012636 6.2725568,4.9997645 
            L 7.6464652,6.3741439 C 8.1447953,6.8726449 7.4325448,8 6.7276787,8 L 3.2723216, 8 C 2.5674556,8 2,7.4325447 2,6.7276787 L 2,3.2723213 
            C 2,2.5674553 3.1273554,1.8552044 3.6258562,2.3535346 Z">
          </path>
        </ng-template>
*/
@Component({
  selector: 'app-root',
  template: `
    <div [ngClass]="play ? 'play' : ''" (click)="perform()">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
        <path></path>
    </svg>

    <span> {{ ios }}</span>
    </div>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent implements AfterViewInit{
  noise: Noise;
  play: boolean = false;
  ios: boolean = false;

  ngAfterViewInit(): void {
    this.ios = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
    this.noise = new Noise();
  }

  perform() {
    if (this.play) {
      this.noise.stopNoise(Noise.template)
    } else {
      this.noise.playNoise(Noise.template)
    }
    this.play = !this.play;
  }

  title = 'White Noise';
}
