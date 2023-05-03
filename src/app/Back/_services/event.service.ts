import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
const API_URL=`${environment.apiBaseUrl}/events/`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  geteventList(): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'events');
  }

  deleteEvent(numEvent: any): Observable<any> {
    return this.http.delete(API_URL+'deleteEvent/' + numEvent);
  }

  update(numEvent:any,nomEvent:any,description:any,dateDebut: any,dateFin: any,nbrPlace:any,prix:any): Observable<any> {
    return this.http.put(API_URL + 'updateEvent',{numEvent,nomEvent,description,dateDebut,dateFin,nbrPlace,prix},httpOptions);
  }

  add(formData: FormData): Observable<any> {
    return this.http.post(API_URL + 'addEvent',formData);
  }

  getNonSponsorsDuEvent(numEvent:any): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'sponsorsNonDuEvent/'+numEvent);
  }

  getSponsorsDuEvent(numEvent:any): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'SponsorDuEvent/'+numEvent);
  }

  getParticipantDuEvent(numEvent:any): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'getParticipants/'+numEvent);
  }

  removeReservation(numEvent:any,id: any): Observable<any> {
    return this.http.post(API_URL + 'deleteReservation',{numEvent,id},httpOptions);
  }

  assign(numEvent:any,numSponsor: any): Observable<any> {
    return this.http.post(API_URL + 'assignSponsor',{numEvent,numSponsor},httpOptions);
  }

  unassign(numEvent:any,numSponsor: any): Observable<any> {
    return this.http.post(API_URL + 'removeSponsor',{numEvent,numSponsor},httpOptions);
  }

  getEventDetails(id:any): Observable<any[]> {
    return this.http.get<any[]>(API_URL+id);
  }

  getPDF(numEvent: any): Observable<any> {
    return this.http.get(API_URL+'openpdf/participants/'+numEvent, { responseType: 'blob' });
  }

  getStatistics(): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'home')
  }

  getActiveEvents(): Observable<any[]> {
    return this.http.get<any[]>(API_URL+'getActivEvents')
  }
}
