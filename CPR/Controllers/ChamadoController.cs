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
        public IActionResult Index()
        {
            var model = chamadoService.GetAll();
            return View(model);
        }
        public IActionResult Historico()
        {
            return View();
        }

        [HttpGet]
        public IActionResult CriarChamado()
        {
            return View("Modal/CriarChamado", new Chamado());
        }
        [HttpPost]
        public IActionResult CriarChamado(Chamado chamado)
        {
            chamadoService.Add(chamado);
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult EditarChamado(Chamado chamado)
        {
            chamadoService.Update(chamado);
            return RedirectToAction("Index");
        }

    }
}