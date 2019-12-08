import { Component, OnInit } from '@angular/core';
import { AutorApiService } from '../autores-api.service';
import { Autor } from '../_models/autor';

@Component({
    selector: 'app-autores',
    templateUrl: './autores.component.html',
    styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {

    data: Autor[] = [];

    constructor(private api: AutorApiService) { }


    ngOnInit() {
        this.api.getAutores()
            .subscribe(res => {
                this.data = res;
            }, err => {
                console.log(err);
            });
    }

    deleteAutor(id, index) {
        this.api.deleteAutor(id)
            .subscribe(res => {
                this.data.splice(index, 1);
            }, (err) => {
                console.log(err);
            }
            );
    }
}
