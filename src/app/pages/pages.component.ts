import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <h2>Helo</h2>
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
  constructor() {}

  ngOnInit(): void {}
}
