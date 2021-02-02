import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalDismissReasons, NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { GamesService } from "../games.service";
import { GamesComponent } from "../games/games.component";

interface Game {
  idGame: number;
  nomeGame: string;
}
interface JogosDisponiveis {
  idGame: number;
  nomeGame: string;
  enderecoImagem: string;
}
interface Emprestimo {
  idGame: number;
  idLogin: number;
  nomeUsuario: string;
  dataEmprestimo: string;
}
interface Usuario {
  idUsuario: number;
  nome: string;
}
interface UsuarioEnvio {
  nome: string;
  senha: string;
}
interface GameEnvio {
  nomeGame: string;
}
interface GamesNaoDisponiveis{
  idGame: number;
  idLogin: number;
  nomeUsuario: string;
  dataEmprestimo: string;
  nomeGame: ''
}

@Component({
  templateUrl: './administracao.component.html'
})
export class AdministracaoComponent implements OnInit {
  usuarioEnvio: UsuarioEnvio = {
    nome: "",
    senha: ""
  }
  gameEnvio: GameEnvio = {
    nomeGame: ""
  }
  emprestimoEnvio: Emprestimo = {
    idGame: 0,
    idLogin: 0,
    nomeUsuario: '',
    dataEmprestimo: ''
  }
  gameMostrarNaoDisponivel: {
    idGame: number,
    idLogin: number,
    nomeUsuario: string,
    dataEmprestimo: string,
    nomeGame: string
  }[] = new Array<GamesNaoDisponiveis>();
  game: {
    idGame: number,
    nomeGame: string,
    enderecoImagem: string
  }[] = new Array<JogosDisponiveis>();
  usuarios: {
    idUsuario: number,
    nome: string
  }[] = new Array<Usuario>();
  gameNaoDisponiveis: {
    idGame: number,
    idLogin: number,
    nomeUsuario: string,
    dataEmprestimo: string
  }[] = new Array<Emprestimo>();
  gameAlugados: {
    idGame: number,
    nomeGame: string,
    enderecoImagem: string
  }[] = new Array<JogosDisponiveis>();
  modalOptions: NgbModalOptions | undefined;
  closeResult: string = '';
  form: FormGroup = this.formBuilder.group({
    nome: '',
    senha: ''
  });
  formGame: FormGroup = this.formBuilder.group({
    nomeGame: ''
  });
  constructor(private router: Router, private service: GamesService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    }
  }
  ngOnInit() {
    this.games();
    this.gamesJaEmprestados();
    this.listaUsuarios();
    this.form = this.formBuilder.group({
      nome: '',
      senha: ''
    });
    this.formGame = this.formBuilder.group({
      nomeGame: ''
    });
  }
  deslogar(){
    this.router.navigate(['/login']);
  }
  async games() {
    await this.service.listaGames().subscribe(
      users => {
        users.forEach((jogos: { idGame: any; nomeGame: any; }) => {

          this.game.push({
            idGame: jogos.idGame,
            nomeGame: jogos.nomeGame,
            enderecoImagem: "../assets/game" + jogos.idGame + ".jpg"
          })
        });
      },
      error => { }
    );
  }
  async listaUsuarios() {
    await this.service.listaUsuarios().subscribe(
      users => {
        users.forEach((usuarios: { idUsuario: any; nome: any; }) => {

          this.usuarios.push({
            idUsuario: usuarios.idUsuario,
            nome: usuarios.nome
          })
        });
      },
      error => {  }
    );
  }
  async gamesJaEmprestados() {
    await this.service.listaJaEmprestado().subscribe(
      users => {
        if (users.length > 0) {
          users.forEach((jogos: { idGame: any; idLogin: any, nomeUsuario: any, dataEmprestimo: any }) => {



            this.gameNaoDisponiveis.push({
              idGame: jogos.idGame,
              idLogin: jogos.idLogin,
              nomeUsuario: jogos.nomeUsuario,
              dataEmprestimo: jogos.dataEmprestimo
            })
            this.game.forEach(element => {
              if (element.idGame == jogos.idGame) {
                this.gameMostrarNaoDisponivel.push({
                  idGame: jogos.idGame,
                  idLogin: jogos.idLogin,
                  nomeUsuario: jogos.nomeUsuario,
                  dataEmprestimo: jogos.dataEmprestimo,
                  nomeGame: element.nomeGame
                })
              }
            });
          });
          this.modificarQuantidadeJogos();
        }


      },
      error => { }
    );
  }
  async modificarQuantidadeJogos() {
    let c = this.game.filter(item => this.gameNaoDisponiveis.some(other => item.idGame === other.idGame));
    c.forEach(element => {
      this.gameAlugados.push({
        idGame: element.idGame,
        nomeGame: element.nomeGame,
        enderecoImagem: element.enderecoImagem
      })
    });
  }
  incluirUsuario() {
    this.usuarioEnvio.nome = this.form.value.nome;
    this.usuarioEnvio.senha = this.form.value.senha;
    this.service.AddUsuario(this.usuarioEnvio).subscribe(
      users => {  window.location.reload(); },
      error => { }
    );
  }
  cancelar() {

  }
  excluirUsuario(nome: string) {
    this.usuarioEnvio.nome = nome;
    this.service.ExcluiUsuario(this.usuarioEnvio).subscribe(
      users => {  window.location.reload(); },
      error => { }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  open(content: any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  AddGame() {
    this.gameEnvio.nomeGame = this.formGame.value.nomeGame;
    this.service.AddGame(this.gameEnvio).subscribe(
      users => {  window.location.reload(); },
      error => { }
    );
  }
  excluiGame(nome: string) {
    this.gameEnvio.nomeGame = nome;
    this.service.ExcluiGame(this.gameEnvio).subscribe(
      users => {  window.location.reload(); },
      error => {  }
    );
  }
  excluiEmprestimo(id: number) {
    this.emprestimoEnvio.idGame = id;
    this.service.ExcluiEmprestimo(this.emprestimoEnvio).subscribe(
      users => {  window.location.reload(); },
      error => {  }
    );
  }
}