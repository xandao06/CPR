using CPR.Models;
using CPR.Models.Domain;
using CPR.Models.Persistence;
using CPR.Models.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.AspNetCore.WebSockets;
using Microsoft.AspNetCore.SignalR;
using iTextSharp.text.pdf;
using iTextSharp.text;
using System.IO;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace CPR.Controllers
{
    public class ChamadoController : Controller
    {
        private readonly ChamadoService chamadoService;
        private readonly IHubContext<NotificationHub> _hubContext;


        public ChamadoController(ChamadoService chamadoService, IHubContext<NotificationHub> hubContext)
        {
            this.chamadoService = chamadoService;
            _hubContext = hubContext;
        }
        public IActionResult ChamadoIndex()
        {
            var model = chamadoService.GetAll();
            return View(model);
        }

        public IActionResult RegistroIndex()
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
        public async Task<IActionResult> CriarChamado(Chamado chamado)
        {
            chamadoService.Add(chamado);
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", "Atualização de estoque realizada");
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

        // Método que busca o serviço de filtragem de registros
        [HttpGet]
        public IActionResult SearchReg(string query, DateTime? startDate, DateTime? endDate)
        {
            var registros = chamadoService.SearchRegistros(query, startDate, endDate);
            return Json(registros);
        }

        [HttpGet]
        public IActionResult GenerateReportPDF(string query, DateTime? startDate, DateTime? endDate, string filterType)
        {
            var chamados = chamadoService.GetAll(); // Recupera todos os registros

            if (!string.IsNullOrEmpty(query) || startDate.HasValue || endDate.HasValue)
            {
                chamados = chamadoService.SearchChamados(query, startDate, endDate);
            }

            IEnumerable<Chamado> filteredChamados = chamados;

            if (filterType == "data")
            {
                filteredChamados = filteredChamados.OrderByDescending(c => c.Data);
            }
            else if (filterType == "status")
            {
                filteredChamados = filteredChamados.OrderByDescending(c => c.Status == "Concluído");
            }
            else if (filterType == "contrato")
            {
                filteredChamados = filteredChamados.OrderByDescending(c => c.Contrato == "Sim");
            }
            else if (filterType == "urgencia")
            {
                filteredChamados = filteredChamados.OrderByDescending(c => c.Urgencia == "Alta");
            }

            using (var memoryStream = new MemoryStream())
            {
                Document document = new Document();
                PdfWriter.GetInstance(document, memoryStream);
                document.Open();

                PdfPTable table = new PdfPTable(7);
                table.AddCell("Data");
                table.AddCell("Hora");
                table.AddCell("Cliente");
                table.AddCell("Descrição");
                table.AddCell("Contrato");
                table.AddCell("Urgência");
                table.AddCell("Status");

                foreach (var chamado in filteredChamados)
                {
                    table.AddCell(chamado.Data.ToString("dd/MM/yyyy"));
                    table.AddCell(chamado.Hora);
                    table.AddCell(chamado.Cliente);
                    table.AddCell(chamado.Descricao);
                    table.AddCell(chamado.Contrato);
                    table.AddCell(chamado.Urgencia);
                    table.AddCell(chamado.Status);
                }

                document.Add(table);
                document.Close();

                return File(memoryStream.ToArray(), "application/pdf", "RelatorioChamados.pdf");
            }

        }

        [HttpGet]
        public IActionResult GenerateReportExcel(string query, DateTime? startDate, DateTime? endDate, string filterType)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            var chamados = chamadoService.GetAll();

            if (!string.IsNullOrEmpty(query) || startDate.HasValue || endDate.HasValue)
            {
                chamados = chamadoService.SearchChamados(query, startDate, endDate);
            }

            IEnumerable<Chamado> filteredChamados = chamados;

            if (filterType == "data")
            {
                filteredChamados = filteredChamados.OrderByDescending(c => c.Data);
            }
            else if (filterType == "status")
            {
                filteredChamados = filteredChamados.OrderByDescending(c => c.Status);
            }
            else if (filterType == "contrato")
            {
                filteredChamados = filteredChamados.OrderByDescending(c => c.Contrato);
            }
            else if (filterType == "urgencia")
            {
                filteredChamados = filteredChamados.OrderByDescending(c => c.Urgencia == "Alta");
            }

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("RelatorioChamados");

                worksheet.Cells[1, 1].Value = "Data";
                worksheet.Cells[1, 2].Value = "Hora";
                worksheet.Cells[1, 3].Value = "Cliente";
                worksheet.Cells[1, 4].Value = "Descrição";
                worksheet.Cells[1, 5].Value = "Contrato";
                worksheet.Cells[1, 6].Value = "Urgência";
                worksheet.Cells[1, 7].Value = "Status";

                int row = 2;
                foreach (var chamado in filteredChamados)
                {
                    worksheet.Cells[row, 1].Value = chamado.Data.ToString("dd/MM/yyyy");
                    worksheet.Cells[row, 2].Value = chamado.Hora;
                    worksheet.Cells[row, 3].Value = chamado.Cliente;
                    worksheet.Cells[row, 4].Value = chamado.Descricao;
                    worksheet.Cells[row, 5].Value = chamado.Contrato;
                    worksheet.Cells[row, 6].Value = chamado.Urgencia;
                    worksheet.Cells[row, 7].Value = chamado.Status;
                    row++;
                }

                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();

                var memoryStream = new MemoryStream();
                package.SaveAs(memoryStream);

                return File(memoryStream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "RelatorioChamados.xlsx");
            }
        }
    }
}