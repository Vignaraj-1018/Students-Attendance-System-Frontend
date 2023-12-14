import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor() { }

  @Input() labelList:any;
  @Input() dataList:any;


  
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales:{
      yAxes:[
        {
          ticks:{
            beginAtZero:true,
          },
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'bar';
  public lineChartPlugins = [];
  
  ngOnInit() {
    console.log(this.labelList,this.dataList);
    this.showChart();
  }
  
  showChart() {
    this.lineChartData = [
      { 
        data: this.dataList
      }
    ]
    this.lineChartLabels = this.labelList;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.showChart();
  }
}
