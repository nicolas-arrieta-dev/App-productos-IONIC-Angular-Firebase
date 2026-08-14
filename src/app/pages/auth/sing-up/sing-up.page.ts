import { Component, inject, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Firebase } from '../../../services/firebase'
import { User } from '../../../models/user.model';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
  standalone: false,
})
export class SingUpPage implements OnInit {
 form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),

  })

  firebaseSvs = inject(Firebase);
  utilsSvs = inject(Utils);
  ngOnInit() {
  }

 async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvs.loading();
      await loading.present();
      this.firebaseSvs.signUp(this.form.value as User).then(async res => {

        await this.firebaseSvs.updateUser(this.form.value.name)
        let uid = res.user.uid
        this.form.controls.uid.setValue(uid);
        this.SetUserInfo(uid);

      }).catch(error => {
        console.log(error);
        this.utilsSvs.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-cicle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }

  }
 async SetUserInfo(uid: string) {
    if (this.form.valid) {

      const loading = await this.utilsSvs.loading();
      await loading.present();

      let path = `user/${uid}`

      delete this.form.value.password;
      this.firebaseSvs.setDocument(path, this.form.value).then(async res => {

        this.utilsSvs.saveInLocalStorage('user', this.form.value)
        this.utilsSvs.routerLink('/main/home');
        this.form.reset();

      }).catch(error => {
        console.log(error);
        this.utilsSvs.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-cicle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }

  }
}
