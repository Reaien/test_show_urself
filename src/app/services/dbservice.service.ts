import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Genero } from '../classes/genero'
import { Usuario } from '../classes/usuario'
import { Video} from '../classes/video'

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  public database!: SQLiteObject;
  tblGeneros: string = "CREATE TABLE IF NOT EXISTS genero(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL)"
  listaGeneros = new BehaviorSubject<Genero[]>([]);
  tblUsuarios: string = "CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY autoincrement, user VARCHAR(50) NOT NULL, password VARCHAR(16) NOT NULL, email VARCHAR(50) NOT NULL)"
  listaUsuarios = new BehaviorSubject<Usuario[]>([]);
  tblVideos: string = "CREATE TABLE IF NOT EXISTS video(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, observacion VARCHAR(130) NOT NULL)"
  listaVideos = new BehaviorSubject<Video[]>([]);
  private isDbReady:
    BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    public toastController: ToastController
  ) { 
    this.crearBD();
  }

  /* crear BD o cargar la existente */
  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'showurself.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentToast("BD Creada");
        //crear tablas
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    })
  }
  //fin crear db


  //crear tablas//
  async crearTablas(){
    try{
      //crear tabla genero y traer datos en lista generos por cargarGenero() para ser utilizada
      await this.database.executeSql(this.tblGeneros, []);
      this.presentToast("Tabla Generos Creada");
      this.cargarGeneros();
      //crear tabla usuario y traer datos en lista generos por cargarGenero() para ser utilizada
      await this.database.executeSql(this.tblUsuarios, []);
      this.presentToast("Tabla Usuario Creada");
      this.cargarUsuarios();
      //crear tabla video y traer datos en lista generos por cargarGenero() para ser utilizada
      await this.database.executeSql(this.tblGeneros, []);
      this.presentToast("Tabla Videos Creada");
      this.cargarVideos();      
      this.isDbReady.next(true);
    } catch (error) {
      this.presentToast("Error en crear tabla: " + error);
    }
  }
  //fin crear tablas//

  //obtener select * from en una lista y luego pasarla al crearTablas para tener la info a disposición
  cargarGeneros(){
    let itemGenero: Genero[] = [];
    this.database.executeSql('SELECT * FROM genero', []).then(res => {
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          itemGenero.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre
          });
        }
      }
    });
    this.listaGeneros.next(itemGenero);
  }
  //fin obtener select * from generos y almacenarlo en lista para cargarlo en crearTabla


  //obtener select * from en una lista y luego pasarla al crearTablas para tener la info a disposición
  cargarUsuarios(){
    let itemUsuario: Usuario[] = [];
    this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          itemUsuario.push({
            id: res.rows.item(i).id,
            user: res.rows.item(i).user,
            password: res.rows.item(i).password,
            email: res.rows.item(i).email
          });
        }
      }
    });
    this.listaUsuarios.next(itemUsuario);
  }
  //fin obtener select * from generos y almacenarlo en lista para cargarlo en crearTabla



      //obtener select * from en una lista y luego pasarla al crearTablas para tener la info a disposición
  cargarVideos(){
    let itemVideo: Video[] = [];
    this.database.executeSql('SELECT * FROM video', []).then(res => {
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          itemVideo.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            observacion: res.rows.item(i).observacion
          });
        }
      }
    });
    this.listaVideos.next(itemVideo);
  }
  //fin obtener select * from generos y almacenarlo en lista para cargarlo en crearTabla


  //proximamente add update y delete para las tablas//


  //verifica la suscripcion del observable
  dbState() {
    return this.isDbReady.asObservable();
  }
  //observers para cargar nueva info de las tablas y actualizar las listas//
  fetchGeneros(): Observable<Genero[]> {
    return this.listaGeneros.asObservable();
  }
  fetchUsuarios(): Observable<Usuario[]> {
    return this.listaUsuarios.asObservable();
  }
  fetchVideos(): Observable<Video[]> {
    return this.listaVideos.asObservable();
  }



  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 4000
    });
    toast.present();
  }  


}
