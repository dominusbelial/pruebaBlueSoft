
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Categoria } from './_models/categoria';
import { environment } from '../environments/environment';

// const apiUrl = "http://localhost:57589/api/Categorias";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriaApiService {

    constructor(private http: HttpClient) { }

    getCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${environment.apiUrl}/api/Categorias`, httpOptions)
            .pipe(
                tap(heroes => console.log('fetched categorias')),
                catchError(this.handleError('getCategorias', []))
            );
    }

    getCategoria(id): Observable<Categoria> {
        const url = `${environment.apiUrl}/api/Categorias/${id}`;
        return this.http.get<Categoria>(url).pipe(
            tap(_ => console.log(`fetched categoria id=${id}`)),
            catchError(this.handleError<Categoria>(`getCategoria id=${id}`))
        );
    }

    addCategoria(categoria): Observable<Categoria> {

        return this.http.post<Categoria>(`${environment.apiUrl}/api/Categorias`, categoria, httpOptions).pipe(
            tap((categoria: Categoria) => console.log(`added categoria w/ id=${categoria.CategoriaId}`)),
            catchError(this.handleError<Categoria>('addCategoria'))
        );
    }

    updateCategoria(id, categoria): Observable<any> {
        const url = `${environment.apiUrl}/api/Categorias/${id}`;
        return this.http.put(url, categoria, httpOptions).pipe(
            tap(_ => console.log(`updated categoria id=${id}`)),
            catchError(this.handleError<any>('updateCategoria'))
        );
    }

    deleteCategoria(id): Observable<Categoria> {
        const url = `${environment.apiUrl}/api/Categorias/${id}`;

        return this.http.delete<Categoria>(url, httpOptions).pipe(
            tap(_ => console.log(`deleted categoria id=${id}`)),
            catchError(this.handleError<Categoria>('deleteCategoria'))
        );
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
