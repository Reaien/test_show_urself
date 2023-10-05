import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; //librerias importadas para crear formulario, controlar y validar registros
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //variable con formato de formGroup
  formularioRegistro: FormGroup;

  //contructor publico que se crea a partir del FormBuilder, se le dan parametros que se quieren aplicar en el formlario
  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController, private router: Router) { //tambien se importa un public AlertController para la funcion async que utiliza este metodo
      this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("",Validators.required), //como será llamado, se le asigna como nuevo objeto new FormControl y se le dan los parametros que estará vacio y que se requiere validar
      'password': new FormControl("",Validators.required),
      'confirmacion-password': new FormControl("",Validators.required),
      'email': new FormControl("",Validators.required)
    });
   }

  ngOnInit() {
  }

  //se crea la función de registro
  async registrar(){
    let formulario = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({ //boton con funcion await asincrona para el metodo invalid 
        header: 'Error de registro',
        message: 'Debes llenar todos los datos',
        buttons: ['Reintentar'],
      });
  
      await alert.present();  
      return;    
    }else{
      const alert = await this.alertController.create({
        header: 'Usuario Registrado',
        buttons: ['Redirigiendo al inicio'],
      });
      this.navCtrl.navigateRoot('inicio'); //nav controller libreria que permite redireccionar al cumplirse condiciones
      await alert.present();  
    }

    let user = { //se crea una variable que contiene un diccionario json con los datos de cada atributo del formulario el cual al comienzo lo pasamos a un let formulario
      nombre: formulario.nombre,
      password: formulario.password,
      email: formulario.email
    }



    localStorage.setItem('user',JSON.stringify(user)) //guardamos en localStorage los datos de cada atributo pasandolo a texto

  }

}
