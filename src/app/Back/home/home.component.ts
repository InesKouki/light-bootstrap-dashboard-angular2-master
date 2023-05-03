import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Stats } from '../_models/stats.model';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EventService } from '../_services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {
  private roles: string[] = [];
  isLoggedIn = false;
  stats:Stats=new Stats;
  events:any;
  percentage:number;
  ActivEvent:any;
  public pieChartType: ChartType = "pie";

  @ViewChild("myDiv") divView: ElementRef;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  
  constructor(
    private eventService: EventService,) { }
 

  public pieChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  public labels: string[] = ["Active Events", "All Events"];
  public pieChartData: ChartDataset[] = [{ 
    data: [0, 0],
    backgroundColor:['#1E90FF','#E97451'],
    hoverBackgroundColor: ['#6495ED', '#FAC898'],
    hoverBorderColor : ['#6495ED', '#FAC898']
  }];

  ngAfterViewInit(): void {
    this.divView.nativeElement.scrollIntoView();
  }
  getEvents() {
    this.eventService.getActiveEvents().subscribe((data: any) => {
      this.events=data;
      return data;
      });
  }

  ngOnInit(): void {
    this.getEvents();
    this.getStats();
  }
    
  refresh(): void {
    window.location.reload();
  }
  
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
  }
  
  getStats() {
    this.eventService.getStatistics().subscribe((data: any) => {
      this.stats=data;
      this.percentage=(data.ActivEvent/data.totalEvent)*100;
      this.ActivEvent=this.stats.totalEvent-this.stats.ActivEvent;
      this.pieChartData[0].data = [this.stats.totalEvent, this.ActivEvent];
      this.chart.update();
      });
  }
}
