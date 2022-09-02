import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Personservice } from '../services/person.service';
import { Person } from '../models/ui-models/person.model';
import { AuthService } from '../services/auth.service';
import { Auth } from '../models/ui-models/auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OnaybekleyenComponent } from '../onaybekleyen/onaybekleyen.component';
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
  selector: 'app-left-form',
  templateUrl: './left-form.component.html',
  styleUrls: ['./left-form.component.css'],
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
export class LeftFormComponent implements OnInit {
  authList: Auth[] = [];
  prevDateError = false;
  nextDateError = false;
  emptyFullName = false;
  emptyTitle = false;
  divdisable = false;
  disableForm = false;
  ageDisable = false;
  identityWarning = false;
  onayBekleyenDiv = false;
  invalidMessage = false;
  personBirthTime = new Date();
  onayBekleyenListe: any = new Array();
  onayListe: any = new Array();
  isDisabled = true;
  age = 0;
  person: Person = {
    personId: 0,
    personTC: '',
    personFullname: '',
    personTitle: '',
    personCompany: '',
    personBirthTime: '',
    personState: '',
  };

  // editForm: FormGroup;
  editForm = new FormGroup({
    personTC: new FormControl('', [Validators.pattern('^[0-9]*$')]),
    personFullname: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    personTitle: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    personCompany: new FormControl('', [Validators.required]),
    personBirthTime: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
  });
  personT = this.person.personTitle.length;
  constructor(
    private personService: Personservice,
    private tokenService: TokenService,
    private authService: AuthService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
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
        ('Başarısız');
        // (error["error"]["text"])
      }
    );
  }

  editSelect() {
    this.editInput();
  }

  invalidFrom() {
    this.editForm.setErrors({ invalid: true });
    this.disableForm = true;
    return;
  }

  editInput() {
    this.identityWarning = false;
    this.emptyFullName = false;
    this.emptyTitle = false;
    this.onayBekleyenDiv = false;
    this.disableForm = false;
    this.editForm.valid;
    this.ageDisable = false;
    this.invalidMessage = false;
    this.age = 0;
    if (this.person.personTC == null) {
      this.identityWarning = true;
      this.invalidFrom();
      return;
    }
    var personTC = this.person.personTC.toString().length;
    if (personTC != 11) {
      this.identityWarning = true;
      this.invalidFrom();
      return;
    } else {
      //T.C. Kimlik Numarası Kontrol

      var tek =
        Number(this.person.personTC.toString()[0]) +
        Number(this.person.personTC.toString()[2]) +
        Number(this.person.personTC.toString()[4]) +
        Number(this.person.personTC.toString()[6]) +
        Number(this.person.personTC.toString()[8]);
      var cift =
        Number(this.person.personTC.toString()[1]) +
        Number(this.person.personTC.toString()[3]) +
        Number(this.person.personTC.toString()[5]) +
        Number(this.person.personTC.toString()[7]);
      var x7tek = tek * 7;
      var toplam9 = x7tek - cift;
      var rakam10 = Number(toplam9 % 10);
      var toplam10 =
        Number(this.person.personTC.toString()[0]) +
        Number(this.person.personTC.toString()[1]) +
        Number(this.person.personTC.toString()[2]) +
        Number(this.person.personTC.toString()[3]) +
        Number(this.person.personTC.toString()[4]) +
        Number(this.person.personTC.toString()[5]) +
        Number(this.person.personTC.toString()[6]) +
        Number(this.person.personTC.toString()[7]) +
        Number(this.person.personTC.toString()[8]) +
        Number(this.person.personTC.toString()[9]);
      var rakam11 = Number(toplam10 % 10);
      if (
        this.person.personTC.toString()[9] != rakam10.toString() ||
        this.person.personTC.toString()[10] != rakam11.toString()
      ) {
        this.invalidMessage = true;
        this.invalidFrom();
        return;
      }

      (rakam11.toString());
      (toplam10);
      (rakam10.toString());
      (toplam9);
      (x7tek);
      (tek);
      (cift);
      //(this.person.personTC.toString()[0])
      //(typeof this.person.personTC)

      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .getPersonTCOnay(this.person.personTC.toString(), success['value'])
            .subscribe(
              (success: any) => {
                if (success.length == 0) {
                  this.onayBekleyenDiv = false;
                } else {
                  this.onayBekleyenDiv = true;
                  this.invalidFrom();
                  return;
                }
              },
              (error) => {
                ('Başarısız');
                this.onayBekleyenDiv = false;
                this.identityWarning = false;
              }
            );
        },
        (error) => {}
      );
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .getPersonTC(this.person.personTC.toString(), success['value'])
            .subscribe(
              (success: any) => {
                if (success.length == 0) {
                  this.divdisable = false;
                } else {
                  this.divdisable = true;
                  this.invalidFrom();
                  return;
                }
                if ((this.identityWarning = false)) {
                  this.onayBekleyenDiv == true;
                }
              },
              (error) => {
                this.divdisable = false;
              }
            );
        },
        (error: any) => {
          ('Başarısız' + error);
          this.divdisable = false;
        }
      );
    }
    if (this.person.personFullname.trim().length == 0) {
      this.emptyFullName = true;
      this.invalidFrom();
      return;
    } else {
      this.emptyFullName = false;
    }
    if (this.person.personTitle.trim().length == 0) {
      this.emptyTitle = true;
      this.invalidFrom();
      return;
    } else {
      this.emptyTitle = false;
    }
    (this.person.personBirthTime);
    var personbt: any = this.person.personBirthTime;
    if (
      this.person.personBirthTime != '' ||
      this.person.personBirthTime != null ||
      personbt.toString().length > 1
    ) {
      var date: any = this.person.personBirthTime;
      var thisYear = new Date().getFullYear();
      this.personBirthTime = date;
      if (typeof date['_i'] == 'string') {
        (date['_i']);
        if (!date['_i'].includes('/')) {
          (date['_i']);
          (date['_i'].toString().length);

          var slashDay = date['_i'].slice(0, 2);
          var slashmonth = date['_i'].slice(2, 4);
          var slashyear: any = date['_i'].slice(4, 10);
          var slashdate = slashDay + '/' + slashmonth + '/' + slashyear;
          this.age = thisYear - slashyear;
          (slashDay);
          (slashmonth);
          (slashyear);
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

        if (
          date['_i'].toString().length != 15 ||
          date['_i'].toString().length != 10
        ) {
          var thisYear = new Date().getFullYear();
          (date['_i'].toString().length);
          (date['_i']);
          var date = date['_i'];
          (date);
          ('buradayıız');
          (date);
          this.age = thisYear - date['year'];
        }
      }
      if (this.age < 18 || this.age > 100 || this.age == NaN) {
        this.ageDisable = true;
        this.invalidFrom();
        return;
      }
      if (this.person.personBirthTime.toString().length < 1) {
        this.invalidFrom();
        return;
      }
      this.disableForm = this.editForm.invalid;
    }
  }

  onayBekleyenAc() {
    this.matDialog.open(OnaybekleyenComponent, {
      data: { onayListe: this.onayListe },
      disableClose: false,
    });
  }

  addPerson() {
    this.editInput();
    if (this.editForm.valid == true) {
      // this.TClist.push(personTC);
      this.onayBekleyenListe = new Array();
      this.onayBekleyenListe.personTC = this.person.personTC.toString();
      this.onayBekleyenListe.personFullname = this.person.personFullname;
      this.onayBekleyenListe.personTitle = this.person.personTitle;
      this.onayBekleyenListe.personState = '--';
      this.onayBekleyenListe.personCompany = this.person.personCompany;
      var date: any = this.person.personBirthTime;
      (date);
      var getdate = date['_i'];
    (getdate)

      var day = getdate["date"];
      var month =Number( getdate["month"])+1;
      var year = getdate["year"];
      this.onayBekleyenListe.personBirthTime = month + '/' + day + '/' + year;
      (this.onayBekleyenListe.personBirthTime);

      (this.onayBekleyenListe);
      this.onayListe.push(this.onayBekleyenListe);
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .addOnayPerson(this.onayBekleyenListe, success['value'])
            .subscribe(
              (success) => {
                (success);
                this.snackBar.open(
                  'Kullanıcı Başarı İle Eklendi',
                  undefined,
                  { duration: 2000 }
                );
                window.location.href = '/Person';
              },
              (error) => {
                (error);
              }
            );
        },
        (error) => {}
      );
      (this.onayListe);
    } else return;
  }
}
