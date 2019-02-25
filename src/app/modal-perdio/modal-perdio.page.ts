import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-perdio',
  templateUrl: './modal-perdio.page.html',
  styleUrls: ['./modal-perdio.page.scss'],
})
export class ModalPerdioPage implements OnInit {
  premio:number;
  constructor(public navParams: NavParams) { }

  ngOnInit() {
  	this.premio=this.navParams.get('premio');  	
  }

}
