import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Firebase } from '../services/firebase';
import { Utils } from '../services/utils';
import { getAuth } from 'firebase/auth';

export const noAuthGuard: CanActivateFn = (route, state) => {
 const firebaseSvc = inject(Firebase);
const utilsSvc = inject(Utils);

let user = localStorage.getItem('user')
  return new Promise((resolve) => {
    firebaseSvc.getAuth().onAuthStateChanged((auth=>{
      if(!auth) resolve(true);
      else{
        utilsSvc.routerLink('/main/home');
        resolve(false);
      }
    }));
  })
};
