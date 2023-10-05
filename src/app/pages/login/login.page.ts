import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; //librerias importadas para crear formulario, controlar y validar registros
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  user={
    usuario:"",
    password:""
  }

  //se le da formato a la variable 
  formularioLogin: FormGroup;

  //contructor publico que se crea a partir del FormBuilder, se le dan parametros que se quieren aplicar en el formlario
  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController, private router: Router) { //modulos a importar

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required), //como será llamado, se le asigna como nuevo objeto new FormControl y se le dan los parametros que estará vacio y que se requiere validar
      'password': new FormControl("",Validators.required)
    })

   }

  ngOnInit() {
  }



  async ingresar(){
    let formulario = this.formularioLogin.value;

    let userString = localStorage.getItem('user');

    //condicional que evalua el estado del local storage y campos vacios
    if (formulario.nombre == "" || formulario.password == "" || userString == null) {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Completa los campos',
        buttons: ['Reintentar'],
        
      });

      await alert.present();  
      return;      
    }

    //la condicional aquí comienza evaluando desde el comienzo si el local storage tiene valores
    if (userString!== null) {
      let user = JSON.parse(userString);
      //RECORDATORIO ver si puedo crear aqui el state con el user que ya obtiene el objeto del local storage transformado a string
    
      if (user.nombre == formulario.nombre && user.password == formulario.password){
          localStorage.setItem('ingresado','true');
        }else{
          const alert = await this.alertController.create({
            header: 'Datos incorrectos',
            message: 'Ingresa los datos correctos',
            buttons: ['Reintentar'],
            
          });

          await alert.present();  
          return;
        }
    }

    let navigationExtras : NavigationExtras={
      state:{
        user: this.user
      }
    }

    this.router.navigate(['/splash'],navigationExtras);

  }

}
