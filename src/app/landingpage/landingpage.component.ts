import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/interfaces/produto.interface';
import { ToastrService } from 'ngx-toastr'; // Se estiver usando ngx-toastr

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})


export class LandingpageComponent implements OnInit {
  lanches: Produto[] = [];
  bebidas: Produto[] = [];
  dogs: Produto[] = [];
  erro: string = '';

  constructor(
    private produtoService: ProdutoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
  this.carregarPorCategoria('lanche', 'lanches');
  this.carregarPorCategoria('bebidas', 'bebidas');
  this.carregarPorCategoria('dogs', 'dogs');
}

private carregarPorCategoria(categoria: string, destino: 'lanches' | 'bebidas' | 'dogs'): void {
  this.produtoService.getProdutosPorCategoria(categoria).subscribe(
    (response: Produto[]) => {
      this[destino] = response.map(produto => ({
        ...produto,
        imagemUrl: produto.imagem ? `http://localhost:5000${produto.imagem}` : ''
      }));
      console.log(this[destino], categoria);
    },
    (error) => {
      this.erro = 'Erro ao carregar produtos';
      console.error(`Erro ao carregar produtos da categoria ${categoria}:`, error);
    }
  );
}



}
