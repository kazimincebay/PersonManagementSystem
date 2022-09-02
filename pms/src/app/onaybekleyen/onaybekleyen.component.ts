import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Personservice } from '../services/person.service';
import { TokenService } from '../services/token.service';
@Component({
  selector: 'app-onaybekleyen',
  templateUrl: './onaybekleyen.component.html',
  styleUrls: ['./onaybekleyen.component.css'],
})
export class OnaybekleyenComponent implements OnInit {
  gelenListe: any = [];
  divDisable = false;

  constructor(
    private readonly personService: Personservice,
    private readonly tokenService: TokenService,
    private matdialog: MatDialog,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.tokenService.getToken().subscribe(
      (success: any) => {
        var token = success['value'];
        this.personService.getPersonsOnay(success['value']).subscribe(
          (success) => {
            (success);
            var person = success;
            for (let i = 0; i < success.length; i++) {
              this.gelenListe[i] = person[i];
              (success);
              (this.gelenListe);
            }
          },
          (error) => {}
        );
      },
      (error) => {}
    );

    // for (let i = 0; i < this.gelenListe.length; i++) {
    //   var liste: any = new Array();

    //   liste.personTC = this.gelenListe[i]['personTC'].toString();
    //   liste.personFullname = this.gelenListe[i]['personFullname'].toString();
    //   liste.personTitle = this.gelenListe[i]['personTitle'].toString();
    //   liste.personState = this.gelenListe[i]['personState'].toString();
    //   liste.personCompany = this.gelenListe[i]['personCompany'].toString();
    //   liste.personBirthTime = this.gelenListe[i]['personBirthTime'].toString();

    //   (liste.personBirthTime);
    //   this.veriliListe.push(liste);
    //   (this.veriliListe);
    //   //this.liste = this.bosListe;
    // }
    // (this.veriliListe);
  }

  addPerson() {
    this.divDisable=false;
    this.tokenService.getToken().subscribe(
      (success: any) => {
        var token=success["value"]
        for (let i = 0; i < this.gelenListe.length; i++) {

            var personTC = this.gelenListe[i]['personTC'].toString();
            this.personService
              .getPersonTCOnay(this.gelenListe[i]['personTC'], success['value'])
              .subscribe(
                (success: any) => {
                  if (success.includes(personTC)) {
                    this.snackBar.open("Kullanıcı Kaydedilemedi",undefined,{
                      duration:2000
                    });
                  } else if(this.gelenListe[i]['personState']!="--") {
                    this.personService
                      .addOnayNormalPerson(this.gelenListe[i], token)
                      .subscribe(
                        (success) => {
                          this.snackBar.open("Kullanıcı Başarı İle Kaydedildi",undefined,{
                            duration:2000
                          });
                          window.location.href = '/Person';
                        },
                        (error) => {
                          (error);
                        }
                      );
                  }else{
                    this.divDisable=true;
                  }
                },
                (error) => {}
              );

              }},

      (error) => {
        (error);
        // (error["error"]["text"])
      }
    );
  }

  // onayRed(e: any) {
  //   (e);
  //   if (e['checked'] == true) {
  //     for (let i = 0; i < this.veriliListe.length; i++) {
  //       if (this.veriliListe[i]['personTC'] === e['source']['name']) {
  //         (this.veriliListe[i]['personTC']);
  //         (this.veriliListe[i]['personState']);
  //         (this.veriliListe);
  //         this.veriliListe[i]['personState'] = 'Onaylandı';
  //       }
  //     }
  //   }
  // }

  onay(e: any) {
    for (let i = 0; i < this.gelenListe.length; i++) {
      if (this.gelenListe[i]['personTC'] === e.value) {
        this.gelenListe[i]['personState'] = 'Onaylandı';
        (this.gelenListe);
      }
      this.divDisable = false;
    }
  }
  red(e: any) {
    for (let i = 0; i < this.gelenListe.length; i++) {
      if (this.gelenListe[i]['personTC'] === e.value) {
        this.gelenListe[i]['personState'] = 'Reddedildi';
        (this.gelenListe);
      }
      this.divDisable = false;
    }
  }
}
