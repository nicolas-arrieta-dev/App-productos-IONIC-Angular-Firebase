import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { Utils } from './utils';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import {getStorage, uploadString, ref, getDownloadURL, deleteObject} from 'firebase/storage'
//import { query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class Firebase {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
  uitlsSvc = inject(Utils)

  // ======================0 AUTENTICACION 0=====================
  getAuth(){
    return getAuth();
  }

  // ======================0 SIGN IN 0===========================
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  // ======================0 CREAR USUARIO 0===========================
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }
  //===========================0 Autorizar usuario 0==================
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }

   //========================0 manda email para restablecer la contraseña 0 =============
  sendRevoceryEmail(email:string){
    return sendPasswordResetEmail(getAuth(),email );
  }
  //=========================0 Cerrar session 0===========================
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.uitlsSvc.routerLink('/auth')
  }
  //===========================0 Base de datos 0=====================


  // ==================0 Obtener documentos de la colecion 0==========

  getCollectionData(path: string, collectionQuery?:any){
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, ...collectionQuery), {idField: 'id'});
  }

  //========================0 setear un documento 0 =============
  setDocument(path: string, data: any ) {
    return setDoc(doc(getFirestore(), path), data)
  }
  //========================0 Actualizar un documento 0 =============
  updateDocument(path: string, data: any ) {
    return updateDoc(doc(getFirestore(), path), data)
  }
    //========================0 Borrar un documento 0 =============
  deleteDocument(path: string ) {
    return deleteDoc(doc(getFirestore(), path));
  }

  //===================0 obtener un documento 0=================
 async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  // =================0 Agrergar Docuemtno 0==========
  addDocument(path: string, data: any ) {
    return addDoc(collection(getFirestore(), path), data)
  }

  // ===============0 Almacenamiento 0===========

  // =============0 Subir Imagen 0=========
  async uploadImage(path: string, data_url:string){
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })
  }
  // ============0 Obtener ruta de la imagen con usu url 0==========
   async  getFilePath(url: string){
    return ref(getStorage(),url).fullPath
   }

   //===========0 Eliminar Archivo 0==========
   deleteFile(path:string){
    return deleteObject(ref(getStorage(), path));
   }
}
