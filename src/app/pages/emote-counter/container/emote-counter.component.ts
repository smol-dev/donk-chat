import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Color, ScaleType, DataItem } from '@swimlane/ngx-charts';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-emote-counter',
  templateUrl: './emote-counter.component.html',
  styleUrls: ['./emote-counter.component.scss'],
})
export class EmoteCounterComponent implements OnInit {
  @ViewChild('container', { static: true })
  container?: ElementRef<HTMLElement>;

  view: [number, number] = [1800, 800];

  // options
  gradient: boolean = false;
  animations: boolean = true;

  // colorScheme: Color = {
  //   name: 'wicked',
  //   selectable: true,
  //   group: ScaleType.Ordinal,
  //   domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  // };

  series?: DataItem[];

  constructor(public store: StoreService) {
    fromEvent(window, 'resize').subscribe(() => this.onWindowResize());

    this.store.series$
      .pipe(map((data) => this.mapSeries(data)))
      .subscribe((series: DataItem[]) => {
        this.series = series.slice(0, 20);
      });
  }

  onWindowResize(): void {
    this.view = [
      this.container?.nativeElement.clientWidth ?? 800,
      this.container?.nativeElement.clientHeight ?? 800,
    ];
  }
  mapSeries(series: [string, number][]): DataItem[] {
    return series.map((el) => this.mapToTreemapData(el));
  }

  labelFormatting(item: { data: DataItem; label: string; value: number }) {
    // return 'asdasd'
    return `<img src="${item.data.extra.url}" />`;
  }

  onSelect(event: any) {
    console.log(event);
  }

  mapToTreemapData([name, value]: [string, number]) {
    return { name, value, extra: { url: this.getEmoteUrl(name) } };
  }

  getEmoteUrl(emoteStr: string): string {
    const { emote, type } = this.store.getEmote(emoteStr);
    if (emote)
      switch (type) {
        case 'bttv':
          return `https://cdn.betterttv.net/emote/${emote.id}/1x`;
        case 'ffz':
          return `https://cdn.frankerfacez.com/emote/${emote.id}/1`;
        case '7tv':
          return `https://cdn.7tv.app/emote/${emote.id}/1x`;
      }

    return '';
  }

  ngOnInit(): void {
    this.onWindowResize();
  }
}
