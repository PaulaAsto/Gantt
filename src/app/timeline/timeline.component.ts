import { Component } from '@angular/core';

@Component({
  selector: 'timeline-gantt',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})
export class TimelineComponent {
  add(name: string, dad: Number): void {
    name = name.trim();
    
  }
}