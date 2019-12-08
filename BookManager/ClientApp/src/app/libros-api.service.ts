import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Libro } from './_models/libro';
import { environment } from '../environments/environment';

// const apiUrl = "http://localhost:57589/api/Libros";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class LibroApiService {

    constructor(private http: HttpClient) { }

    getLibros(): Observable<Libro[]> {
        return this.http.get<Libro[]>(`${environment.apiUrl}/api/Libros?$expand=Categoria,Autor`, httpOptions)
            .pipe(
                tap(heroes => console.log('fetched libros')),
                catchError(this.handleError('getLibros', []))
            );
    }
    getLibrosHome(nombre): Observable<Libro[]> {
        return this.http.get<Libro[]>(`${environment.apiUrl}/LibrosHome/Get/${nombre}`, httpOptions)
        //return this.http.get<Libro[]>(`${environment.apiUrl}/LibrosHome/Get?$expand=categoria,autor&$filter=contains(nombre, '${nombre}') or contains(autor/nombre, '${nombre}') or contains(categoria/nombre, '${nombre}') `, httpOptions)
            .pipe(
                tap(heroes => console.log('fetched libros')),
                catchError(this.handleError('getLibros', []))
            );
    }

    getLibro(id): Observable<Libro> {
        const url = `${environment.apiUrl}/api/Libros/${id}`;
        return this.http.get<Libro>(url).pipe(
            tap(_ => console.log(`fetched libro id=${id}`)),
            catchError(this.handleError<Libro>(`getLibro id=${id}`))
        );
    }

    addLibro(libro): Observable<Libro> {

        return this.http.post<Libro>(`${environment.apiUrl}/api/Libros`, libro, httpOptions).pipe(
            tap((libro: Libro) => console.log(`added libro w/ id=${libro.LibroId}`)),
            catchError(this.handleError<Libro>('addLibro'))
        );
    }

    updateLibro(id, libro): Observable<any> {
        const url = `${environment.apiUrl}/api/Libros/${id}`;
        return this.http.put(url, libro, httpOptions).pipe(
            tap(_ => console.log(`updated libro id=${id}`)),
            catchError(this.handleError<any>('updateLibro'))
        );
    }

    deleteLibro(id): Observable<Libro> {
        const url = `${environment.apiUrl}/api/Libros/${id}`;

        return this.http.delete<Libro>(url, httpOptions).pipe(
            tap(_ => console.log(`deleted libro id=${id}`)),
            catchError(this.handleError<Libro>('deleteLibro'))
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
