import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerGuard implements CanActivate { //guards que sirven para condicionar en el app-routing que pages estarán o no habilitadas bajo condiciones que pueden colocarse
  
  constructor(public navCtrl: NavController){};
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('ingresado')) {
      return true; //en este caso para el sistema de deteccion de cuenta logueada en el TS del page de login al momento de ingresar creamos un nuevo item
    }else{        //en el local storage el cual ingresamos un dato con un balor booleanoo y al retornar true en el routing utilizando la f canActivate le indicamos que puede activar la page
      this.navCtrl.navigateRoot('inicio');
      return false; //caso contrario retornará falso y este con la f del navcontroller nos devolverá a la page de inicio
    }
  }
  
}
