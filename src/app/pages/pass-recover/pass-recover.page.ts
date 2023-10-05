import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pass-recover',
  templateUrl: './pass-recover.page.html',
  styleUrls: ['./pass-recover.page.scss'],
})
export class PassRecoverPage implements OnInit {

  //se le da formato a la variable 
  formularioReset: FormGroup;

  //contructor publico que se crea a partir del FormBuilder, se le dan parametros que se quieren aplicar en el formlario
  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController, private router: Router) { //modulos a importar

    this.formularioReset = this.fb.group({
      'nombre': new FormControl("",Validators.required), //como será llamado, se le asigna como nuevo objeto new FormControl y se le dan los parametros que estará vacio y que se requiere validar
      'password': new FormControl("",Validators.required)
    })

   }
  ngOnInit() {
  }



  async resetear(){
    let formularioReset = this.formularioReset.value; //obtener datos del form

    let userString = localStorage.getItem('user');

    if (userString !== null) {
      let user = JSON.parse(userString); //user contiene los datos del localStorage parseados a string

      if (formularioReset.nombre == "" || formularioReset.password == "" || userString == null) {
        const alert = await this.alertController.create({
          header: 'Sin datos ingresados',
          message: 'Completa los campos',
          buttons: ['Reintentar'],
          
        });
  
        await alert.present();  
        return;      
      }



      if (user.nombre == formularioReset.nombre) { // condiciono la función esperando que user del localstorage y del form sean iguales

        user.password = formularioReset.password 
        //como me traigo todo el user, solo le digo que ahora el user password sea igual al del formulario lol

        localStorage.setItem('user', JSON.stringify(user)); //vuelvo a setear el objeto
        //a futuro es importante saber que no estoy iterando por mas de 1 usuario
        //si es que hubiera mas de 1 cuenta, debo recorrer todo con un for

        const alert = await this.alertController.create({
          header: 'Password Reestablecida',
          buttons: ['Redirigiendo al inicio'],
        });
        this.navCtrl.navigateRoot('inicio'); //nav controller libreria que permite redireccionar al cumplirse condiciones
        await alert.present(); 
      }else{
        const alert = await this.alertController.create({ //boton con funcion await asincrona para el metodo invalid 
          header: 'Error de usuario',
          message: 'Usuario no registrado',
          buttons: ['Reintentar'],
        });
    
        await alert.present();  
        return;
      }
    
    }



  }


}
