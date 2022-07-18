import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email;
  password;
  mobile;
  file: File;


  constructor(private auth: AuthService,
              private router: Router,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  fileEvent(event){
    this.file = event.target.files[0];
    console.log(event.target);
    
  }


  async register(){
    let loading = await this.loadingCtrl.create({
      message: "Registering User..."
    })
    await loading.present();
    this.auth.registerUser(this.email, this.password, this.mobile, this.file)
    .subscribe(async (user) =>
    {
      console.log(user);
      await loading.dismiss();
      this.router.navigate(['login']);
    }, async (error) =>{
      console.log(error);
      await loading.dismiss();
    })
  }

}
