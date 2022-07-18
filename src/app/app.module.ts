import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

const firebaseConfig = {
  apiKey: "AIzaSyBpdYZ_weFmkoOnWq5g5as4TSWvw2KeDuw",
  authDomain: "color-css.firebaseapp.com",
  databaseURL: "https://color-css.firebaseio.com",
  projectId: "color-css",
  storageBucket: "color-css.appspot.com",
  messagingSenderId: "426244092294",
  appId: "1:426244092294:web:2a2a22f5c027ed850c7c07"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,IonicStorageModule.forRoot({
    name: "iotapp"
  }), AngularFireModule.initializeApp(firebaseConfig),SocketIoModule.forRoot(config)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },BarcodeScanner,Geolocation],
  bootstrap: [AppComponent],
})
export class AppModule {}
