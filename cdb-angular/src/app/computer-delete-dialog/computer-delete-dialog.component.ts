import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-computer-delete-dialog',
  templateUrl: './computer-delete-dialog.component.html',
  styleUrls: ['./computer-delete-dialog.component.scss']
})
export class ComputerDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ComputerDeleteDialogComponent>) {}

    onNoClick(): void {
      this.dialogRef.close(false);
    }
    closeOk(): void {
      this.dialogRef.close(true);
    }

}
