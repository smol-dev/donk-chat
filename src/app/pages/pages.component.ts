import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <div fxLayout="row" fxFill fxLayoutAlign="space-between center">
          <nb-actions size="small">
            <nb-action *ngFor="let tab of tabs"
              class="control-item"
              [icon]="tab.icon"
              [link]="tab.route"
            ></nb-action>
          </nb-actions>

          <nb-search type="modal-zoomin"></nb-search>
        </div>
      </nb-layout-header>

      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <!-- Insert footer here -->
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class PagesComponent implements OnInit {
  tabs = [
    {
      title: 'donk-chat',
      route: '/pages/donk-chat',
      icon: 'message-circle-outline',
    },
    {
      title: 'emote-counter',
      route: '/pages/emote-counter',
      icon: 'message-circle-outline',
    },
  ];

  ngOnInit(): void {}
}
