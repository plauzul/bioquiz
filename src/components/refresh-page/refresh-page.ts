import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'refresh-page',
  templateUrl: 'refresh-page.html'
})
export class RefreshPage {

  @Input("message-button") messageButton;
  @Input() message;
  @Input() icon;
  @Output() reload = new EventEmitter();

  reloaded() {
    this.reload.emit(true);
  }

}
