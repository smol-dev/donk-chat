import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

import { DefaultLabelFormatterCallbackParams, EChartsOption } from 'echarts';

@Component({
  selector: 'app-emote-counter',
  templateUrl: './emote-counter.component.html',
  styleUrls: ['./emote-counter.component.scss'],
})
export class EmoteCounterComponent implements OnInit {
  chartOptions?: EChartsOption;

  initOptions = {
    // locale?: string | LocaleOption;
    // renderer?: RendererType;
    // devicePixelRatio?: number;
    // useDirtyRect?: boolean;
    // width?: number;
    height: 600,
  };

  series: [string, number][] = [];

  constructor(public store: StoreService) {
    this.store.series$.subscribe((series) => {
      this.chartOptions = {
        series: [
          {
            type: 'treemap',
            data: series.map((el) => this.mapToTreemapData(el)),
            tooltip: {
              triggerOn: 'click',
              formatter: (params) => this.formatItem(params),
              // (params: T, asyncTicket: string, callback: (cbTicket: string, htmlOrDomNodes: string | HTMLElement | HTMLElement[]) => void): string | HTMLElement | HTMLElement[];
              // }
            },
          },
        ],
      };
    });
  }
  formatItem(
    param: DefaultLabelFormatterCallbackParams
  ): string | HTMLElement | HTMLElement[] {
    // throw new Error('Method not implemented.');
    console.log(param);

    return param.name + '<br>' + param.seriesName;
  }
  mapToTreemapData([name, value]: [string, number]) {
    return { name, value };
  }

  ngOnInit(): void {}
}
