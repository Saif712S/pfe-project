import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcademicHomeSubService {
  private apiUrl = 'http://localhost:8090/allF';
  //private apiUrl = 'https://dummyjson.com/products';
  
  constructor(private http: HttpClient) { }

  getListe(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteSubscription(id:any): Observable<any> {
    const uri = `http://localhost:8090/deleteAbonnementF/${id}`
    return this.http.delete(uri)
  }
  addSubscription(Content:any){
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
      //'Authorization': 'Basic ' + token
    } )
    return this.http.post(this.apiUrl+"/addAbonnementF",Content)
  }
}
