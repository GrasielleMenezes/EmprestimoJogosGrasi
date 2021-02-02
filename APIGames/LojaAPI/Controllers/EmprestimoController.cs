
using LojaAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace LojaAPI.Controllers
{


    [ApiController]
    [Route("api")]
    public class EmprestimoController : ControllerBase
    {
        //private readonly ILogger<ApiController> _logger;
        private readonly AppDbContext _context;
        public EmprestimoController(AppDbContext context)
        {
            
            _context = context;
        }
        
        [HttpPut]
        [Route("login")]
        public string getLogin([FromBody] Login login) {

           return _context.getLogin(login);
        }
        
        [HttpGet]
        [Route("games")]
        public List<Game> getGames()
        {
            
            return _context.getGame();
        }
        [HttpPost]
        [Route("emprestimo")]
        public IActionResult AddEmprestimo([FromBody] Emprestimo emprestimo)
        {
            _context.AddEmprestimo(emprestimo);
            return Ok(emprestimo);
        }

        [HttpGet]
        [Route("emprestado")]
        public List<Emprestimo> getEmprestimo()
        {
            return _context.getEmprestimo();
        }

        [HttpGet]
        [Route("usuarios")]
        public List<Usuario> getUsuarios()
        {
            return _context.getUsuarios();
        }
        [HttpPost]
        [Route("usuarios")]
        public IActionResult AddUsuarios([FromBody] LoginSenha loginSenha)
        {
            Usuario usuario = new Usuario();
            usuario = _context.AddUsuario(loginSenha);
            return Ok(usuario);
        }
        [HttpPut]
        [Route("usuarios")]
        public IActionResult RetiraUsuario([FromBody] Usuario usuario)
        {
            _context.ExcluiUsuario(usuario);
            return Ok(usuario);
        }
        [HttpPost]
        [Route("game")]
        public IActionResult AddGame([FromBody] Game game)
        {
            _context.AddGame(game);
            return Ok(game);
        }
        [HttpPut]
        [Route("game")]
        public IActionResult RetiraGame([FromBody] Game game)
        {
            _context.ExcluiGame(game);
            return Ok(game);
        }
        [HttpPut]
        [Route("emprestado")]
        public IActionResult RetiraEmprestimo([FromBody] Emprestimo emprestimo)
        {
            _context.ExcluiEmprestimo(emprestimo);
            return Ok(emprestimo);
        }
    }
}