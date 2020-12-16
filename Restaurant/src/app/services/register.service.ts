import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  uDetails: any;

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080/restro'

  getUser(){
    return this.http.get(`${this.baseUrl}/getUser`)
  }
  
  postData(data) {
    return this.http.post(`${this.baseUrl}/createUser`, data)
  }
  
  getDtataByEmail(loginDetails) {
    return this.http.post(`${this.baseUrl}/getByEmail`,loginDetails)
  }

  getUserByid(id){
    return this.http.get(`${this.baseUrl}/getUsers/${id}`)
  }

  updateProfile(id,details){
    return this.http.put(`${this.baseUrl}/updateProfile/${id}`,details)
  }

  // cart
  
  addToCart(data){
    return this.http.post(`${this.baseUrl}/cartDetails`,data)
  }

  getToCart(userID){
    return this.http.get(`${this.baseUrl}/getCart/${userID}`)
  }
  
  getDatafromLocal(){
    this.uDetails=JSON.parse(localStorage.getItem('user'));
    return this.uDetails['user']
  }

  updateQuantity(id,userID,quantity){
    return this.http.put(`${this.baseUrl}/updateQuantity/${id}/${userID}`,quantity)
  }

  removeItem(id){
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
  }
  
  // forgot password
  
  forgetPaaaword(data){
    return this.http.get(`${this.baseUrl}/forgetPassword/${data}`)
  }

  updatePassword(id,password){
   console.log(password);
    return this.http.put(`${this.baseUrl}/updatePassword/${id}`,password)
  }
}
