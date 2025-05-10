import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private apiUrl = 'http://192.168.99.104:5000/api'; // mesmo padrão do MesaService

  constructor(private http: HttpClient) {}

  // Método para fazer login
  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, senha });
  }

  // Você pode adicionar outros métodos futuramente, como logout, registro, etc.
}