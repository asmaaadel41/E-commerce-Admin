import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: string[] = [];
  @Input() all: boolean = true;
  @Input() select: string ='';
  @Output() selectedValue;
  constructor() {
    this.selectedValue = new EventEmitter();
  }

  ngOnInit(): void {}
  detectChanges(event: any) {
    this.selectedValue.emit(event);
  }
}
