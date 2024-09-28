import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ModalConfirm } from '../../enum/modal.enum';


@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  public data!: string;

  public accept: ModalConfirm = ModalConfirm.ACCEPT;
  public cancel: ModalConfirm = ModalConfirm.CANCEL;

  constructor( 
    public dialogRef: MatDialogRef<ModalConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,

  ) {
    this.data = message;
  }

  ngOnInit(): void {
  }

  closePopUp( e: string ) {
    this.dialogRef.close(e === this.accept); // this close dialog and emit the value was clicked
  }

}
