import { Component } from '@angular/core';
import { Anime } from '../interfaces/root';
import { ServiceService } from '../providers/service.service';

@Component({
  selector: 'app-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.css']
})
export class MastheadComponent {
  public data: Anime[] = [];


  constructor(private dataProvider: ServiceService) {}

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => {
      this.data = response as Anime[];
      this.changeBg();
    });
  }

  private changeBg() {
      const images : string[] = [];
      for(let i = 0; i < this.data.length ; i++){
        images.push(this.data[i].anime_img);
      }

      const masthead = document.getElementById("mastHead");
      if (masthead) {
        const bg = images[Math.floor(Math.random() * images.length)];
        console.log(bg);
        masthead.style.background =  `url('${bg}')`;
      };

  }

}
