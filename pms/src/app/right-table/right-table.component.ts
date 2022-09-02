import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Person } from '../models/ui-models/person.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Personservice } from '../services/person.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { DetayGoruntuleComponent } from '../detay-goruntule/detay-goruntule.component';
import { TokenService } from '../services/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-right-table',
  templateUrl: './right-table.component.html',
  styleUrls: ['./right-table.component.css'],
})
export class RightTableComponent implements OnInit {
  //@Output() parentId=new EventEmitter<Number>();;

  persons: Person[] = [];
  displayedColumns: string[] = [
    'personFullname',
    'personTitle',
    'personState',
    'personEdit',
    'personDelete',
  ];
  dataSource = new MatTableDataSource<Person>();
  emptyDataSource = new MatTableDataSource<Person>();
  //@ViewChild(DialogComponent) dialog!: DialogComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterString: string = '';
  isEditDisabled: boolean = false;
  isDeleteDisabled: boolean = false;
  personList = new Array();
  personStateList = new Array();
  personOnayList = new Array();
  personRedList = new Array();
  items = new Array<string>();
  search = '';
  company = '';
  selectState = '';
  searchh = false;
  companyy = false;
  selectStateCompany = false;
  selectStateSearch = false;
  selectSearchCompany = false;
  selectStatee = false;
  deneme: any = '';
  all = false;
  full = false;
  auth: number = 0;
  parentId: number = 0;
  dataList: any = new Array();
  bosList = new Array();
  constructor(
    private personService: Personservice,
    private tokenService: TokenService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar /*,private dialogRef: MatDialogRef<FilterDialogComponent>*/
  ) {}

  ngOnInit(): void {
    this.tokenService.getToken().subscribe(
      (success: any) => {
        this.personService.getPersons(success['value']).subscribe(
          (success) => {
            this.persons = success;
            this.dataSource = new MatTableDataSource<Person>(this.persons);
            this.dataSource.paginator = this.paginator;
          },
          (err) => {
            ('başarısız');
          }
        );
      },
      (error) => {
        error;
        // (error["error"]["text"])
      }
    );
  }

  listPerson() {
    this.selectStatee = false;
    this.full = false;
    this.selectStateCompany = false;
    this.selectStateSearch = false;

    this.selectSearchCompany = false;
    this.searchh = false;
    this.companyy = false;
    this.all = false;
    this.tokenService.getToken().subscribe(
      (success: any) => {
        this.personService.getPersons(success['value']).subscribe(
          (success) => {
            this.persons = success;
            this.dataSource = new MatTableDataSource<Person>(this.persons);
            this.dataSource.paginator = this.paginator;
          },
          (err) => {
            ('başarısız');
          }
        );
      },
      (error) => {
        error;
        // (error["error"]["text"])
      }
    );
  }

  // filterPerson(value:string) {
  //     this.dataSource.filter = value.trim().toLocaleLowerCase();
  // }

  detayGoruntule(personId: number) {
    this.matDialog.open(DetayGoruntuleComponent, {
      data: { personId: personId },
      disableClose: true,
    });
  }
  editButtonClick(personId: number) {
    //this.router.navigate(['/Person/',personId]);
    // this.matDialog.open(DialogComponent);
    //this.dialog.open();
    this.matDialog.open(DialogComponent, {
      data: { personId: personId },
      disableClose: true,
    });
  }

  deleteButtonClick(personId: number) {
    this.tokenService.getToken().subscribe(
      (success: any) => {
        var token = success['value'];
        this.personService.getPerson(personId, success['value']).subscribe(
          (success: any) => {
            var personFullname = success[0]['personFullname'];
            personFullname(success);
            this.personService.deletePerson(personId, token).subscribe(
              (success) => {
                this.snackBar.open(
                  personFullname + ' Kullanıcısı Başarı İle Silindi',
                  undefined,
                  { duration: 4000 }
                );
                window.location.href = '/Person';
              },
              (error) => {}
            );
          },
          (error) => {
            ('Veriye Ulaşılamıyor');
          }
        );
      },
      (error) => {
        error;
        // (error["error"]["text"])
      }
    );
  }

  filterDialogOpen() {
    const dialogRef = this.matDialog.open(FilterDialogComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((res) => {
      // Receive data from dialog component
      // res contains data sent from the dialog
      this.full = false;
      this.dataList = res;
      console.log(this.dataList);
      if (this.dataList != undefined) {
        var search = res['data']['search'];
        var company = res['data']['company'];
        var companyDeger = res['data']['companyDeger'];
        var selectState = res['data']['selectstate'];
        this.search = search;
        this.company = company;
        this.selectState = selectState;
        this.full = false;
        console.log(this.dataList);
      }
      this.filterMethod(search, company, selectState, companyDeger);

      if (search == '' && selectState == '--' && company == '--') {
        this.searchh = false;
        this.selectStateSearch = false;
        this.selectStateCompany = false;
        this.full = false;
        this.companyy = false;
        this.selectStatee = false;
        this.selectSearchCompany = false;
        this.all = false;
      }else if (
        search == undefined ||
        company == undefined ||
        selectState == undefined ||
        companyDeger == undefined
      ) {
        this.searchh = false;
        this.selectStateSearch = false;
        this.selectStateCompany = false;
        this.full = false;
        this.companyy = false;
        this.selectStatee = false;
        this.selectSearchCompany = false;
        this.all = false;
      }
      else if (search != '' && selectState == '--' && company == '--') {
        this.searchh = true;
        this.selectStateSearch = false;
        this.selectStateCompany = false;
        this.full = false;
        this.companyy = false;
        this.selectStatee = false;
        this.selectSearchCompany = false;
        this.all = false;
      } else if (company != '--' && search == '' && selectState == '--') {
        this.selectStateSearch = false;
        this.selectSearchCompany = false;
        this.selectStateCompany = false;
        this.searchh = false;
        this.companyy = true;
        this.selectStatee = false;
        this.all = false;
        this.full = false;
      } else if (selectState != '--' && company == '--' && search == '') {
        this.selectStatee = true;
        this.full = false;
        this.selectStateCompany = false;
        this.selectStateSearch = false;
        this.searchh = false;
        this.companyy = false;
        this.all = false;
      } else if (selectState == '--' && company == '--' && search == '') {
        this.selectStatee = false;
        this.full = false;
        this.selectStateCompany = false;
        this.selectStateSearch = false;
        this.selectSearchCompany = false;
        this.searchh = false;
        this.companyy = false;
        this.all = true;
      } else if (selectState == '--' && company != '--' && search == '') {
        this.selectStatee = false;
        this.companyy = true;
        this.all = false;
        this.selectStateSearch = true;
        this.selectSearchCompany = false;
        this.selectStateCompany = false;
        this.searchh = false;

        this.full = false;
      } else if (search != '' && company != '--' && selectState != '--') {
        this.full = true;
        this.selectSearchCompany = false;
        this.companyy = false;
        this.selectSearchCompany = false;
        this.searchh = false;
        this.selectStateCompany = false;
        this.selectStateSearch = false;
        this.all = false;

        this.selectStatee = false;
      } else if (search != '' && company == '--' && selectState != '--') {
        this.selectStateSearch = true;
        this.selectSearchCompany = false;
        this.selectStateCompany = false;
        this.searchh = false;
        this.companyy = false;
        this.selectStatee = false;
        this.all = false;
        this.full = false;
      } else if (search == '' && company != '--' && selectState != '--') {
        this.selectStateCompany = true;
        this.selectStateSearch = false;
        this.selectSearchCompany = false;
        this.companyy = false;
        this.searchh = false;
        this.selectStatee = false;
        this.full = false;
        this.all = false;
      } else if (search != '' && company != '--' && selectState == '--') {
        this.selectStateCompany = false;
        this.selectStateSearch = false;
        this.selectSearchCompany = true;
        this.companyy = false;
        this.searchh = false;
        this.selectStatee = false;
        this.full = false;
        this.all = false;
      }
    });
  }

  filterMethod(value: any, value2: any, value3: any, value4: any) {
    if (value == '' && value2 == '--' && value3 == '--') {
      //hepsi boş
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService.getPersons(success['value']).subscribe(
            (success) => {
              this.persons = success;
              this.dataSource = new MatTableDataSource<Person>(this.persons);
              this.dataSource.paginator = this.paginator;
            },
            (err) => {
              ('başarısız');
            }
          );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value != '' && value2 == 'Hepsi' && value3 == '--') {
      //arama boş değil firma boş durum boş
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService.getPersonSearch(value, success['value']).subscribe(
            (success) => {
              this.isEditDisabled = false;
              this.isDeleteDisabled = false;
              success;
              this.persons = success;
              this.dataSource = new MatTableDataSource<Person>(this.persons);
              this.dataSource.paginator = this.paginator;
            },
            (err) => {
              ('başarısız');
              err;
            }
          );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value != '' && value2 != '--' && value3 == '--') {
      //arama boş değil firma boş değil durum boş

      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .getPersonSearchC(value, value2, success['value'])
            .subscribe(
              (success) => {
                this.persons = success;
                this.dataSource = new MatTableDataSource<Person>(this.persons);
                this.dataSource.paginator = this.paginator;
              },
              (error) => {}
            );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value != '' && value2 == 'Hepsi' && value3 == 'Onaylandı') {
      //arama boş değil firma boş değil durum onaylandı

      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .getPersonSS(value, value3, success['value'])
            .subscribe(
              (success) => {
                success;
                value;
                value2;
                value3;
                if (value4 == 0) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 1) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 2) {
                  this.isDeleteDisabled = true;
                  this.isEditDisabled = false;
                }
                if (value4 == 3) {
                  this.isEditDisabled = true;
                  this.isDeleteDisabled = false;
                }
                this.dataSource.data = success;
                this.dataSource.data;
              },
              (error) => {
                error;
              }
            );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value != '' && value2 != '--' && value3 == 'Onaylandı') {
      //arama boş değil firma boş değil durum onaylandı

      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .getPersonFullFilter(value, value2, value3, success['value'])
            .subscribe(
              (success) => {
                success;
                value;
                value2;
                value3;
                if (value4 == 0) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 1) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 2) {
                  this.isDeleteDisabled = true;
                  this.isEditDisabled = false;
                }
                if (value4 == 3) {
                  this.isEditDisabled = true;
                  this.isDeleteDisabled = false;
                }
                this.dataSource.data = success;
                this.dataSource.data;
              },
              (error) => {
                error;
              }
            );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value != '' && value2 == 'Hepsi' && value3 == 'Reddedildi') {
      //arama boş değil firma boş değil durum Reddedildi

      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .getPersonSS(value, value3, success['value'])
            .subscribe(
              (success) => {
                success;
                value;
                value2;
                value3;
                if (value4 == 0) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 1) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 2) {
                  this.isDeleteDisabled = true;
                  this.isEditDisabled = false;
                }
                if (value4 == 3) {
                  this.isEditDisabled = true;
                  this.isDeleteDisabled = false;
                }
                this.dataSource.data = success;
                this.dataSource.data;
              },
              (error) => {
                error;
              }
            );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value != '' && value2 != '--' && value3 == 'Reddedildi') {
      //arama boş değil firma boş değil durum Reddedildi

      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .getPersonFullFilter(value, value2, value3, success['value'])
            .subscribe(
              (success) => {
                success;
                value;
                value2;
                value3;
                if (value4 == 0) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 1) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 2) {
                  this.isDeleteDisabled = true;
                  this.isEditDisabled = false;
                }
                if (value4 == 3) {
                  this.isEditDisabled = true;
                  this.isDeleteDisabled = false;
                }
                this.dataSource.data = success;
                this.dataSource.data;
              },
              (error) => {
                error;
              }
            );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value != '' && value2 == '--' && value3 == '--') {
      //arama boş değil firma boş durum boş
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService.getPersonSearch(value, success['value']).subscribe(
            (success) => {
              this.isEditDisabled = false;
              this.isDeleteDisabled = false;
              success;
              this.persons = success;
              this.dataSource = new MatTableDataSource<Person>(this.persons);
              this.dataSource.paginator = this.paginator;
            },
            (err) => {
              ('başarısız');
              err;
            }
          );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value == '' && value2 == 'Hepsi' && value3 == 'Onaylandı') {
      //arama boş firma boş değil durum Onaylandı
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .getPersonS('Onaylandı', success['value'])
            .subscribe(
              (success) => {
                success;
                value3;
                value2;
                if (value4 == 0) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 1) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 2) {
                  this.isDeleteDisabled = true;
                  this.isEditDisabled = false;
                }
                if (value4 == 3) {
                  this.isEditDisabled = true;
                  this.isDeleteDisabled = false;
                }
                this.dataSource.data = success;
                this.dataSource.data;
              },
              (error) => {
                error;
              }
            );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value == '' && value2 != '--' && value3 == 'Onaylandı') {
      //arama boş firma boş değil durum Onaylandı
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .getPersonSC('Onaylandı', value2, success['value'])
            .subscribe(
              (success) => {
                success;
                value3;
                value2;
                if (value4 == 0) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 1) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 2) {
                  this.isDeleteDisabled = true;
                  this.isEditDisabled = false;
                }
                if (value4 == 3) {
                  this.isEditDisabled = true;
                  this.isDeleteDisabled = false;
                }
                this.dataSource.data = success;
                this.dataSource.data;
              },
              (error) => {
                error;
              }
            );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value == '' && value2 == 'Hepsi' && value3 == 'Reddedildi') {
      //arama boş firma boş değil durum Onaylandı
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .getPersonS('Reddedildi', success['value'])
            .subscribe(
              (success) => {
                success;
                value3;
                value2;
                if (value4 == 0) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 1) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 2) {
                  this.isDeleteDisabled = true;
                  this.isEditDisabled = false;
                }
                if (value4 == 3) {
                  this.isEditDisabled = true;
                  this.isDeleteDisabled = false;
                }
                this.dataSource.data = success;
                this.dataSource.data;
              },
              (error) => {
                error;
              }
            );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value == '' && value2 != '--' && value3 == 'Reddedildi') {
      //arama boş firma boş değil durum Onaylandı
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .getPersonSC('Reddedildi', value2, success['value'])
            .subscribe(
              (success) => {
                success;
                value3;
                value2;
                if (value4 == 0) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 1) {
                  this.isEditDisabled = false;
                  this.isDeleteDisabled = false;
                }
                if (value4 == 2) {
                  this.isDeleteDisabled = true;
                  this.isEditDisabled = false;
                }
                if (value4 == 3) {
                  this.isEditDisabled = true;
                  this.isDeleteDisabled = false;
                }
                this.dataSource.data = success;
                this.dataSource.data;
              },
              (error) => {
                error;
              }
            );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value == '' && value2 == '--' && value3 == '--') {
      this.isEditDisabled = false;
      this.isDeleteDisabled = false;

      this.listPerson();
    } else if (value != '' && value2 == '--' && value3 == 'Onaylandı') {
      //arama boş değil firma boş durum Onaylandı
      this.tokenService.getToken().subscribe(
        (success: any) => {
          var token = success['value'];
          this.personService
            .getPersonSS(value, value3, success['value'])
            .subscribe(
              (success) => {
                this.persons = success;
                this.dataSource = new MatTableDataSource<Person>(this.persons);
                this.dataSource.paginator = this.paginator;
              },
              (error) => {}
            );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value != '' && value2 == '--' && value3 == 'Reddedildi') {
      //arama boş değil firma boş durum Reddedildi
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService
            .getPersonSS(value, value3, success['value'])
            .subscribe(
              (success) => {
                this.persons = success;
                this.dataSource = new MatTableDataSource<Person>(this.persons);
                this.dataSource.paginator = this.paginator;
              },
              (error) => {}
            );
        },
        (error) => {}
      );
    }

    // else if(value!=""&&value2=="--"&&value3=="Reddedildi"||value3=="Onaylandı"){ //arama boş değil firma boş durum Reddedildi
    //   this.tokenService.getToken().subscribe(
    //     (success:any) => {

    //       var token=success["value"];
    //       this.personService.getPersonSearch(value,token).subscribe(
    //         (success) =>{

    //           this.personService.getPersonS(value3,token).subscribe(
    //             (success) => {
    //               this.isEditDisabled = false;
    //               this.isDeleteDisabled = false;

    //               this.persons = success;
    //           this.dataSource = new MatTableDataSource<Person>(this.persons);
    //           this.dataSource.paginator = this.paginator;

    //             },
    //             (err) => {
    //               ('başarısız');
    //             }
    //           );

    //         },
    //         (error)=>{

    //         }
    //       );

    //     },
    //     (error) => {
    //       (error);
    //       // (error["error"]["text"])
    //     }
    //   );

    // }
    else if (
      (value == '' && value2 == '--' && value3 == 'Onaylandı') ||
      value3 == 'Reddedildi'
    ) {
      //arama boş firma boş durum Onaylandı
      this.tokenService.getToken().subscribe(
        (success: any) => {
          success;
          this.personService.getPersonS(value3, success['value']).subscribe(
            (success) => {
              success;
              value4;
              if (value4 == 0) {
                this.isEditDisabled = false;
                this.isDeleteDisabled = false;
              }
              if (value4 == 1) {
                this.isEditDisabled = false;
                this.isDeleteDisabled = false;
              }
              if (value4 == 2) {
                this.isDeleteDisabled = true;
                this.isEditDisabled = false;
              }
              if (value4 == 3) {
                this.isEditDisabled = true;
                this.isDeleteDisabled = false;
              }

              this.dataSource = new MatTableDataSource<Person>(success);
              this.dataSource.paginator = this.paginator;

              this.dataSource.data;
            },
            (error) => {
              error;
            }
          );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value == '' && value2 == 'Hepsi' && value3 == '--') {
      //arama boş firma boş değil durum yok
      this.isEditDisabled = false;
      this.isDeleteDisabled = false;
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService.getPersons(success['value']).subscribe(
            (success) => {
              success;
              value4;
              if (value4 == 1) {
                this.isEditDisabled = false;
                this.isDeleteDisabled = false;
              }
              if (value4 == 2) {
                this.isDeleteDisabled = true;
                this.isEditDisabled = false;
              }
              if (value4 == 3) {
                this.isEditDisabled = true;
                this.isDeleteDisabled = false;
              }
              this.dataSource.data = success;
              this.dataSource.data;
            },
            (error) => {
              error;
            }
          );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (value == '' && value2 != '--' && value3 == '--') {
      //arama boş firma boş değil durum yok
      this.isEditDisabled = false;
      this.isDeleteDisabled = false;
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService.getPersonC(value2, success['value']).subscribe(
            (success) => {
              success;
              value4;
              if (value4 == 1) {
                this.isEditDisabled = false;
                this.isDeleteDisabled = false;
              }
              if (value4 == 2) {
                this.isDeleteDisabled = true;
                this.isEditDisabled = false;
              }
              if (value4 == 3) {
                this.isEditDisabled = true;
                this.isDeleteDisabled = false;
              }
              this.dataSource.data = success;
              this.dataSource.data;
            },
            (error) => {
              error;
            }
          );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    } else if (
      (value == '' && value2 == '--' && value3 == 'Onaylandı') ||
      value3 == 'Reddedildi'
    ) {
      //arama boş firma boş durum Onaylandı
      this.tokenService.getToken().subscribe(
        (success: any) => {
          this.personService.getPersonS(value3, success['value']).subscribe(
            (success) => {
              this.isEditDisabled = false;
              this.isDeleteDisabled = false;
              success;
              this.persons = success;
              this.dataSource = new MatTableDataSource<Person>(this.persons);
              this.dataSource.paginator = this.paginator;
            },
            (err) => {
              ('başarısız');
            }
          );
        },
        (error) => {
          error;
          // (error["error"]["text"])
        }
      );
    }

    // onayListele() {
    //   this.personService.getPersons().subscribe(
    //     (success) => {
    //       this.personList=this.bosList;
    //       this.personList.push(success);
    //         for(let i=0;i<this.personList.length;i++){
    //           if(success[i]["personState"]=="Onaylandı"){
    //             (success[i]);
    //             this.personOnayList.push(success[i]);
    //           }
    //         }
    //         (this.personOnayList);

    //       this.persons = this.personOnayList;
    //       this.dataSource = new MatTableDataSource<Person>(this.persons);
    //       this.dataSource.paginator = this.paginator;
    //     },
    //     (err) => {
    //       ('başarısız');
    //     }
    //   );
    // }

    // redListele() {
    //   this.personService.getPersons().subscribe(
    //     (success) => {
    //       this.personList=this.bosList;
    //       this.personList.push(success);
    //       for(let i=0;i<this.personList.length;i++){
    //         (success[i]["personState"])
    //         if(success[i]["personState"]=="Reddedildi"){
    //           (success[i]);
    //           this.personRedList.push(success[i]);
    //         }
    //       }
    //       (this.personRedList);

    //       this.persons = this.personRedList;
    //       this.dataSource = new MatTableDataSource<Person>(this.persons);
    //       this.dataSource.paginator = this.paginator;
    //     },
    //     (err) => {
    //       ('başarısız');
    //     }
    //   );
    // }

    // addItem(value:string) {

    // }
    // }
  }
  changeSelect() {
    var company = this.dataList['data']['company'];
    var companyDeger = this.dataList['data']['companyDeger'];
  }
}
