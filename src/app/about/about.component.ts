import { Component } from '@angular/core';
import { Anime } from '../interfaces/root';
import { ServiceService } from '../providers/service.service';

import 'datatables.net-bs5';
import { Chart } from 'chart.js/auto';
import DataTable, { Api } from 'datatables.net-bs5';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  public data: Anime[] = [];

  constructor(private dataProvider: ServiceService) {}

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => {
      this.data = response as Anime[];
      this.initializeTable(this.data);
      this.initializeGraphs(this.data);
    });
  }

  private initializeTable(data: Anime[]) {
    const columns = [
      { data: 'Popularity' },
      { data: 'Name' },
      { data: 'Score' },
      { data: 'Scored By' },
    ];
    const table = new DataTable('#tabla', {
      data: data,
      columns: columns,
      columnDefs: [{ className: 'centered', targets: [0, 1, 2, 3] }],
      pageLength: 10,
      language: {
        lengthMenu: 'Mostrar _MENU_ registros por página',
        info: 'Mostrando de _START_ a _END_ de un total de _TOTAL_ registros',
        search: 'Buscar:',
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior',
        },
      },
    });
  }

  private initializeGraphs(data: Anime[]) {
    // Top 10 Votes Graph
    const top10Voted = data
    .slice()
    .sort((a, b) => parseInt(b['Scored By']) - parseInt(a['Scored By']))
    .slice(0, 10);
    const data_mostVotes = {
      labels: top10Voted.map((row) => row.Name),
      datasets: [
        {
          label: 'Los mas votos',
          data: top10Voted.map((row) => row['Scored By']),
          backgroundColor: '#7da3e8',
          borderWidth: 1,
        },
      ],
    };
    const chart_mostVotes = new Chart(
      document.getElementById('mostVotes') as HTMLCanvasElement,
      {
        type: 'bar',
        data: data_mostVotes,
        options: {
          responsive: true,
          interaction: {
            intersect: false,
          },
        },
      }
    );

    // chart_Votes
    const top10Anime = data
      .slice()
      .sort((a, b) => parseInt(a['Rank']) - parseInt(b['Rank']))
      .slice(0, 10);
    const dataset = {
      labels: top10Anime.map((row) => row["Name"]),
      datasets: [
        {
          label: "Top 10 Animes",
          data: top10Anime.map((row) => row['Score']),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    const chart_ratingPopularity = new Chart(
      document.getElementById('bestAnimes') as HTMLCanvasElement,
      {
        type: 'line',
        data: dataset,
        options: {}
        
      });

  }
}
