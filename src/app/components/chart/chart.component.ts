import { Component, Input, SimpleChanges } from '@angular/core';
import { CanvasJS, CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import 'zone.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {


  @Input() chartData: any;

  chart: any;
  
  ngOnInit(){
    this.showChart();
  }

  ngOnChanges(changes: SimpleChanges){
    this.showChart();
  }

  showChart(){
    if(!this.chartData){
      return;
    }
    this.chart = new CanvasJS.Chart("chartContainer", {
      axisY:{
        includeZero: true,
        maximum: 100
      },
      data: [              
      {
        type: "column",
        dataPoints: this.chartData
      }
      ]
    });
    this.chart.render();
  }


}
