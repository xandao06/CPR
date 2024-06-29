using CPR.Models.Domain;
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

        // Método que busca o serviço de filtragem de registros
        [HttpGet]
        public IActionResult SearchCham(string query, DateTime? startDate, DateTime? endDate)
        {
            var chamados = chamadoService.SearchChamados(query, startDate, endDate);
            return Json(chamados);
        }

        [HttpGet]
        public IActionResult ModalDeletarRegistro(int id)
        {
            Registro registro = registroService.Get(id);
            return View("Modal/DeletarRegistro");
        }

        [HttpPost]
        public IActionResult DeletarRegistro(int id)
        {
            chamadoService.Delete(id);
            return RedirectToAction("RegistroIndex");
        }
    
    }
}
