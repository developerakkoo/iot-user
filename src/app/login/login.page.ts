import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from './../services/data.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: String;
  password: String;


  constructor(public auth: AngularFireAuth,
              private data: DataService,
              private loadingCtrl: LoadingController,
              private router: Router,
              private alertController: AlertController,
              private authService: AuthService) {
  }


  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Something went wrong!',
      message: msg,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async userLogin(){
    let loading = await this.loadingCtrl.create({
      message:"Logging you in..."
    })

    await loading.present();
    this.authService.loginUser(this.email, this.password)
    .subscribe(async (user) =>{
      console.log(user);
      await this.data.set("userId", user['userId']);
      await loading.dismiss();
      this.router.navigate(['folder']);
      
    }, async (error) =>{
      console.log(error);

      await loading.dismiss();

      this.presentAlert(error.message);
      
    })
  }

  googleLogin() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user) =>{
      console.log(user);
      
    }).catch((error) =>{
      console.log(error);
      
    })
  }

  facebookLogin(){
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((user) =>{
      console.log(user);
      
    }).catch((error) =>{
      console.log(error);
      
    })
  }
  logout() {
    this.auth.signOut();
  }

  ngOnInit() {
  }

}
