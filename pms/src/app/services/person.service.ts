import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addPersonRequest } from '../models/api-models/addPersonRequest.model';
import { Person } from '../models/api-models/person.model';
import { updatePersonRequest } from '../models/api-models/updatePersonRequest.model';

@Injectable({
  providedIn: 'root',
})
export class Personservice {
  private baseApiUrl = 'https://localhost:44355';
  constructor(private httpClient: HttpClient) {}

  getPersons(e: any): Observable<Person[]> {
    (e);
    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${e}`,
    });
    return this.httpClient.get<Person[]>(this.baseApiUrl + '/Person', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + e }),
    });
  }

  getPersonsOnay(e: any): Observable<Person[]> {
    (e);
    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${e}`,
    });
    return this.httpClient.get<Person[]>(this.baseApiUrl + '/Person/Onay', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + e }),
    });
  }

  getPerson(
    personId: string | number | null | undefined,
    e: any
  ): Observable<Person> {
    return this.httpClient.get<Person>(
      this.baseApiUrl + '/Person/' + personId,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
    );
  }

  addPerson(
    personTC: string,
    personRequest: Person,
    e: any
  ): Observable<Person> {
    const addPersonRequest: addPersonRequest = {
      personFullname: personRequest.personFullname,
      personTC: personRequest.personTC,
      personTitle: personRequest.personTitle,
      personCompany: personRequest.personCompany,
      personBirthTime: personRequest.personBirthTime,
      personState: personRequest.personState,
    };
    return this.httpClient.post<Person>(
      this.baseApiUrl + '/Person/Add/' + personTC,
      addPersonRequest,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
    );
  }

  addOnayPerson(
    personRequest: Person,
    e: any
  ): Observable<Person> {
    const addPersonRequest: addPersonRequest = {
      personFullname: personRequest.personFullname,
      personTC: personRequest.personTC,
      personTitle: personRequest.personTitle,
      personCompany: personRequest.personCompany,
      personBirthTime: personRequest.personBirthTime,
      personState: personRequest.personState,
    };
    return this.httpClient.post<Person>(
      this.baseApiUrl + '/Person/AddOnay/' + personRequest.personTC,
      addPersonRequest,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
    );
  }

  addOnayNormalPerson(
    personRequest: Person,
    e: any
  ): Observable<Person> {
    const addPersonRequest: addPersonRequest = {
      personFullname: personRequest.personFullname,
      personTC: personRequest.personTC,
      personTitle: personRequest.personTitle,
      personCompany: personRequest.personCompany,
      personBirthTime: personRequest.personBirthTime,
      personState: personRequest.personState,
    };
    return this.httpClient.post<Person>(
      this.baseApiUrl + '/Person/AddOnayNormal/' + personRequest,
      addPersonRequest,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
    );
  }

  updatePerson(
    personId: number,
    personRequest: Person,
    e: any
  ): Observable<Person> {
    const updatePersonRequest: updatePersonRequest = {
      personId,
      personTC: personRequest.personTC,
      personFullname: personRequest.personFullname,
      personTitle: personRequest.personTitle,
      personCompany: personRequest.personCompany,
      personBirthTime: personRequest.personBirthTime,
      personState: personRequest.personState,
    };
    return this.httpClient.put<Person>(
      this.baseApiUrl + '/Person/' + personId,
      updatePersonRequest,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
    );
  }

  getPersonTC(personTC: string, e: any): Observable<Person> {
    return this.httpClient.get<Person>(
      this.baseApiUrl + '/Person/Control/' + personTC,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
    );
  }

  getPersonTCOnay(personTC: string, e: any): Observable<Person> {
    return this.httpClient.get<Person>(
      this.baseApiUrl + '/Person/ControlOnay/' + personTC,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
    );
  }

  deletePerson(personId: number, e: any): Observable<Person> {
    return this.httpClient.delete<Person>(
      this.baseApiUrl + '/Person/' + personId,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
    );
  }

  getPersonC(personCompany: string, e: any): Observable<Person[]> {
    return this.httpClient.get<Person[]>(
      this.baseApiUrl + '/Person/' + personCompany,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
    );
  }

  getPersonFullFilter(Search:string,personCompany:string,personState: string, e: any): Observable<Person[]> {
    return this.httpClient.get<Person[]>(
      this.baseApiUrl + '/Person/Filter/' +Search+"/"+ personCompany+"/"+personState,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
    );
  }

  getPersonSearch(Search: string, e: any): Observable<Person[]> {
    return this.httpClient.get<Person[]>(
      this.baseApiUrl + '/Person/Search/' + Search,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
    );
  }

  getPersonS(personState: string, e: any): Observable<Person[]> {
    return this.httpClient.get<Person[]>(
      this.baseApiUrl + '/Person/State/' + personState,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
    );
  }

  getPersonSC(
    personState: string,
    personCompany: string,
    e: any
  ): Observable<Person[]> {
    return this.httpClient.get<Person[]>(
      this.baseApiUrl + '/Person/SC/' + personState + '/' + personCompany,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
    );
  }


getPersonSS(
  Search: string,
  personState: string,
  e: any
): Observable<Person[]> {
  return this.httpClient.get<Person[]>(
    this.baseApiUrl + '/Person/SS/' + Search + '/' + personState,
    { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
  );
}

getPersonSearchC(
  Search: string,
  personCompany: string,
  e: any
): Observable<Person[]> {
  return this.httpClient.get<Person[]>(
    this.baseApiUrl + '/Person/SearchC/' + Search + '/' + personCompany,
    { headers: new HttpHeaders({ Authorization: 'Bearer ' + e }) }
  );
}




}

