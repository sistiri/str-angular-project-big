import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ChartType,
  Column,
  GoogleChartComponent
} from 'angular-google-charts';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styles: [':host > *:not(h1) { display: inline-block !important; }']
})
export class StatusCardComponent implements OnInit {

  @Input()
  cardClass: string = 'card-header-warning';

  @Input()
  title?: string;

  @Input()
  data: any[][] = [];

  @Input()
  colors: string[] = [];

  public charts: {
    title: string;
    type: ChartType;
    data: any[][];
    columns?: Column[];
    options?: {};
    colors: string[];
  }[] = [];

  public changingChart = {
    title: '',
    type: ChartType.PieChart,
    data: [],
    columns: ['Element', 'Density'],
    options: {
      animation: {
        duration: 250,
        easing: 'ease-in-out',
        startup: true,
      },
      colors: ['#49A54D', '#FB8E03']
    }
  };

  @ViewChild('chart', { static: false })
  public chart!: GoogleChartComponent;

  constructor(private router: Router) {}


  ngOnInit(): void {
    this.changingChart.options.colors = this.colors;
    console.log(this.chart);
  }




}
