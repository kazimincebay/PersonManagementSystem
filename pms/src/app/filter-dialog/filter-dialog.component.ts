import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Auth } from '../models/ui-models/auth.model';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css'],
})
export class FilterDialogComponent implements OnInit {
  authList: Auth[] = [];
  selectState = '--';
  company = '--';
  companyDeger = '--';
  onay: boolean = false;
  red: boolean = false;
  filterDialogForm = new FormGroup({
    search: new FormControl('', [Validators.pattern('^[a-zA-ZığüşöçİĞÜŞÖÇ ]+$')]),
  });
  // @Output() newItemEvent = new EventEmitter<string>();
  constructor(
    private authService: AuthService,
    private readonly tokenService:TokenService,
    private matDialog: MatDialog,
    private dialogRef: MatDialogRef<FilterDialogComponent>
  ) {}

  ngOnInit(): void {
    this.tokenService.getToken().subscribe(
      (success:any) => {
        this.authService.getAuths(success["value"]).subscribe(
          (success) => {
            this.authList = success;
          },
          (error) => {}
        );

      },
      (error:any) => {
        ("Başarısız");
        // (error["error"]["text"])
      }
    );

  }

  redState() {
    if (this.red == false) {
      this.red = true;
      (this.red);
    }
    else if (this.red == true) {
      this.red = false;
      (this.red);
    }
  }

  onayRedState(value : string) {
    (value);
    if (value == "1") {
      this.selectState = 'Onaylandı'
    }
    else if (value == "2") {
      this.selectState = 'Reddedildi';
    }
    else if (value == "3") {
      this.selectState = '--';
    }
    (this.selectState);
  }
  // onayselect() {
  //   this.selectState = 'Onaylandı';
  // }

  // redSelect() {
  //   this.selectState = 'Reddedildi';
  // }
  addNewItem(value: string) {
    let data = {
      search: value,
      company: this.company,
      companyDeger: this.companyDeger,
      selectstate: this.selectState,
    };
    this.dialogRef.close({ data });

  }

closeDialog() {
  this.matDialog.closeAll();
}

  changeSelect(value: any) {
    this.company = value.company;
    (this.company)
    this.companyDeger = value.authDeger;
    (this.companyDeger)

  }
}
