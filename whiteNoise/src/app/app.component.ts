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
  doubleClick: boolean = false;
  ios: boolean = false;

  ngAfterViewInit(): void {
    this.ios = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
    this.noise = new Noise();
  }

  perform() {
    if(!this.doubleClick){
      this.doubleClick = true;
      if (this.play) {
        this.noise.stopNoise(Noise.template);
      } else {
        this.noise.playNoise(Noise.template);
      }

      if(this.ios){
        let animation = document.getElementById("animation");
        // @ts-ignore
        animation.beginElement();
      }
  
      setTimeout(() => {this.play = !this.play; this.doubleClick = false; }, 1000);
    }
    
  }

  title = 'White Noise';
}
