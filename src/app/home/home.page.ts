import { PhotoService, UserPhoto } from './../services/photo.service';
import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, IonModal, IonSlides, PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('slides') slides: IonSlides;

  /*
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };*/

  slideOpts = {
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    }
  };

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  constructor(public popoverController: PopoverController,
              public photoService: PhotoService,
              public actionSheetController: ActionSheetController) {}


  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Elimina',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Annulla',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
         }
      }]
    });
    await actionSheet.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onNextStep() {
    this.slides.slideNext();
  }

  onImagePicked(event) {
    console.log('scattata', event);
  }

}
