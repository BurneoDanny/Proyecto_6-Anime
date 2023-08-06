import { Component } from '@angular/core';
import { ServiceService } from '../providers/service.service';
import { Anime } from '../interfaces/root';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public data: Anime[] = [];
  public top25Animes : Anime[] = [];

  constructor(private dataProvider: ServiceService) {}

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => {
      this.data = response as Anime[];
      this.top25Animes = this.data.sort((a, b) => { return parseInt(a.Rank) - parseInt(b.Rank)}).slice(0, 25);
      this.generator();
    });
  }

  private generator() {
    
    const anime_pic_elements = document.getElementsByClassName('product__item__pic') as HTMLCollectionOf<HTMLImageElement>;
    const epNumber_elements = document.getElementsByClassName('ep') as HTMLCollectionOf<HTMLImageElement>;
    const score_elements = document.getElementsByClassName('score') as HTMLCollectionOf<HTMLImageElement>;
    const scoreBy_elements = document.getElementsByClassName('score_By') as HTMLCollectionOf<HTMLImageElement>;
    const statusTypeList = document.getElementsByClassName('statusType_List') as HTMLCollectionOf<HTMLImageElement>;
    const status_elements = document.getElementsByClassName('status') as HTMLCollectionOf<HTMLImageElement>;
    const name_elements = document.getElementsByClassName('name') as HTMLCollectionOf<HTMLImageElement>;


    for (let i = 0; i < anime_pic_elements.length; i++) {
      let index = Math.floor(Math.random() * this.top25Animes.length);
      const imagen = this.top25Animes[index]['Image URL'];
      const episodio = this.top25Animes[index]["Episodes"];
      const score = this.top25Animes[index]["Score"];
      const score_By = this.top25Animes[index]["Scored By"];
      const name = this.top25Animes[index]["Name"];
      const status = this.top25Animes[index]["Status"];
      const genres = this.top25Animes[index]["Genres"].split(',').map(genre => genre.trim());
      anime_pic_elements[i].style.backgroundImage = `url(${imagen})`;
      epNumber_elements[i].innerHTML = `${episodio}`;
      score_elements[i].innerHTML = `${score}`;
      scoreBy_elements[i].innerHTML = `${score_By}`;
      name_elements[i].innerHTML = `${name}`;
      status_elements[i].innerHTML = `State: ${status}`
      genres.forEach(genre => {
        const genreItemElement = document.createElement('li');
        genreItemElement.textContent = genre;
        statusTypeList[i].appendChild(genreItemElement);
      });

    }

  }

}
