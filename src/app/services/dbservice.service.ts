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


  //función para hacer insert en tabla generos
  async addGenero(nombre: any){
    let data = [nombre];
    await this.database.executeSql('INSERT INTO genero(nombre) VALUES(?)', data)
    this.cargarGeneros();
  }
  //fin insert genero

  //función update genero
  async updateGenero(id: any, nombre: any){
    let data = [nombre, id];
    await this.database.executeSql('UPDATE genero SET nombre=? WHERE id=?', data);
    this.cargarGeneros();
  }
  //fin update genero


  //función para borrar genero
  async deleteGenero(id: any){
    await this.database.executeSql('DELETE FROM genero WHERE id=?', [id]);
    this.cargarGeneros();
  }
  //funcion para borrar genero





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
  //fin obtener select * from usuario y almacenarlo en lista para cargarlo en crearTabla


  //función para hacer insert en tabla usuario
  async addUsuario(user: any, password: any, email: any){
    let data = [user, password, email];
    await this.database.executeSql('INSERT INTO usuario(user, password, email) VALUES(?,?,?)', data)
    this.cargarUsuarios();
  }
  //fin insert usuario

  //función update usuario
  async updateUsuario(id: any, user: any, password: any, email: any){
    let data = [user, password, email, id];
    await this.database.executeSql('UPDATE usuario SET user=?, password=?, email=?, WHERE id=?', data);
    this.cargarUsuarios();
  }
  //fin update usuario

  //función para borrar usuario
  async deleteUsuario(id: any){
    await this.database.executeSql('DELETE FROM usuario WHERE id=?', [id]);
    this.cargarUsuarios();
  }
  //funcion para borrar usuario


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
  //fin obtener select * from video y almacenarlo en lista para cargarlo en crearTabla

  //función para hacer insert en tabla video
  async addVideo(nombre: any, observacion: any){
    let data = [nombre, observacion];
    await this.database.executeSql('INSERT INTO video(nombre, observacion) VALUES(?,?)', data)
    this.cargarVideos();
  }
  //fin insert video


  //función update video
  async updateVideo(id: any, nombre: any, observacion: any){
    let data = [nombre, observacion, id];
    await this.database.executeSql('UPDATE video SET nombre=?, observacion=?, WHERE id=?', data);
    this.cargarVideos();
  }
  //fin update video

  //función para borrar usuario
  async deleteVideo(id: any){
    await this.database.executeSql('DELETE FROM video WHERE id=?', [id]);
    this.cargarVideos();
  }
  //funcion para borrar usuario  


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
