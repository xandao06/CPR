using CPR.Models;
using CPR.Models.Domain;
using CPR.Models.Persistence;
using CPR.Models.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace CPR.Controllers
{
    public class ChamadoController : Controller
    {
        private readonly ChamadoService chamadoService;

        public ChamadoController(ChamadoService chamadoService)
        {
            this.chamadoService = chamadoService;
        }
        public IActionResult ChamadoIndex()
        {
            var model = chamadoService.GetAll();
            return View(model);
        }

        [HttpGet]
        public IActionResult ModalCriarChamado()
        {
            return View("Modal/CriarChamado", new Chamado());
        }
        [HttpPost]
        public IActionResult CriarChamado(Chamado chamado)
        {
            chamadoService.Add(chamado);
            return RedirectToAction("ChamadoIndex");
        }

        [HttpGet]
        public IActionResult ModalEditarChamado(int id)
        {
            Chamado chamado = chamadoService.Get(id);
            return View("Modal/EditarChamado", chamado);
        }

        [HttpPost]
        public IActionResult EditarChamado(Chamado chamado)
        {
            chamadoService.Update(chamado);
            return RedirectToAction("ChamadoIndex");
        }

        [HttpGet]
        public IActionResult ModalDeletarChamado(int id)
        {
            Chamado chamado = chamadoService.Get(id);
            return View("Modal/DeletarChamado");
        }

        [HttpPost]
        public IActionResult DeletarChamado(int id)
        {
            chamadoService.Delete(id);
            return RedirectToAction("ChamadoIndex");
        }

        [HttpGet]
        public IActionResult ModalConcluirChamado(int id)
        {
            Chamado chamado = chamadoService.Get(id);
            return View("Modal/ConcluirChamado");
        }

        [HttpPost]
        public IActionResult ConcluirChamado(int id)
        {
            chamadoService.Concluir(id);
            return RedirectToAction("ChamadoIndex");
        }

        // Método que busca o serviço de filtragem de chamados
        [HttpGet]
        public IActionResult SearchCham(string query, DateTime? startDate, DateTime? endDate)
        {
            var chamados = chamadoService.SearchChamados(query, startDate, endDate);
            return Json(chamados);
        }
    }
}