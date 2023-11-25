using CPR.Models;
using CPR.Models.Domain;
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

        [HttpPost]
        public IActionResult EditarCliente(Cliente cliente)
        {
            clienteService.Update(cliente);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult ModalEditarCliente(int id)
        {
            Cliente cliente = clienteService.Get(id);
            return View("Modal/EditarCliente");
        }

        [HttpGet]
        public IActionResult ModalCriarCliente()
        {
            return View("Modal/CriarCliente", new Cliente());
        }

        [HttpPost]
        public IActionResult CriarCliente(Cliente cliente)
        {
            clienteService.Add(cliente);
            return RedirectToAction("Index");
        }
    }
}