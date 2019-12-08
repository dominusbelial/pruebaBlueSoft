import { Component, OnInit } from '@angular/core';
import { LibroApiService } from '../libros-api.service';
import { Libro } from '../_models/libro';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
    data: Libro[] = [];
    constructor(private api: LibroApiService) { }
    ngOnInit() {
        this.api.getLibros()
            .subscribe(res => {
                this.data = res;
            }, err => {
                console.log(err);
            });
    }
    onKey(event: any) { // without type info

        this.api.getLibrosHome(event.target.value)
            .subscribe(res => {
                this.data = res;
            }, err => {
                console.log(err);
            });
    }
}
