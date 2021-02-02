
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using EmprestimoAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LojaAPI.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
           // Database.EnsureCreated();
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Emprestimo> Emprestimos { get; set; }
        public DbSet<Login> Logins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new GameMapping());
            modelBuilder.ApplyConfiguration(new LoginMapping());
            modelBuilder.ApplyConfiguration(new EmprestimoMapping());
            modelBuilder.ApplyConfiguration(new UsuarioMapping());

        }
        public string getLogin(Login login)
        {
            
           
            Login achaLogin = Logins
                 .Where(l => l.Nome == login.Nome).FirstOrDefault();
            var hash = new Hash(SHA512.Create());
            bool senha = hash.VerificarSenha(login.senha, achaLogin.senha);
            if(senha)
            {
                return login.Nome;
            }
            else
            return "Erro no login";
        }

        public void AddGame(Game game)
        {
            Games.Add(game);
            this.SaveChanges();
            return;
        }

        public void AddEmprestimo(Emprestimo emprestimo)
        {
            Emprestimos.Add(emprestimo);
            this.SaveChanges();
            return;
        }
        public Usuario AddUsuario(LoginSenha loginSenha)
        {
            Usuario usuario = new Usuario();
            Login login = new Login();
            var hash = new Hash(SHA512.Create());
            var senha = hash.CriptografarSenha(loginSenha.senha);
            login.Nome = loginSenha.Nome;
            login.senha = senha;
            usuario.Nome = loginSenha.Nome; 
            Logins.Add(login);
            Usuarios.Add(usuario);
            this.SaveChanges();
            return usuario;
        }

        public List<Game> getGame()
        {
            return Games.ToList<Game>();
        }
        public List<Emprestimo> getEmprestimo()
        {
            return Emprestimos.ToList<Emprestimo>();
        }

        public List<Usuario> getUsuarios()
        {
            return Usuarios.ToList<Usuario>();
        }
        public void ExcluiGame(Game game)
        {
            Game achaGame = Games
                 .Where(g => g.NomeGame == game.NomeGame).FirstOrDefault();
            Games.Remove(achaGame);
            this.SaveChanges();
            return;
        }
        public void ExcluiEmprestimo(Emprestimo emprestimo)
        {
            Emprestimo acharEmprestimo = Emprestimos
                 .Where(e => e.IdGame == emprestimo.IdGame).FirstOrDefault();
            Emprestimos.Remove(acharEmprestimo);
            this.SaveChanges();
        }
        public void ExcluiUsuario(Usuario usuario)
        {
            Usuario acharUsuario = Usuarios
                .Where(u => u.Nome == usuario.Nome).FirstOrDefault();
            Login acharLogin = Logins
                .Where(l => l.Nome == usuario.Nome).FirstOrDefault();
            Logins.Remove(acharLogin);
            Usuarios.Remove(acharUsuario);
            this.SaveChanges();
        }

    }
}