import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  private baseUrl:string='http://localhost:8090/api/donations';
  constructor(private http: HttpClient) { }
  getCountByAssociation(): Observable<Object[]>{
    return this.http.get<Object[]>(this.baseUrl + `/stats/count-by-association`);
  }
  getDonationsList(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl+'/getDonation');
  }
  addDonation(date:any,description:any,associations:any,quantite:any,user:any,suivi:any): Observable<any>{
    return this.http.post(this.baseUrl+ '/saveD',{date,description,associations,quantite,user,suivi},httpOptions)
  }
  add(userData:any){
    return this.http.post(this.baseUrl + '/saveD', userData,httpOptions);
  }
  downloadExcel():Observable<Blob>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/vnd.ms-excel' });
    return this.http.get<Blob>(this.baseUrl+ '/users/export/excel', { headers: headers, responseType: 'blob' as 'json' })
  }
  updateDonationsStatus(id: number){
    return this.http.put(this.baseUrl + '/donations/'+ id,httpOptions);
  }
  assignAssociationToDonation(donationId: number, associationId: number): Observable<any> {
    const url = `${this.baseUrl}/donations/${donationId}/${associationId}`;
    return this.http.post(url, {});
  }
  deleteDonation(id: any): Observable<any>{
    return this.http.delete(this.baseUrl + '/deleteD/'+ id );
  }
  
}
