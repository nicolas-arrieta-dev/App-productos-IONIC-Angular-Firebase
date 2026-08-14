import { Component, inject, Input, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Firebase } from '../../../services/firebase'
import { User } from '../../../models/user.model';
import { Utils } from 'src/app/services/utils';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
   standalone: false,
})
export class ProfilePage implements OnInit {

  firebaseSvs = inject(Firebase);
  utilsSvc = inject(Utils);
    ngOnInit() {
  }

    user(): User {
    return this.utilsSvc.getFormLocalStorage('user');
  }

    // ==================0 Tomar o Selecionar una imagen 0=========
  async takeImage() {

    let user = this.user(); 
    console.log(user.image);
    let path = `user/${user.uid}`


    const dataUrl = (await this.utilsSvc.takePicture('Imagen del Perfil')).dataUrl;
    const loading = await this.utilsSvc.loading();
    await loading.present();
      let imagePath = `${user.uid}/profile`;
   // user.image = await this.firebaseSvs.uploadImage(imagePath, dataUrl);
   user.image = dataUrl

       this.firebaseSvs.updateDocument(path, {image: user.image}).then(async res => {
      this.utilsSvc.saveInLocalStorage('user',user)
      this.utilsSvc.presentToast({
        message: 'Imagen Actualizada Exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })


    }).catch(error => {
      console.log(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-cicle-outline'
      })
    }).finally(() => {
      loading.dismiss();
    })
  }
}
