import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const API_URL=`${environment.apiBaseUrl}/sponsors/`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class SponsorService {



  constructor(private http: HttpClient) { }
  getSponsorsList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'sponsors');
  }

  deleteSponsor(numSponsor: any): Observable<any> {
    return this.http.delete(API_URL+'deleteSponsor/' + numSponsor);
  }

  update(numSponsor:any,nomSponsor:any,description:any,debutContract: any,finContract: any): Observable<any> {
    return this.http.put(API_URL + 'updateSponsor',{numSponsor,nomSponsor,description,debutContract,finContract},httpOptions);
  }

  addSponsor(formData: FormData): Observable<any> {
    return this.http.post(API_URL + 'addSponsor',formData);
  }

  getSponsorDetails(id:any): Observable<any[]> {
    return this.http.get<any[]>(API_URL+id);
  }

  getExcel(): Observable<any> {
    return this.http.get(API_URL+'export-to-excel', { responseType: 'blob' });
  }
}
