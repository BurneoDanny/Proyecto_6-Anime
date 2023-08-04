import { Component } from '@angular/core';
import { Anime } from '../interfaces/root';
import { ServiceService } from '../providers/service.service';

import DataTable from 'datatables.net-dt';
import 'datatables.net-bs5';
import Chart from 'chart.js/auto';

//import * as $ from 'jquery';
//import 'bootstrap-table'; // Importa BootstrapTable
//import 'bootstrap-table/dist/extensions/export/bootstrap-table-export'; // Importa la extensión de exportación

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  public data: Anime[] = [];
  public dataWithIndex: Anime[] = [];

  constructor(private dataProvider: ServiceService) {}

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => {
      this.data = response as Anime[];
      this.dataWithIndex = this.data.map((anime, index) => ({
        ...anime,
        index: index + 1,
      }));
      this.initializeTable(this.dataWithIndex);
      this.initializeGraphs(this.dataWithIndex);
    });
  }

  private initializeGraphs(data: Anime[]) {

    // Top 10 Votes Graph

    const top10Vote = data.slice().sort((a, b) => b.votes - a.votes).slice(0, 10);
    const data_mostVotes = {
      labels: top10Vote.map((row) => row.anime),
      datasets: [
        {
          label: 'Top 10 con mas votos',
          data: top10Vote.map((row) => row.votes),
          backgroundColor: '#7da3e8',
          borderWidth: 1,
        },
      ],
    };
    const chart_mostVotes = new Chart(document.getElementById(
      'mostVotes') as HTMLCanvasElement, {
      type: 'bar',
      data: data_mostVotes,
      options: {
        responsive: true,
        interaction: {
          intersect: false,
        },
      },
    });
  }

  private initializeTable(data: Anime[]) {
    const columns = [
      { data: 'index', title: 'Índice' },
      { data: 'anime' },
      { data: 'rate' },
      { data: 'votes' },
    ];
    new DataTable('#tabla', {
      data: data,
      columns: columns,
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

  // Boostrap-table
  // private initializeTable(data: Anime[]) {
  //   const columns = [
  //     { field: 'anime', title: 'Nombre' },
  //     { field: 'rate', title: 'Puntuacion' },
  //     { field: 'votes', title: 'Votos' },
  //   ];
  //   // Inicializar la tabla cuando se obtienen los datos
  //   const $table = $('#table');
  //   $table.bootstrapTable({
  //     data: data,
  //     columns: columns,
  //     search: true,
  //     pagination: true,
  //   });

  //   $table.bootstrapTable('load', data);
  // }
}
