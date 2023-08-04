import { Component } from '@angular/core';
import { ServiceService } from '../providers/service.service';
import { Anime } from '../interfaces/root';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  public data: Anime[] = [];

  constructor(private dataProvider: ServiceService) {}

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => {
      this.data = response as Anime[];
      this.randomImg();
      setInterval(() => this.randomImg(), 15000);
    });
  }

  private randomImg() {

    const img_elements = document.getElementsByClassName("img-fluid") as HTMLCollectionOf<HTMLImageElement>;
    const titulos = document.getElementsByClassName("titulo") as HTMLCollectionOf<HTMLImageElement>;
    const descripciones = document.getElementsByClassName("descript") as HTMLCollectionOf<HTMLImageElement>;
    if (img_elements) {
      for (let i = 0; i < img_elements.length; i++) {
        let index = Math.floor(Math.random() * this.data.length)
        const bg = this.data[index].anime_img;
        const titulo = this.data[index].anime;
        const episodios = this.data[index].episodes;
        img_elements[i].src  = `${bg}`;
        titulos[i].innerHTML  = `${titulo}`;
        descripciones[i].innerHTML = `${episodios} Episodios`;
      }
      //masthead.style.backgroundPosition = `center`;
      //masthead.style.backgroundRepeat = `no-repeat`;
      //masthead.style.backgroundAttachment = `scroll`;
      //masthead.style.backgroundSize = `cover`;
    };
  }



}
