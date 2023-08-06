import { Component } from '@angular/core';
import { ServiceService } from '../providers/service.service';
import { Anime } from '../interfaces/root';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  public data: Anime[] = [];
  public top3Anime : Anime[] = [];

  constructor(private dataProvider: ServiceService) {}

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => {
      this.data = response as Anime[];
      
      this.top3Anime = this.data.sort((a, b) => { return parseInt(a.Rank) - parseInt(b.Rank)}).slice(0, 10);
      this.generator();
    });
  }

  private generator() {
    const img_elements = document.getElementsByClassName('img-fluid') as HTMLCollectionOf<HTMLImageElement>;
    const title_elements = document.getElementsByClassName('titulo') as HTMLCollectionOf<HTMLImageElement>;
    const description_elements = document.getElementsByClassName('descript') as HTMLCollectionOf<HTMLImageElement>;

    for (let i = 0; i < img_elements.length; i++) {
      const bg = this.top3Anime[i]['Image URL'];
      const titulo = this.top3Anime[i]['Name'];
      const episodios = this.top3Anime[i]['Episodes'];
      img_elements[i].src = `${bg}`;
      title_elements[i].innerHTML = `${titulo}`;
      description_elements[i].innerHTML = `${episodios} Episodio(s)`;

    }
  }
  
}
