import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-comphome',
  templateUrl: './comphome.component.html',
  styleUrls: ['./comphome.component.scss'],
})
export class ComphomeComponent  implements OnInit {

  swiperModules = [IonicSlides];

  slides: any[] = [];
  genreSlides: any[] = [];

  data: any;

  constructor(private activateRoute: ActivatedRoute, private router: Router) {
    this.activateRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data = this.router.getCurrentNavigation()?.extras.state?.['user'];
        console.log(this.data);
        this.router.navigate(["/home/main"]);
      }else{
        this.router.navigate(["/inicio"]);
      }
    });
   }

  ngOnInit():  void{

    this.slides = [
      {banner: '../../../assets/img/artista1.png'},
      {banner: '../../../assets/img/artista2.jpg'},
      {banner: '../../../assets/img/artista3.jpg'},
      {banner: '../../../assets/img/artista4.jpg'},
      {banner: '../../../assets/img/artista5.jpg'},
      {banner: '../../../assets/img/artista6.png'},
    ]

    this.genreSlides = [
      {genre: '../../../assets/img/icon-genero1.jpg'},
      {genre: '../../../assets/img/icon-genero2.jpg'},
      {genre: '../../../assets/img/icon-genero3.jpg'},
      {genre: '../../../assets/img/icon-genero4.jpg'},
      {genre: '../../../assets/img/icon-genero5.jpg'},
      {genre: '../../../assets/img/icon-genero6.jpg'},
      {genre: '../../../assets/img/icon-genero7.jpg'},
      {genre: '../../../assets/img/icon-genero8.jpg'},
    ]

  }



}
