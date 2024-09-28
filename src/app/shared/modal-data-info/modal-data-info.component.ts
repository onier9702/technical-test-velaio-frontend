import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IPerson } from '../../interfaces/person.interface';

@Component({
  selector: 'app-modal-data-info',
  standalone: true,
  imports: [
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-data-info.component.html',
  styleUrls: ['./modal-data-info.component.scss']
})
export class ModalDataInfoComponent implements OnInit {

  public data: IPerson[];

  constructor( 
    public dialogRef: MatDialogRef<ModalDataInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataPassed: IPerson[],

  ) {
    this.data = dataPassed;
  }

  ngOnInit(): void {}

  closePopUp() {
    this.dialogRef.close();
  }

}
