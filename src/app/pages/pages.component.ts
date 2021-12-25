import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <nb-actions size="small">
          <nb-action
            class="control-item"
            icon="email-outline"
            [link]="'donk-chat'"
          ></nb-action>
        </nb-actions>
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
      responsive: true,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
