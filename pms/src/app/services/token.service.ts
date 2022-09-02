import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private baseApiUrl = 'https://localhost:44355';
  constructor(private httpClient: HttpClient) {}

  getToken():Observable<Token[]> {
    return this.httpClient.get<Token[]>(this.baseApiUrl + '/Token');
  }
}


