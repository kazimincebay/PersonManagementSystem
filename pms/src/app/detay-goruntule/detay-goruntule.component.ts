import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Personservice } from '../services/person.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-detay-goruntule',
  templateUrl: './detay-goruntule.component.html',
  styleUrls: ['./detay-goruntule.component.css']
})
export class DetayGoruntuleComponent implements OnInit {
  veriliListe: any = [];
  constructor(private personService:Personservice,private tokenService:TokenService,private matDialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data: { personId: string }) { }

  ngOnInit(): void {
    this.tokenService.getToken().subscribe(
      (success:any) => {
        this.personService.getPerson(this.data.personId,success["value"]).subscribe(
          (success:any) => {
            this.veriliListe=success[0];
            (this.veriliListe)
          },
          (error) => {
            ('Veriye Ulaşılamıyor');
          }
        );

      },
      (error) => {
        (error);
        // (error["error"]["text"])
      }
    );



  }

  detayKapat(){
    this.matDialog.closeAll();
  }

}
