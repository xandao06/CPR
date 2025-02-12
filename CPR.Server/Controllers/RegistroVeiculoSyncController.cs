using CPR.Application.Features.RegistroVeiculoSync.Queries;
using CPR.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CPR.Server.Controllers
{
    [Route("registroVeiculos/sync")]
    [ApiController]
    public class RegistroVeiculoController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpGet("getRegistroVeiculos/{veiculoId}")]
        public async Task<IActionResult> GetRegistroVeiculos(int veiculoId)
        {
            if (veiculoId <= 0)
            {
                return BadRequest("ID do veículo inválido.");
            }

            var registros = await _mediator.Send(new GetMockApiRegistroVeiculoRequest(veiculoId));

            if (registros == null || !registros.Any())
            {
                return NotFound("Nenhum registro encontrado para este veículo.");
            }

            return Ok(new { syncedRegistros = registros.Count(), registros });
        }


        [HttpPost("createRegistroVeiculos")]
        public async Task<IActionResult> CreateRegistroVeiculo([FromBody] RegistroVeiculo registroVeiculo)
        {
            var registroVeiculoSyncResult = await _mediator.Send(new SyncCreateMockApiRegistroVeiculoRequest(registroVeiculo));
            return CreatedAtAction(nameof(CreateRegistroVeiculo), new { id = registroVeiculoSyncResult.Registros.FirstOrDefault()?.Id }, registroVeiculoSyncResult);
        }

        [HttpPut("editRegistroVeiculo")]
        public async Task<IActionResult> EditRegistroVeiculo([FromBody] RegistroVeiculo registroVeiculo)
        {
            var registroVeiculoSyncResult = await _mediator.Send(new SyncEditMockApiRegistroVeiculoRequest(registroVeiculo));
            return Ok(registroVeiculoSyncResult);
        }

        [HttpDelete("deleteRegistroVeiculo/{id}")]
        public async Task<IActionResult> DeleteRegistroVeiculo(int id)
        {
            var result = await _mediator.Send(new SyncDeleteMockApiRegistroVeiculoRequest(id));
            if (result)
                return Ok(result);
            return NotFound();
        }

        //[HttpGet("getRegistroVeiculoById/{id}")]
        //public async Task<IActionResult> GetVeiculoById(int id)
        //{
        //    var veiculo = await _mediator.Send(new SyncGetByIdMockApiRegistroVeiculoRequest(id));
        //    if (veiculo != null)
        //    {
        //        return Ok(veiculo);
        //    }
        //    return NotFound();
        //}
    }
}
