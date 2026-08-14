import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';


@Injectable({
  providedIn: 'root',
})
export class Utils {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController);
  router = inject(Router);
  alertCtrl = inject(AlertController)




async takePicture (promptLabelHeader:string) {

    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Seleciona una imagen',
      promptLabelPicture: 'Toma una foto'
    });


};
  // =============0 Alert 0=========0
  async PresentAlert(opts?: AlertOptions){
    const alert = await this.alertCtrl.create(opts);
    await alert.present();
  }
  //==============0 Loading 0============
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  // ================0 Toast 0==============
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts)
    toast.present();
  }

  //==================0 enruta a cualquier pagina  disponible 0============
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  //=================0 Guarda un elemento en localStorage 0=========0
  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value))
  }

  getFormLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  //===================0 Modal 0====================
  async presentModal(opts: ModalOptions){
    const modal = await this.modalCtrl.create(opts);
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data) return data;
  }


  dismissModal(data?:any){
    return this.modalCtrl.dismiss(data);
  }
}
