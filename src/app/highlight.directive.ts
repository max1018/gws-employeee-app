import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

@Directive({ selector: '[highlight]' })
/** Highlight the attached element in gold */
export class HighlightDirective implements OnChanges {
  constructor(private el: ElementRef) {

  }
  @Input('highlight') isHighlighted: boolean = false;

  ngOnChanges(changes) {
    if (changes.isHighlighted) {
      this.highlight();
    }
  }

  private highlight() {
    if (this.isHighlighted) {
      this.el.nativeElement.style.backgroundColor = 'gold';
    } else {
      this.el.nativeElement.style.backgroundColor = 'white';
    }
    console.log(`* AppRoot highlight called for ${this.el.nativeElement.tagName}`);
  }
}