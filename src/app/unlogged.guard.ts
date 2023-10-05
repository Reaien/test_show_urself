import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnloggedGuard implements CanActivate {
  
  constructor(public navCtrl: NavController){};
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('ingresado')) {
        this.navCtrl.navigateRoot('home'); //caso contrario al guard de logger aquí si está logueado retornara un false para no dejar acceder a las paginas y redireccionar al home
        return false;
      }else{
        return true;
      }
  }
  
}
