import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
interface Login {
  nome: string;
  senha: string;
}
interface Filme {
  idFilme: number;
  nomeVotante: string;
  nomeFilme: string;
  idVotante: number;
}
interface Mensagem {
  idLogin: number;
  descricaoMensagem: string;
}
interface Emprestimo {
  idGame: number;
  idLogin: number;
  nomeUsuario:string;
  dataEmprestimo:string;
}
interface Usuario {
  idUsuario: number;
  nome: string;
}
interface UsuarioEnvio {
  nome: string;
}
interface GameEnvio {
  nomeGame: string;
}
interface Game {
  idGame:number
  nomeGame: string;
}
@Injectable({
  providedIn: 'root'
})

export class GamesService {
  url = 'https://localhost:44356/api';
  constructor(private http: HttpClient) { }
  getLogin(login:Login): Observable<any> {
    let urlLogin = this.url + "/login";
    return this.http.put<any>(urlLogin, login, httpOptions);
  }

  listaGames(): Observable<any> {
    let urlGames = this.url + "/games";
    return this.http.get<any>(urlGames, httpOptions);
  }
  listaUsuarios(): Observable<any> {
    let urlUsuarios = this.url + "/usuarios";
    return this.http.get<any>(urlUsuarios, httpOptions);
  }
  AddEmprestimo(emprestimo: Emprestimo): Observable<Emprestimo> {
    let urlEmprestimo = this.url + "/emprestimo";
    return this.http.post<Emprestimo>(urlEmprestimo, emprestimo, httpOptions);
  }
  AddGame(game: GameEnvio): Observable<Game> {
    let urlEmprestimo = this.url + "/game";
    return this.http.post<Game>(urlEmprestimo, game, httpOptions);
  }
  listaJaEmprestado():Observable<any>{
    let urlGameJaEmprestado = this.url + "/emprestado";
    return this.http.get<Emprestimo>(urlGameJaEmprestado, httpOptions)
  }
  AddUsuario(usuario: UsuarioEnvio): Observable<Usuario> {
    let urlUsuarios = this.url + "/usuarios";
    return this.http.post<Usuario>(urlUsuarios, usuario, httpOptions);
  }
  ExcluiUsuario(usuario:UsuarioEnvio): Observable<Usuario> {
    let urlUsuarios = this.url + "/usuarios";
    return this.http.put<Usuario>(urlUsuarios, usuario, httpOptions);
  }
  ExcluiGame(game:GameEnvio): Observable<Game> {
    let urlUsuarios = this.url + "/game";
    return this.http.put<Game>(urlUsuarios, game, httpOptions);
  }
  ExcluiEmprestimo(emprestimo:Emprestimo): Observable<any> {
    let urlEmprestimo = this.url + "/emprestado";
    return this.http.put<any>(urlEmprestimo, emprestimo, httpOptions);
  }
}