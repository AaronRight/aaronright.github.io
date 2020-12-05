import { AfterViewInit, Component } from '@angular/core';
import { Noise } from './noise';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
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
      this.noise.stopNoise(Noise.template);

      if(this.ios){
        let animation = document.getElementsByClassName("animation-2");
        // @ts-ignore
        for (let a of animation) a.beginElement();
      }
    } else {
      this.noise.playNoise(Noise.template);

      
      if(this.ios){
        let animation = document.getElementsByClassName("animation-1");
        // @ts-ignore
        for (let a of animation) a.beginElement();
      }
    }
    this.play = !this.play;
  }

  title = 'White Noise';
}
