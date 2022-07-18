import { DataService } from './../services/data.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userid;

  user;

  constructor(private auth: AuthService,
              private data: DataService) { }

  async ngOnInit() {
    this.userid = await this.data.get("userId");
    this.getUser(this.userid);
  }

  getUser(id){
    this.auth.getUser(id).subscribe((user) =>{
      console.log(user);
      this.user = user['user'];
    }, (error) =>{
      console.log(error);
      
    })
  }
  logout(){
    
  }
}
