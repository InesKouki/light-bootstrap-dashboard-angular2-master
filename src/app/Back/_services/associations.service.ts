import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'environments/environment';
const API_URL=`${environment.apiBaseUrl}/association`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AssociationsService {

  constructor(private http: HttpClient) { }
  getAssociationList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'/getAsso');
  }
  deleteAssciation(id: any): Observable<any> {
    return this.http.delete(API_URL+ '/deleteAss/'+ id );
  }
   update(id:number,adresse:any,mail: any,nom:any,tel:any): Observable<Object>{
     return this.http.put(API_URL + `/updateAsso`, {id,adresse,mail,nom,tel});
   }
   exportAll(): Observable<Blob>{
    return this.http.get<Blob>(API_URL+`/associations/pdf`,{ responseType: 'blob' as 'json' });
   }

  addA(formData: FormData): Observable<any> {
    return this.http.post(API_URL+ '/addAsso',formData);
  }

}
