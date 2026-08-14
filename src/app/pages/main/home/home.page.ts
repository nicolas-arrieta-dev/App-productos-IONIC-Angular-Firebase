import { Component, inject, OnInit } from '@angular/core';
import { Firebase } from 'src/app/services/firebase';
import { Utils } from 'src/app/services/utils';
import { AddUpdateProductComponent } from '../../../shared/components/add-update-product/add-update-product.component';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { where, orderBy } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  firebaseSvc = inject(Firebase);
  utilsSvc = inject(Utils);

  products: Product[] = [];
  loading: boolean = false;
  ngOnInit() {
  }

  user(): User {
    return this.utilsSvc.getFormLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getProduct();
  }


  doRefresh(event: any) {

    setTimeout(() => {
      this.getProduct();
      event.detail.complete();
    }, 1000);

  }
  // ======0 Obtener Ganancias 0======
  getProfis() {
    return this.products.reduce((index, product) => index + product.price * product.soldUnits, 0)
  }

  // ==============0 Obtener Productos 0===========
  getProduct() {
    let path = `user/${this.user().uid}/products`;
    this.loading = true;
    let query = [
      orderBy('soldUnits', 'desc'),
      // where('soldUnits', '>', 10)
    ];
    let sub = this.firebaseSvc.getCollectionData(path, query).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;
        this.loading = false;

        sub.unsubscribe();
      }
    })
  }


  // ===============0 Agregar o Actualizar Producto 0==========
  async AddUpdateProduct(product?: Product) {
    let success = await this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: { product }
    });

    if (success) this.getProduct();

  }
  // ==========0 Confirmar Eliminacion del Producto 0============
  async confirmDeleteProduct(product: Product) {
    this.utilsSvc.PresentAlert({
      header: 'Eliminar Producto!',
      message: '¿Quieres Eliminar este Producto?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',

        }, {
          text: 'Si, Eliminar',
          handler: () => {
            this.deleteProduct(product)
          }
        }
      ]
    });

  }
  //==========0 Eliminar Producto 0=============
  async deleteProduct(product: Product) {

    let path = `user/${this.user().uid}/products/${product.id}`
    const loading = await this.utilsSvc.loading();
    await loading.present();

    //let imagePath = await this.firebaseSvc.getFilePath(product.image);
    //await this.firebaseSvc.deleteFile(imagePath);
    this.firebaseSvc.deleteDocument(path).then(async res => {
      this.products = this.products.filter(p => p.id !== product.id)
      this.utilsSvc.presentToast({
        message: 'Producto Eliminado Exitosamente',
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
