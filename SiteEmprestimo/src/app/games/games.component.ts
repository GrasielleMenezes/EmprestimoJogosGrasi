import { join } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { faFileMedical } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { GamesService } from '../games.service';
import { take } from 'rxjs/operators';

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
    nomeUsuario:string;
    dataEmprestimo:string;
}
@Component({
    templateUrl: './games.component.html',
    providers: [NgbCarouselConfig]
})
export class GamesComponent implements OnInit {
    title = 'Meus Games';
    gameEmprestado: Game = {
        idGame: 0,
        nomeGame: ''
    };
    gameEmprestadoSalvo: Emprestimo = {
        idGame: 0,
        idLogin: 0,
        nomeUsuario:'',
        dataEmprestimo:''
    }
    game: {
        idGame: number,
        nomeGame: string,
        enderecoImagem: string
    }[] = new Array<JogosDisponiveis>();

    gameDisponiveis: {
        idGame: number,
        nomeGame: string,
        enderecoImagem: string
    }[] = new Array<JogosDisponiveis>();

    gameNaoDisponiveis: {
        idGame: number,
        idLogin: number
    }[] = new Array<Emprestimo>();

    closeResult: string = '';
    modalOptions: NgbModalOptions | undefined;
    nomeUsuario:string='';
    rotaSegment = new Array<UrlSegment>();
    constructor(config: NgbCarouselConfig, private modalService: NgbModal, private router: Router, private service: GamesService, private routerA:ActivatedRoute) {
        // 
        config.interval = 2000;
        config.keyboard = true;
        config.pauseOnHover = true;
        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop'
        }
    }
    async ngOnInit(): Promise<any> {
        await this.inicializacao();
        this.rotaSegment = this.routerA.snapshot.url;
        this.nomeUsuario = this.rotaSegment[1].path;
    }
    deslogar(){
        this.nomeUsuario = '';
        this.router.navigate(['/login']);
      }
    async inicializacao() {

        this.game = [];
        this.gameNaoDisponiveis = [];
        await this.games();
        await this.gamesJaEmprestados();
        await this.delay(3000);
        if (this.gameNaoDisponiveis.length != 0) {
            this.modificarQuantidadeJogos();
        }
        else {
            this.gamesDisponiveis();

        }

    }
    async renderizar() {

        this.delay(5000);
        if (this.gameNaoDisponiveis.length != 0) {
            this.modificarQuantidadeJogos();
        }
        else {
            this.gamesDisponiveis();

        }
    }
    private delay(ms: number): Promise<void> {
        return new Promise<void>(resolve =>
            setTimeout(resolve, ms));
    }
    open(content: any) {
        this.modalService.open(content, this.modalOptions).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
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
    cancelar() {
        this.gameEmprestadoSalvo = {
            idLogin: 0,
            idGame: 0,
            nomeUsuario:'',
            dataEmprestimo:''
        };
    }
     dataAtualFormatada(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }
    emprestar() {
        
        let data = this.dataAtualFormatada().toString();
        this.gameEmprestadoSalvo = {
            idLogin: 2,
            idGame: this.gameEmprestado.idGame,
            nomeUsuario:this.nomeUsuario,
            dataEmprestimo:data
        };
        this.service.AddEmprestimo(this.gameEmprestadoSalvo).subscribe(
            emp => {  window.location.reload(); },
            error => { }
        );
    }
    async games() {
        await this.service.listaGames().subscribe(
            users => {
                users.forEach((jogos: { idGame: any; nomeGame: any; }) => {

                    this.game.push({
                        idGame: jogos.idGame,
                        nomeGame: jogos.nomeGame,
                        enderecoImagem: "../assets/dragao.jpg"
                    })
                });
            },
            error => { }
        );
    }
    async gamesJaEmprestados() {
        await this.service.listaJaEmprestado().subscribe(
            users => {
                if (users.length > 0) {
                    users.forEach((jogos: { idGame: any; idLogin: any }) => {

                        this.gameNaoDisponiveis.push({
                            idGame: jogos.idGame,
                            idLogin: jogos.idLogin
                        })
                    });
                }


            },
            error => { }
        );
    }
    async gamesDisponiveis() {
        this.gameDisponiveis = [];
        this.game.forEach((j: { idGame: number; nomeGame: string; enderecoImagem: string; }) => {
            this.gameDisponiveis.push({
                idGame: j.idGame,
                nomeGame: j.nomeGame,
                enderecoImagem: j.enderecoImagem
            });
        });
    }
    async modificarQuantidadeJogos() {
        this.gameDisponiveis = [];
        let c = this.game.filter(item => !this.gameNaoDisponiveis.some(other => item.idGame === other.idGame));

        c.forEach(element => {
            this.gameDisponiveis.push({
                idGame: element.idGame,
                nomeGame: element.nomeGame,
                enderecoImagem: element.enderecoImagem
            })
        });
    }


    pegarGame(numero: number) {

        this.gameDisponiveis.forEach(ga => {
            if (numero == ga.idGame) {
                this.gameEmprestado = {
                    idGame: ga.idGame,
                    nomeGame: ga.nomeGame
                }
            }
        });
    }
    getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

}