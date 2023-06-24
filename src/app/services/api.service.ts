import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  url = "http://localhost:4000/productList/";

  postProductData(data :any){
    return this.http.post<any>(this.url, data);
  }

  getProductData(){
    return this.http.get<any>(this.url);
  }

  updateProduct(data: any, id: number){
    return this.http.put<any>(this.url+id, data);
  }

  deleteProduct(id: number){
    return this.http.delete<any>(this.url+id);
  }
}
