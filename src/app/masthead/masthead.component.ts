import { Component } from '@angular/core';
import { Anime } from '../interfaces/root';
import { ServiceService } from '../providers/service.service';

//import { saveAs } from 'file-saver';



@Component({
  selector: 'app-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.css']
})
export class MastheadComponent {
  public data: Anime[] = [];
  public mastheadBg: string = '';


  constructor(private dataProvider: ServiceService) {}

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => {
      this.data = response as Anime[];
      setInterval(() => this.changeBg(), 15000);
    });

  }



  private changeBg() {

      const masthead = document.getElementById("mastHead");
      if (masthead) {
        const bg = this.data[Math.floor(Math.random() * this.data.length)]["Image URL"];
        this.mastheadBg = `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 75%, #000 100%), url('${bg}')`;

        
        //masthead.style.backgroundPosition = `center`;
        //masthead.style.backgroundRepeat = `no-repeat`;
        //masthead.style.backgroundAttachment = `scroll`;
        //masthead.style.backgroundSize = `cover`;
      };

  }

  // private updateImageURLs(data: Anime[]){
  //   data.forEach((anime) => {
  //     const matchingImage = this.imagenAnime.find((imgAnime) => imgAnime.anime === anime.Name);
  //     if (matchingImage) {
  //       anime["Image URL"] = matchingImage.anime_img;
  //     }
  //   });
  //   this.downloadAsJson(data);
  // }

  // public downloadAsJson(data: Anime[]) {
  //   const jsonData = JSON.stringify(data, null, 2);
  //   const blob = new Blob([jsonData], { type: 'application/json' });
  //   saveAs(blob, 'anime_data.json');
  // }


}
