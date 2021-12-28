import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-emote-counter',
  templateUrl: './emote-counter.component.html',
  styleUrls: ['./emote-counter.component.scss'],
})
export class EmoteCounterComponent implements OnInit {
  chartOptions?: EChartsOption;

  series: [string, number][] = [];

  constructor(public store: StoreService) {
    this.store.series$.subscribe((series) => {
      // this.series = series;
      this.chartOptions = {
        xAxis: {
          type: 'category',
          data: series.map((el) => el[0]),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: series.map((el) => el[1]),
            type: 'bar',
          },
        ],
      };
    });
  }

  ngOnInit(): void {}
}
