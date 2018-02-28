import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ImageItem } from '../../models/image-item/image-item.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-image-list',
  templateUrl: 'image-list.html',
})
export class ImageListPage {

  imageListRef$: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {

    /*
      Pointing imageListRef$ at Firebase -> 'image-list' node.
      That means not only can we push things from this reference to the database, but also we have access to everthing inside that node.
      See updated code at: https://stackoverflow.com/questions/46611944/ionic-and-firebase-invalidpipeargument-object-object-for-pipe-asyncpipe/46612613#46612613?newreg=94f361aa217546088f930d331c2dccd9
    */
    this.imageListRef$ = this.database.list('image-list').valueChanges();;

  }

  /*
    Display an ActionSheet that gives the user the following options:
    1. Edit the ImageItem
    2. Delete the ImageItem
    3. Cancel the selection
  */

  selectImageItem(imageItem: ImageItem) {

    this.actionSheetCtrl.create({
      title: `${imageItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            // Send the user to the EditImageItemPage and passs the key as a parameter
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: function() {
          //this.database.list('image-list').remove(imageItem.$key);
          console.log("Skip for now")
          const dbObservable = this.imageListRef$;
          console.log(`Found ${dbObservable}`);
          }
        },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log("The user has selected the cancel button")
            }
          }
        ]
    }).present();
  }

}
