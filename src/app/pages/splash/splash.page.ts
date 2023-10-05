import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  data: any;


  constructor(private activateRoute: ActivatedRoute, public router: Router) {

    this.activateRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data = this.router.getCurrentNavigation()?.extras.state?.['user'];
        console.log(this.data);
        let navigationExtras : NavigationExtras={
          state:{
            user: this.data
          }
        }
        setTimeout(() => {
          this.router.navigate(['/home'],navigationExtras);
        }, 4000);
      }else{
        this.router.navigate(["/inicio"]);
      }
    });
   }
  ngOnInit() {
  }




}
