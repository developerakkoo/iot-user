import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Profile', url: '/profile', icon: 'person' },
    { title: 'Contact Us', url: '/folder/Outbox', icon: 'walk' },
    { title: 'About', url: '/folder/Favorites', icon: 'help' },
   
  ];
  username;
  email;


  constructor(private data: DataService,
              private router: Router) {

              
    this.data.get("userId").then((user) =>{
      if(user !=null){
        
        console.log(`userID found:- ${user}`);
        this.router.navigate(['folder']);
      }
    }).catch((error) =>{
      console.log(error);
      
    })

    this.data.get("user").then((user) =>{
      this.username = user['mobileNo'];
      this.email = user['email']
    })
  }
}
