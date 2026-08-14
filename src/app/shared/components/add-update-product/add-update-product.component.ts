import { Component, inject, Input, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Firebase } from '../../../services/firebase'
import { User } from '../../../models/user.model';
import { Utils } from 'src/app/services/utils';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
  standalone: false,
})
export class AddUpdateProductComponent implements OnInit {

  @Input() product: Product;
  form = new FormGroup({
    id: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    soldUnits: new FormControl(null, [Validators.required]),


  })

  firebaseSvs = inject(Firebase);
  utilsSvs = inject(Utils);
  user = {} as User;
  ngOnInit() {
    this.user = this.utilsSvs.getFormLocalStorage('user')
    if (this.product) this.form.setValue(this.product);
  }
  // ==================0 Tomar o Selecionar una imagen 0=========
  async takeImage() {
    const dataUrl = (await this.utilsSvs.takePicture('Imagen del Prodcuto')).dataUrl;
    this.form.controls.image.setValue(dataUrl);
  }


  submit() {
      this.form.patchValue({
    price: Number(this.form.value.price),
    soldUnits: Number(this.form.value.soldUnits)
  });

    if (this.form.valid) {
      if (this.product) this.updateProduct();
      else this.createProduct();
    }
  }

// ==========0 Comvierte valores de tipo strin a number 0=============
  // setNumberInputs() {
  //   let { soldUnits, price } = this.form.controls;
  //   if (soldUnits.value) soldUnits.setValue(parseFloat(soldUnits.value));
  //   if (price.value) price.setValue(parseFloat(price.value));

  // }

  // ================0 Crear Producto 0================

  async createProduct() {

    let path = `user/${this.user.uid}/products`
    const loading = await this.utilsSvs.loading();
    await loading.present();

    // == subir la imagen y obtener url ==

    let dataUrl = this.form.value.image;
    let imagePath = `${this.user.uid}/${Date.now()}`;
    //let imageUrl = await this.firebaseSvs.uploadImage(imagePath, dataUrl);
    //this.form.controls.image.setValue(imageUrl);

    delete this.form.value.id
    this.firebaseSvs.addDocument(path, this.form.value).then(async res => {
      this.utilsSvs.dismissModal({ success: true });
      this.utilsSvs.presentToast({
        message: 'Producto Creado Exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })


    }).catch(error => {
      console.log(error);
      this.utilsSvs.presentToast({
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
  // ================0 Actualizar Producto 0================
  async updateProduct() {

    let path = `user/${this.user.uid}/products/${this.product.id}`
    const loading = await this.utilsSvs.loading();
    await loading.present();

    // == si cambio la imagen subir la nueva y obtener url ==
    if (this.form.value.image !== this.product.image) {
      let dataUrl = this.form.value.image;
      //let imagePath = await this.firebaseSvs.getFilePath(this.product.image);
      //let imageUrl = await this.firebaseSvs.uploadImage(imagePath, dataUrl);
      //this.form.controls.image.setValue(imageUrl);
    }


    delete this.form.value.id
    this.firebaseSvs.updateDocument(path, this.form.value).then(async res => {
      this.utilsSvs.dismissModal({ success: true });
      this.utilsSvs.presentToast({
        message: 'Producto Actualizado Exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })


    }).catch(error => {
      console.log(error);
      this.utilsSvs.presentToast({
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
