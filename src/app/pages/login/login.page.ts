import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; //librerias importadas para crear formulario, controlar y validar registros
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  user: any = {
    usuario:"",
    password:"",
    email:""
  }

  //se le da formato a la variable 
  formularioLogin: FormGroup;

  //contructor publico que se crea a partir del FormBuilder, se le dan parametros que se quieren aplicar en el formlario
  constructor(private dbService: DbserviceService, public fb: FormBuilder, public alertController: AlertController, public navCtrl: NavController, private router: Router) { //modulos a importar

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required), //como será llamado, se le asigna como nuevo objeto new FormControl y se le dan los parametros que estará vacio y que se requiere validar
      'password': new FormControl("",Validators.required)
    })

   }

  ngOnInit() {
  }



  async ingresar(){
    let formulario = this.formularioLogin.value;

    

    //condicional que evalua el estado del local storage y campos vacios
    if (formulario.nombre == "" || formulario.password == "") {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Completa los campos',
        buttons: ['Reintentar'],
        
      });

      await alert.present();  
      return;      
    }



    this.dbService.dbState().subscribe((res: any) => {
      if (res) {
        this.dbService.fetchUsuarios().subscribe((item: any) => {
          this.user = item;
        })
      }
    });  
  


    
  
    if (this.user.nombre == formulario.nombre && this.user.password == formulario.password){
        localStorage.setItem('ingresado','true');
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
  }



