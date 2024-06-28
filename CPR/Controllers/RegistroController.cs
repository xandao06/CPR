using CPR.Models.Services;
using Microsoft.AspNetCore.Mvc;

namespace CPR.Controllers
{
    public class RegistroController : Controller
    {

        private readonly ChamadoService chamadoService;
        private readonly ClienteService clienteService;

        public RegistroController(ChamadoService chamadoService, ClienteService clienteService)
        {
            this.chamadoService = chamadoService;
            this.clienteService = clienteService;
        }
        public IActionResult RegistroIndex()
        {
            var model = chamadoService.GetAll();
            return View(model);
        }
    }
}
