import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
@Component({
standalone: true,
selector: 'app-listadeautores',
templateUrl: './listadeautores.component.html',
styleUrls: ['./listadeautores.component.css'],
imports: [CommonModule]
})
export class ListadeautoresComponent {
autores: any[] = [];
constructor(private http: HttpClient) {}
obtenerAutores() {
const url = 'http://localhost:3000/api/autores'; // Cambia esto por la URL de tu backend
this.http.get<any[]>(url).subscribe({
next: (data) => {
this.autores = data; // Almacenar los datos recibidos
},
error: (error) => {
console.error('Error al obtener los datos:', error);
}
});
}
}
