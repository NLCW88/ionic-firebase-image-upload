import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ImageListPage } from '../image-list/image-list';
import { AddImagePage } from '../add-image/add-image';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  addimagepage = AddImagePage;
  imagelistpage = ImageListPage;

  constructor(public navCtrl: NavController) {

  }

}
