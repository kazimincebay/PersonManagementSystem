import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { invalid } from 'moment';
import { Auth } from '../models/ui-models/auth.model';
import { Person } from '../models/ui-models/person.model';
import { AuthService } from '../services/auth.service';
import { Personservice } from '../services/person.service';
import { TokenService } from '../services/token.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class DialogComponent implements OnInit {
  //personId: string | number | null | undefined;
  //@Input() Id: number = 0;
  authList: Auth[] = [];
  divdisable = false;
  onayBekleyenDiv = false;
  prevDateError = false;
  nextDateError = false;
  emptyFullName = false;
  emptyTitle = false;
  emptyDate = false;
  personBirthTime: any = new Date();
  disableForm = false;
  isDisabled = true;
  age = 0;
  person: Person = {
    personId: 0,
    personTC: '',
    personFullname: '',
    personTitle: '',
    personBirthTime: '',
    personCompany: '',
    personState: '',
  };
  identityWarning = false;
  ageDisable = false;
  dialogForm = new FormGroup({
    personTC: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.maxLength(11),
    ]),
    personFullname: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    personTitle: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    personCompany: new FormControl(''),
    personBirthTime: new FormControl('', [Validators.required]),
    personState: new FormControl(''),
  });

  constructor(
    private readonly personService: Personservice,
    private readonly tokenService: TokenService,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private readonly cd: ChangeDetectorRef,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { personId: string }
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .getPerson(this.data.personId, success['value'])
            .subscribe(
              (success: any) => {
                this.person = success[0];
                (success);
                (this.person.personBirthTime);
                var date = this.person.personBirthTime.slice(0, 10).split(' ');
                (date);
                var parseDate = date[0].split('/');
                (parseDate);
                var birthDate =
                  parseDate[0] + '/' + parseDate[1] + '/' + parseDate[2];
                this.personBirthTime = new Date(birthDate);

                (this.personBirthTime);
              },
              (error) => {
                ('Veriye Ulaşılamıyor');
              }
            );
        },
        (error: any) => {
          (error);
          // (error["error"]["text"])
        }
      );
    });
    this.tokenService.getToken().subscribe(
      (success: any) => {
        this.authService.getAuthsHepsi(success['value']).subscribe(
          (success) => {
            this.authList = success;
          },
          (error) => {}
        );
      },
      (error: any) => {
        (error);
        // (error["error"]["text"])
      }
    );
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  updatePerson() {
    if (this.dialogForm.invalid) {
      ('başarısız');
    } else {
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .updatePerson(this.person.personId, this.person, success['value'])
            .subscribe(
              (success) => {
                this.matDialog.closeAll();
                this.snackBar.open(
                  'Kullanıcı Başarı İle Güncellendi',
                  undefined,
                  { duration: 2000 }
                );
                window.location.href = '/Person';
              },
              (error) => {}
            );
        },
        (error: any) => {
          (error);
          // (error["error"]["text"])
        }
      );

      (this.person);
    }
  }

  editSelect() {
    this.editInput();
  }

  invalidFrom() {
    this.dialogForm.setErrors({ invalid: true });
    this.disableForm = true;
    return;
  }

  editInput() {
    this.identityWarning = false;
    this.emptyFullName = false;
    this.emptyTitle = false;
    this.onayBekleyenDiv = false;
    this.disableForm = false;
    this.dialogForm.valid;
    this.ageDisable = false;
    this.emptyDate = false;
    if (this.person.personFullname.trim().length == 0) {
      this.emptyFullName = true;
      this.invalidFrom();
      return;
    } else {
      this.emptyFullName = false;
    }
    if (this.dialogForm.controls.personFullname.hasError('pattern')) {
      this.emptyTitle = false;
      this.invalidFrom();
      return;
    }
    if (this.person.personTitle.trim().length == 0) {
      this.emptyTitle = true;
      this.invalidFrom();
      return;
    } else {
      this.emptyTitle = false;
    }
    if (this.dialogForm.controls.personTitle.hasError('pattern')) {
      this.emptyTitle = false;
      this.invalidFrom();
      return;
    }

    (this.personBirthTime);
    (this.personBirthTime.toString().length);
    if (this.personBirthTime.toString().length > 1) {
      var date: any = new Date(this.personBirthTime);
      var thisYear = new Date().getFullYear();

      (date);
      if (date != null && date != '') {
        if (date.toString().length == 45) {
          var birthDate = new Date(this.person.personBirthTime);
          var birthDateString = birthDate.toString().split(' ');
          var birthMonth = "";
          var birthDay = birthDateString[2];
          var birthYear:any = birthDateString[3];

          if (birthDateString[1] != null) {
            if (birthDateString[1] == 'Jan') {
              birthMonth = "01";
            }
            if (birthDateString[1] == 'Feb') {
              birthMonth = "02";
            }
            if (birthDateString[1] == 'Mar') {
              birthMonth = "03";
            }
            if (birthDateString[1] == 'Apr') {
              birthMonth = "04";
            }
            if (birthDateString[1] == 'May') {
              birthMonth = "05";
            }
            if (birthDateString[1] == 'Jun') {
              birthMonth = "06";
            }
            if (birthDateString[1] == 'Jul') {
              birthMonth = "07";
            }
            if (birthDateString[1] == 'Aug') {
              birthMonth = "08";
            }
            if (birthDateString[1] == 'Sep') {
              birthMonth = "09";
            }
            if (birthDateString[1] == 'Oct') {
              birthMonth = "10";
            }
            if (birthDateString[1] == 'Nov') {
              birthMonth = "11";
            }
            if (birthDateString[1] == 'Dec') {
              birthMonth = "12";
            }
            this.age = thisYear - birthYear;
          }

          var currentBirthDate=birthDay + '/' + (birthMonth) + '/' + birthYear;
          (currentBirthDate);
          (birthDate);
          (birthDate.toString().split(' '));
          ('burada');
        }
      }
      if (date['_i'] != null && date['_i'] != '') {
        if (
          date['_i'].toString().length == 15 ||
          date['_i'].toString().length == 10
        ) {
          (date['_i'].toString().length);
          var dateYear: any = date['_i'][2];
          var thisYear = new Date().getFullYear();
          this.age = thisYear - dateYear;

          var year = date['_i']['year'];
          var month = date['_i']['month'];
          var day = date['_i']['date'];
          var dateYear: any = day + '/' + (month + 1) + '/' + year;
          (date);
          (dateYear);
          this.age = thisYear - year;
        }
      }
      (this.age);
      (this.personBirthTime);
      (this.person.personBirthTime.toString().length);

      if (this.age < 18 || this.age > 100 || this.age == NaN) {
        this.ageDisable = true;
        this.invalidFrom();
        return;
      }

      this.disableForm = this.dialogForm.invalid;
    }
  }

  closeDialog() {
    this.matDialog.closeAll();
  }
}
