import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracaoComponent } from './administracao/administracao.component';
import { LoginComponent } from './login/login.component';
import { GamesComponent } from './games/games.component';


const routes: Routes = [
  {
    path:'', redirectTo:'/login', pathMatch:'full'
  },
  {
    path:'administracao', component:AdministracaoComponent
  },
  {
    path:'games/:nome', component:GamesComponent
  },
  {
    path:'login', component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
