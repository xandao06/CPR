using CPR.Models;
using CPR.Models.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace CPR.Controllers
{
    public class ClienteController : Controller
    {
        private readonly ClienteService clienteService;

        public ClienteController(ClienteService clienteService)
        {
            this.clienteService = clienteService;
        }
        public IActionResult Index()
        {
            var clientes = clienteService.GetAll();
            return View(clientes);
        }
    }
}