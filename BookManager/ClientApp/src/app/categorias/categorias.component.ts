import { Component, OnInit } from '@angular/core';
import { CategoriaApiService } from '../categorias-api.service';
import { Categoria } from '../_models/categoria';

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

    data: Categoria[] = [];

    constructor(private api: CategoriaApiService) { }


    ngOnInit() {
        this.api.getCategorias()
            .subscribe(res => {
                this.data = res;
            }, err => {
                console.log(err);
            });
    }

    deleteCategoria(id, index) {
        this.api.deleteCategoria(id)
            .subscribe(res => {
                this.data.splice(index, 1);
            }, (err) => {
                console.log(err);
            }
            );
    }
}
