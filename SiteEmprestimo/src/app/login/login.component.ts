import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GamesService } from "../games.service";
interface EnviaLogin {
  nome: string;
  senha: string;
}

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  formularioDeUsuario!: FormGroup;
  loginEnvia: EnviaLogin = {
    nome: '',
    senha: ''
  }
  erro:string = '';
  constructor(private router: Router, private fb: FormBuilder, private servico: GamesService) { }
  ngOnInit() {
    this.criarFormularioDeUsuario();
  }
  logar() {

    this.loginEnvia.nome = this.formularioDeUsuario.get("nome")?.value;
    this.loginEnvia.senha = this.formularioDeUsuario.get("senha")?.value;
    this.servico.getLogin(this.loginEnvia).subscribe(
      users => { },
      error => {
        if (error.error.text == "admin") {
          this.router.navigate(['/administracao']);
        }
        else {
          if (error.error.text == "Erro no login") {
            this.erro = "Erro no Login";
          }
          else {
            this.router.navigate(['/games/'+ error.error.text]);
          }
        }
      }
    );
  }
  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ],
      senha: ['', Validators.compose([Validators.required])]
    });
  }
}