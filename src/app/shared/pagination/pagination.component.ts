import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() total: number = 0;
  @Input() factor: number = 2;
  @Output() offsetEmitter: EventEmitter<number> = new EventEmitter<number>();

  // Offsets will be emitted
  public arrOffsets: number[] = [];

  // This + 1 = pages
  public rangeOffsets: number = 0;

  // Case total products is multiple of factor
  public rest!: number;

  // Square pages in frontend
  public pages: number = 0;
  public arrPages: number[] = [];

  public activePage: number = 1;

  constructor() {}

  ngOnInit(): void {

    this.calculatePagination();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['total'] && !changes['total'].firstChange) {
      // If 'total' input changes after the first change, recalculate pagination
      this.calculatePagination();
    }
  }

  public calculatePagination(): void {

    // Clean previous pagination to avoid duplicated rectangular pagination div at frontend
    this.arrOffsets = [];
    this.pages = 0;
    this.arrPages = [];
    this.activePage = 1;

    // Ppal logic control of Pagination
    this.rest = this.total % this.factor;
    this.rangeOffsets = Math.floor(this.total / this.factor);
    this.pages = this.rest === 0 
      ? this.rangeOffsets
      : this.rangeOffsets + 1;

    // it will create the offsets that will be the output of one page click
    for (let i = 0; i < this.pages; i++) {
      this.arrOffsets.push(i * this.factor);
      this.arrPages.push(i + 1);
    };

  }

  public changePage(i: number) {
    this.activePage = i;
    this.offsetEmitter.emit(this.arrOffsets[i - 1]);
  }

}
