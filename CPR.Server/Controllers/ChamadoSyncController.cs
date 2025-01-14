using CPR.Application;
using CPR.Application.Features.ChamadoSync.Queries;
using CPR.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CPR.Server.Controllers
{
    [Route("chamados/sync")]
    [ApiController]
    public class ChamadoSyncController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpGet("getChamados")]
        public async Task<IActionResult> SyncChamados()
        {
            ChamadoSyncResult chamadoSyncResult = await _mediator.Send(new SyncMockApiChamadosRequest());
            return Ok(chamadoSyncResult);
        }

        [HttpPost("createChamados")]
        public async Task<IActionResult> CreateChamado([FromBody] Chamado chamado)
        {
            var chamadoSyncResult = await _mediator.Send(new SyncCreateMockApiChamadosRequest(chamado));
            return CreatedAtAction(nameof(CreateChamado), new { id = chamadoSyncResult.Chamados.FirstOrDefault()?.Id }, chamadoSyncResult);
        }

        [HttpPut("editChamado")]
        public async Task<IActionResult> EditChamado([FromBody] Chamado chamado)
        {
            var chamadoSyncResult = await _mediator.Send(new SyncEditMockApiChamadoRequest(chamado));
            return Ok(chamadoSyncResult);
        }

        [HttpDelete("deleteChamado/{id}")]
        public async Task<IActionResult> DeleteChamado(int id)
        {
            var result = await _mediator.Send(new SyncDeleteMockApiChamadoRequest(id));
            if (result)
                return Ok(result);
            return NotFound();
        }

        [HttpPut("concluirChamado/{id}")]
        public async Task<IActionResult> ConcluirChamado(int id)
        {
            var result = await _mediator.Send(new SyncConcluirMockApiChamadoRequest(id));
            if (result != null)
                return Ok(result);
            return NotFound();
        }

        [HttpGet("getChamadosConcluidos")]
        public async Task<IActionResult> GetChamadosConcluidos()
        {
            var historicoChamados = await _mediator.Send(new GetChamadosConcluidosRequest());
            if (historicoChamados != null && historicoChamados.Any())
                return Ok(historicoChamados);
            return NoContent();
        }
    }
}
