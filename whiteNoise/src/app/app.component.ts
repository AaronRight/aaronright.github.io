import { AfterViewInit, Component } from '@angular/core';
import { Noise } from './noise';

@Component({
  selector: 'app-root',
  template: `
    <div [ngClass]="play ? 'play' : ''" (click)="perform()">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
        <path></path>
    </svg>
    </div>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent implements AfterViewInit{
  noise: Noise;
  play: boolean = false;

  ngAfterViewInit(): void {
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
