import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; //librerias importadas para crear formulario, controlar y validar registros
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  user: any = [
    {
      usuario:"",
      password:"",
      email:""
    }
  ]

  //se le da formato a la variable 
  formularioLogin: FormGroup;

  //contructor publico que se crea a partir del FormBuilder, se le dan parametros que se quieren aplicar en el formlario
  constructor(public toastController: ToastController ,private dbService: DbserviceService, public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController, private router: Router) { //modulos a importar

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required), //como será llamado, se le asigna como nuevo objeto new FormControl y se le dan los parametros que estará vacio y que se requiere validar
      'password': new FormControl("",Validators.required)
    })

   }

  ngOnInit() {
    this.dbService.dbState().subscribe((res: any) => {
      if (res) {
        this.dbService.fetchUsuarios().subscribe((item: any) => {
          this.user = item;
        })
      }
    });
    this.presentToast(this.user.usuario);
  }



  async ingresar(){

  let formulario = this.formularioLogin.value;
  //extraer dato del user y pasarlo a string para que tambien se compare con la pass
  
  if (this.user.usuario = formulario.nombre){
      const alert = await this.alertController.create({
        message: 'Ingresado',
      });
      await alert.present();
      this.router.navigate(['/inicio'])
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
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 10000
    });
    toast.present();
  }  

}



