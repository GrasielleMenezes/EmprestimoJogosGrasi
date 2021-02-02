using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LojaAPI.Models
{
    public class Game
    {
        public int IdGame { get; set; }
        [Required]
        [MaxLength(100)]
        public string NomeGame { get; set; }

    }
    public class Login
    {
        public int IdLogin { get; set; }
        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }
        public string senha { get; set; }
        
    }
    public class Emprestimo
    {
        
        public int IdEmprestimo { get; set; }
        [Required]
        

        public int IdLogin { get; set; }
        
        public int IdGame { get; set; }
        
        public string NomeUsuario { get; set; }
        public string DataEmprestimo { get; set; }


    }

    public class Usuario
    {
        public int IdUsuario { get; set; }
        [Required]
        public string Nome { get; set; }
    }
    public class LoginSenha { 
        public string Nome { get; set; }
        public string senha { get; set; }
    }

}
