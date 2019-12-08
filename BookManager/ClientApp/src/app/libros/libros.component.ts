import { Component, OnInit } from '@angular/core';
import { LibroApiService } from '../libros-api.service';
import { Libro } from '../_models/libro';

@Component({
    selector: 'app-libros',
    templateUrl: './libros.component.html',
    styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

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

    deleteLibro(id, index) {
        this.api.deleteLibro(id)
            .subscribe(res => {
                this.data.splice(index, 1);
            }, (err) => {
                console.log(err);
            }
            );
    }
}
