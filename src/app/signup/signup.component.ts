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
  public displayedAnimes: Anime[] = [];
  public processedGenres: string[][] = [];

  constructor(private dataProvider: ServiceService) {}

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => {
      this.data = response as Anime[];
      this.randomizeDisplayedAnimes(this.data);

    });
  }

  private randomizeDisplayedAnimes(data: Anime[]) {
    const top25Animes = data.sort((a, b) => { return parseInt(a.Rank) - parseInt(b.Rank)}).slice(0, 25);
    const shuffledAnimes = top25Animes.sort(() => Math.random() - 0.5);
    this.displayedAnimes = shuffledAnimes.slice(0, 6);

  }
  
  getGenres(anime: Anime): string[] {
    return anime.Genres.split(',').map(genre => genre.trim());
  }


}
