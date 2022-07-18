import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  hostId;

  constructor(private auth: AuthService,
     private io: Socket,
     private router: Router,
     private route: ActivatedRoute)
      {
    this.io.connect();
    this.hostId = this.route.snapshot.paramMap.get("hostId");
    this.io.on('connected-to-charger',(data) =>{
      console.log(data);
      
    })
    this.io.emit('charger-start', {hostid: this.hostId} );
   }

  ngOnInit() {
  }



}
