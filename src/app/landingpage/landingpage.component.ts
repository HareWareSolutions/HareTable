import { Component } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {
  today: Date = new Date(); // Agora o pipe funciona no HTML
  produtos = [
    { nome: 'Produto 1', descricao: 'Descrição breve do produto.', preco: 99.90, imagem: 'https://via.placeholder.com/150' },
    { nome: 'Produto 2', descricao: 'Descrição breve do produto.', preco: 149.90, imagem: 'https://via.placeholder.com/150' },
    { nome: 'Produto 3', descricao: 'Descrição breve do produto.', preco: 199.90, imagem: 'https://via.placeholder.com/150' }
  ];
}
