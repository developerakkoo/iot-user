import { DataService } from './../services/data.service';
import { AuthService } from './../services/auth.service';
import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { GoogleMap } from '@capacitor/google-maps';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

declare var Razorpay: any;
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  userId;

  status:String =  "available";

  amount;

  host:any[];

  slots = [
    {
      name: "Available",
      color: "green"

    }
    ,{
      name: "Reserved",
      color: "blue"
      
    },
    {
      name: "In Use",
      color: "orange"
    },
    {
      name: "Fault",
      color: "red"
    }
  ]

  
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private auth: AuthService,
              private data: DataService,
              private alertController: AlertController,
              private toastController: ToastController,
              private geolocation: Geolocation,
              private barcodeScanner: BarcodeScanner) { }

  async ngOnInit() {
    this.userId = await this.data.get("userId");
    this.getUser(this.userId);
    this.getAllHost();
    this.getCurrentLocation();

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  getCurrentLocation(){
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
    this.loadMap(resp.coords.latitude,resp.coords.longitude );

     })
     .catch((error) => {
       console.log('Error getting location', error);
     });
  }

  async loadMap(lat, lng){
    const apiKey = "AIzaSyDcPVmj-BDu62Mthp0Uq0_eNz1ng_zzTEA";
const mapElement = document.getElementById('map');
const mapConfig = {
  center: {
    lat: lat,
    lng: lng,
  },
  zoom: 8,
  androidLiteMode: false,
}
const mapOptions = {
  id: 'my-map',
  apiKey: apiKey,
  config: mapConfig,
  element: mapElement,
}

// Create the Map Element
const map = await GoogleMap.create(mapOptions);
map.setOnMarkerClickListener((data) =>{
  console.log(data);
  let title = data['title'].split("-")[0];
  let s = data['title'].split("-")[1];
  console.log(title +"-"+ s);
  if(s == "fault"){
    console.log("fault");
    this.presentToast("The Charger is at fault!")
  }

  if(s == "inuse"){
    console.log("in use");
    this.presentToast("The Charger is in use!")

    
  }

  if(s == "available"){
    console.log("available");
    this.router.navigate(['start', title]);
    
  }

  if(s == "warning"){
    console.log("warning");
    this.presentToast("The Charger is not functional!")

    
  }


  
  
})
this.host.forEach(async (element) => {
  let url;

  console.log(`host coords: ${element.cords}`);
 
  let markerId = await map.addMarker({
    coordinate:{
      lat: element['cords'][0],
      lng: element['cords'][1]
    },
 snippet:element['_id'],
 title:element['_id']+"-"+this.status,

    iconUrl: (this.status == "available") ? "assets/available.png":
             (this.status == "fault")? "assets/fault.png":
             (this.status == "warning")? "assets/warning.png":
             (this.status == "inuse")? "assets/inuse.png" : null
  
  
  });

  
});
// await map.addMarker({
//   title: "Hello",

//   coordinate:{
//     lat: 33.6,
//     lng: -117.5
//   }
// })
  }

  async getUser(id){
    this.auth.getUser(id).subscribe(async (user) =>{
      console.log(user);
      await this.data.set("user", user['user']);

    })
  }
  openPrebook(){
     this.router.navigate(['prebook']);
  }


  getAllHost(){
    this.http.get(environment.api + '/host')
    .subscribe((host) =>{
      console.log(host);
      this.host = host['host'];
      
    }, (error) =>{
      console.log(error);
      
    })
  }
  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      alert(barcodeData.text.toString());
     }).catch(err => {
         console.log('Error', err);
     });
  }
  openStartChargingPage()
{
  this.router.navigate(['start']);
}

async presentAlert() {
  const alert = await this.alertController.create({
    header: 'Please enter your info',
    buttons: [{
      text: "Okay",
      handler: (value) => {
        console.log(value[0]);
        this.amount =value[0];
        this.Checkout();
        
      }
    }],
    inputs: [
      {
        placeholder: 'Enter amount to recharge.'
      },
      
    ],
    
  });

  await alert.present();
}

Checkout(){
  // this.cartService.cart = [];
  console.log(`Payment of rs${this.amount}`);
  let order = {
    amount: this.amount * 100
  }

  this.http.post(environment.api +'/order', order)
  .subscribe((order) =>{
    console.log(order);
    if(order['status'] == "success"){
      let orderId = order['order'].id;
      let amount = order['order'].amount;

      var options = {
        "key": "rzp_test_q92KbX0ZwFyaN0", // Enter the Key ID generated from the Dashboard
        "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Iot App",
        "description": "Amount to be paid",
        // "image": "https://example.com/your_logo",
        "order_id":orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": (response)=>{
          console.log("Payment Success");
          // this.placeOrder();
          this.auth.updateBalance(this.userId, amount).subscribe((user) =>{
            console.log("updated user");
            console.log(user);
            this.getUser(this.userId);
            
            
          })
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
        },
        // "prefill": {
        //     "name": "Gaurav Kumar",
        //     "email": "gaurav.kumar@example.com",
        //     "contact": "9999999999"
        // },
        // "notes": {
        //     "address": "Razorpay Corporate Office"
        // },
        "theme": {
            "color": "#1EC283"
        }
    };

    this.initPay(options);

    }
    
  })
  
  
}

initPay(options){
  var rz = new Razorpay(options);
rz.on('payment.failed', function (response){
console.log("Payment FAiled");

// alert(response.error.code);
// alert(response.error.description);
// alert(response.error.source);
// alert(response.error.step);
// alert(response.error.reason);
// alert(response.error.metadata.order_id);
// alert(response.error.metadata.payment_id);
});

rz.open();
}
}
