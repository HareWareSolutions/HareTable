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

  dadosCliente = {
    nome: '',
    telefone: '',
    cpf: '',
    endereco: '',
    tipoEntrega: '',
    troco: null,
    observacao: '',
    pagamento: ''
  };

  carrinho: any[] = [];
  carrinhoAberto = false;

  mostrarModal = false;

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

adicionar(produto: any) {
  const existente = this.carrinho.find(p => p.id_produto === produto.id_produto);
  if (existente) {
    existente.quantidade += 1;
  } else {
    this.carrinho.push({ ...produto, quantidade: 1 });
  }
}

  incrementarQuantidade(produto: any) {
    const item = this.carrinho.find(p => p.id === produto.id);
    if (item) {
      item.quantidade += 1;
    }
  }

  decrementarQuantidade(produto: any) {
    const existente = this.carrinho.find(p => p.id_produto === produto.id_produto);
    if (existente) {
      existente.quantidade -= 1;
      if (existente.quantidade <= 0) {
        this.carrinho = this.carrinho.filter(p => p.id_produto !== produto.id_produto);
      }
    }
  }

  removerDoCarrinho(produto: any) {
    this.carrinho = this.carrinho.filter(p => p.id !== produto.id);
  }

  calcularTotal() {
    return this.carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }

  toggleCarrinho() {
    this.carrinhoAberto = !this.carrinhoAberto;
  }


  abrirModal() {
  this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  atualizarTipoEntrega() {
    if (this.dadosCliente.tipoEntrega === 'Retirada') {
      this.dadosCliente.endereco = '';
    }
  }

  finalizarPedido() {
    // if (!this.dadosCliente.nome || !this.dadosCliente.telefone || !this.dadosCliente.endereco || !this.dadosCliente.pagamento) {
    //   alert('É obrigatorio prencher todos os campos.');
    //   return;
    // }

    const pedidoFinal = {
      cliente: { ...this.dadosCliente },
      produtos: [...this.carrinho],
      total: this.calcularTotal()
    };

    console.log('Pedido enviado:', pedidoFinal);

    // Aqui você pode futuramente enviar para uma API ou WhatsApp
    // alert('Pedido confirmado! Obrigado pela preferência 😊');

    // // Resetar
    // this.carrinho = [];
    // this.fecharModal();
  }

  calcularTotalCarrinho(): number {
    return this.carrinho.reduce((total, item) => {
      return total + (parseFloat(item.preco) * item.quantidade);
    }, 0);
  }


}
