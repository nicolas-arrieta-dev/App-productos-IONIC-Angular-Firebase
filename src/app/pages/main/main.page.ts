import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Firebase } from 'src/app/services/firebase';
import { Utils } from 'src/app/services/utils';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: false,
})
export class MainPage implements OnInit {

  pages = [
    { title: 'Inicio', url: '/main/home', icon: 'home-outline' },
    { title: 'Perfil', url: '/main/profile', icon: 'person-outline' },
  ]

  router = inject(Router);
  firebaseSvc = inject(Firebase);
  utilsSvc = inject(Utils);
  currentPath: string = ''

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event.url;
    })
  }

  // ======0 Cerrar sesion 0=======

  signOut() {
    this.firebaseSvc.signOut();
  }
  user(): User {
    return this.utilsSvc.getFormLocalStorage('user');
  }

}
