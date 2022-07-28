import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Output() dismiss = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  dismissPopover() {
    this.dismiss.emit();
  }

}
