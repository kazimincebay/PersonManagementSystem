import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../models/api-models/auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApiUrl = 'https://localhost:44355';
  constructor(private httpClient: HttpClient) {}

  getAuths(e:any): Observable<Auth[]> {
    return this.httpClient.get<Auth[]>(this.baseApiUrl + '/Auth',{headers: new HttpHeaders({ 'Authorization': 'Bearer '+e})});
  }

  getAuthsHepsi(e:any): Observable<Auth[]> {
    return this.httpClient.get<Auth[]>(this.baseApiUrl + '/Auth/Hepsi',{headers: new HttpHeaders({ 'Authorization': 'Bearer '+e})});
  }
}
