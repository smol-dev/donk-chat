import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { UiEmote } from 'src/app/pages/models/models';

@Component({
  selector: 'app-emote',
  template: `
    <ng-container [ngSwitch]="emote?.type">
      <div *ngSwitchCase="'bttv'">
        <img
          src="https://cdn.betterttv.net/emote/{{ emote?.emote?.id }}/1x"
          [alt]="emote?.name"
        />
      </div>
      <div *ngSwitchCase="'ffz'">ffz output</div>
      <div *ngSwitchCase="'7tv'">
        <img
          src="https://cdn.7tv.app/emote/{{ emote?.emote?.id }}/1x"
          [alt]="emote?.name"
        />
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmoteComponent implements OnInit {
  @Input() emote?: UiEmote;
  constructor() {}

  ngOnInit(): void {}
}
