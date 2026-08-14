import { Component, inject, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Firebase } from '../../../services/firebase';
import { User } from '../../../models/user.model';
import { Utils } from 'src/app/services/utils';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
    standalone: false,
})
export class ForgotPasswordPage implements OnInit {


  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

  })

  firebaseSvs = inject(Firebase);
  utilsSvs = inject(Utils);
  ngOnInit() {
  }

  async submit() {
      if (this.form.valid) {

        const loading = await this.utilsSvs.loading();
        await loading.present();
        this.firebaseSvs.sendRevoceryEmail(this.form.value.email).then(res => {
              this.utilsSvs.presentToast({
            message: `Correo Emviado con exito`,
            duration: 1500,
            color: 'primary',
            position: 'middle',
            icon: 'mail-outline'
          });
          this.utilsSvs.routerLink('/auth');
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
