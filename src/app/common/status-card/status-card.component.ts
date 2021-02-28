import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ChartErrorEvent,
  ChartMouseLeaveEvent,
  ChartMouseOverEvent,
  ChartSelectionChangedEvent,
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

  public charts: {
    title: string;
    type: ChartType;
    data: any[][];
    columns?: Column[];
    options?: {};
  }[] = [];

  public changingChart = {
    title: '',
    type: ChartType.PieChart,
    data: [
      ['Active', 25,],
      ['inActive', 35]
    ],
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

  @ViewChild('chart', { static: true })
  public chart!: GoogleChartComponent;

  constructor(private router: Router) {}

  public onReady() {
    console.log('Chart ready');
  }

  public onError(error: ChartErrorEvent) {
    console.error('Error: ' + error.message.toString());
  }

  public onSelect(event: ChartSelectionChangedEvent) {
    console.log('Selected: ' + event.toString());
  }

  public onMouseEnter(event: ChartMouseOverEvent) {
    console.log('Hovering ' + event.toString());
  }

  public onMouseLeave(event: ChartMouseLeaveEvent) {
    console.log('No longer hovering ' + event.toString());
  }

  public ngOnInit() {
    console.log(this.chart);
  }

  public navigateToTest() {
    this.router.navigateByUrl('/test');
  }


}
