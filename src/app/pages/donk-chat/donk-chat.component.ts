import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbAutocompleteComponent } from '@nebular/theme';
import { Observable, of, map } from 'rxjs';
import { TwitchService } from './services/twitch.service';

@Component({
  selector: 'app-donk-chat',
  templateUrl: './donk-chat.component.html',
})
export class DonkChatComponent implements OnInit {
  options: string[] = [];
  filteredOptions$?: Observable<string[]>;

  @ViewChild('autoInput') input?: ElementRef;
  constructor(private svc: TwitchService) {}

  ngOnInit() {
    // this.svc.getUser('pokelawls').subscribe(console.debug);

    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredOptions$ = of(this.options);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) =>
      optionValue.toLowerCase().includes(filterValue)
    );
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(map((filterString) => this.filter(filterString)));
  }

  onChange(): void {
    this.filteredOptions$ = this.getFilteredOptions(
      this.input?.nativeElement.value
    );
  }

  onSelectionChange($event: string): void {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }
}
