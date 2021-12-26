import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatClient } from '@twurple/chat';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiEmote } from '../models/models';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'page-donk-chat',
  templateUrl: './donk-chat.component.html',
})
export class DonkChatComponent implements OnInit {
  chatClient = new ChatClient();
  emote?: UiEmote;
  options: string[] = [];
  filteredOptions$?: Observable<string[]>;
  @ViewChild('autoInput') input!: ElementRef;
  searchEmote = '';

  constructor(public store: StoreService) {
    this.store.streamer$.subscribe((streamer) => {
      if (streamer?.name)
        this.chatClient = new ChatClient({
          channels: [streamer?.name],
        });
    });

    this.store.emoteMap$.subscribe((emoteMap) => {
      this.options = Array.from(emoteMap.keys());
      this.filteredOptions$ = of(this.options);
    });
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) =>
      optionValue.toLowerCase().includes(filterValue)
    );
  }
  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(
      this.input.nativeElement.value
    );
  }

  onSelectionChange($event: string) {
    this.searchEmote = $event;
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(map((filterString) => this.filter(filterString)));
  }
  getEmote(): void {
    this.emote = this.store.getEmote(this.searchEmote) ?? ({} as UiEmote);
  }

  ngOnInit() {}
}
