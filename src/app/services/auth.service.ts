import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  loginUser(email, password){
    let body = {
      email: email,
      password: password
    }
    return this.http.post(environment.api +'/user/login', body);
  }

  registerUser(email, password,mobileNo, file: File, ){
    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("file", file, file.name);
    formdata.append("mobileNo", mobileNo);
    return this.http.post(environment.api +'/user/register', formdata);
  }

  getUser(id){
    return this.http.get(environment.api +'/user/'+id);
  }
  updateUser(userId, email, password, mobileNo){
    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("mobileNo", mobileNo);
    return this.http.put(environment.api +'/user/'+ userId, formdata);
  }

  updateBalance(userId, amount){
    let body = {
      balance: amount
    }
    return this.http.put(environment.api +'/user/'+userId,body);

  }
}
