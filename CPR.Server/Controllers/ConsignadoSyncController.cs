using CPR.Application.Features.ChamadoSync.Queries;
using CPR.Application.Features.ConsignadoSync.Queries;
using CPR.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CPR.Server.Controllers
{
    [Route("consignados/sync")]
    [ApiController]
    public class ConsignadoSyncController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpGet("getConsignados")]
        public async Task<IActionResult> SyncConsignados()
        {
            ConsignadoSyncResult consignadoSyncResult = await _mediator.Send(new SyncMockApiConsignadosRequest());
            return Ok(consignadoSyncResult);
        }

        [HttpPost("createConsignados")]
        public async Task<IActionResult> CreateConsignado([FromBody] Equipamento equipamento)
        {
            var consignadoSyncResult = await _mediator.Send(new SyncCreateMockApiConsignadosRequest(equipamento));
            return CreatedAtAction(nameof(CreateConsignado), new { id = consignadoSyncResult.Equipamentos.FirstOrDefault()?.Id }, consignadoSyncResult);
        }

        [HttpPut("editConsignado")]
        public async Task<IActionResult> EditConsignado([FromBody] Equipamento equipamento)
        {
            var consignadoSyncResult = await _mediator.Send(new SyncEditMockApiConsignadosRequest(equipamento));
            return Ok(consignadoSyncResult);
        }

        [HttpDelete("deleteConsignado/{id}")]
        public async Task<IActionResult> DeleteConsignado(int id)
        {
            var result = await _mediator.Send(new SyncDeleteMockApiConsignadosRequest(id));
            if (result)
                return Ok(result);
            return NotFound();
        }

        [HttpPut("concluirConsignado/{id}")]
        public async Task<IActionResult> ConcluirConsignado(int id)
        {
            var result = await _mediator.Send(new SyncConcluirMockApiConsignadosRequest(id));
            if (result != null)
                return Ok(result);
            return NotFound();
        }
    }
}
