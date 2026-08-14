import { Component, inject, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Firebase } from '../../services/firebase';
import { User } from '../../models/user.model';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: false,
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),

  })

  firebaseSvs = inject(Firebase);
  utilsSvs = inject(Utils);
  ngOnInit() {
  }

  async submit() {
      if (this.form.valid) {

        const loading = await this.utilsSvs.loading();
        await loading.present();
        this.firebaseSvs.signIn(this.form.value as User).then(res => {

          this.getUserInfo(res.user.uid);
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

   async getUserInfo(uid: string) {
    if (this.form.valid) {

      const loading = await this.utilsSvs.loading();
      await loading.present();

      let path = `user/${uid}`

      delete this.form.value.password;
      this.firebaseSvs.getDocument(path).then((user:User) => {

        this.utilsSvs.saveInLocalStorage('user', user)
        this.utilsSvs.routerLink('/main/home');
        this.form.reset();

          this.utilsSvs.presentToast({
          message: `Te damos la bienvenida ${user.name}`,
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'person-circle-outline'
        })

      }).catch(error => {
        console.log(error);
        this.utilsSvs.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
      }).finally(()=>{
        loading.dismiss();
      })
    }

  }

}
