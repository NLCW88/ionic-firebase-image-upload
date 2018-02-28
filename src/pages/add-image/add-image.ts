import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImageItem } from '../../models/image-item/image-item.interface';
import { ImageListPage } from '../image-list/image-list';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-add-image',
  templateUrl: 'add-image.html',
})
export class AddImagePage {

  imageItem = {} as ImageItem;

  imageItemRef$ : Observable<ImageItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.imageItemRef$ = this.database.list('image-list');
  }

  addImageItem(imageItem: ImageItem) {
    /*
      Create a new anonymous object, and convert itemNumber to a number.
      Push this to our Firebase database under the 'item-list' node.
    */
    this.imageItemRef$.push({
      itemName: this.imageItem.itemName,
      itemNumber: Number(this.imageItem.itemNumber)
    });

    // Reset out ImageItem
    this.imageItem = {} as ImageItem;

    // Navigate the user to the ImageListPage
    this.navCtrl.push(ImageListPage);
  }

}
