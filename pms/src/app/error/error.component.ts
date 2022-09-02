import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
personTC=this.data.personTC;
  constructor(private matDialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data: { personTC: string }) { }

  ngOnInit(): void {
  }

    onClose(){
      this.matDialog.closeAll();
    }
}
