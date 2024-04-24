import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  backgroundColor: string[]=[];

  constructor() { }

  @Input() labelList:any;
  @Input() dataList:any;

  backgroundColorTemplate = {'0-75':'#f75050','76-100':'#5252eb'};

  
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
  public lineChartColors: Color[] = [];
  public lineChartLegend = false;
  public lineChartType = 'bar';
  public lineChartPlugins = [];
  
  ngOnInit() {
    // console.log(this.labelList,this.dataList);
    this.showChart();
  }
  
  showChart() {
    this.backgroundColor = [];
    this.dataList.forEach(element => {
      if(parseInt(element)>=75){
        this.backgroundColor.push(this.backgroundColorTemplate['76-100'])
      }
      else{
        this.backgroundColor.push(this.backgroundColorTemplate['0-75'])
      }
    });
    this.lineChartData = [
      { 
        data: this.dataList
      }
    ]
    this.lineChartLabels = this.labelList;
    this.lineChartColors=[
      {
        borderColor: 'black',
        backgroundColor: this.backgroundColor,
      },
    ]
  }
  ngOnChanges(changes: SimpleChanges) {
    this.showChart();
  }
}
