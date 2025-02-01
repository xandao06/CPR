using CPR.Application.Features.VeiculoSync.Queries;
using CPR.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CPR.Server.Controllers
{
    [Route("veiculos/sync")]
    [ApiController]
    public class VeiculoSyncController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpGet("getVeiculos")]
        public async Task<IActionResult> SyncVeiculos()
        {
            VeiculoSyncResult veiculoSyncResult = await _mediator.Send(new SyncMockApiVeiculosRequest());
            return Ok(veiculoSyncResult);
        }

        [HttpPost("createVeiculos")]
        public async Task<IActionResult> CreateVeiculo([FromBody] Veiculo veiculo)
        {
            var veiculoSyncResult = await _mediator.Send(new SyncCreateMockApiVeiculosRequest(veiculo));
            return CreatedAtAction(nameof(CreateVeiculo), new { id = veiculoSyncResult.Veiculos.FirstOrDefault()?.Id }, veiculoSyncResult);
        }

        [HttpPut("editVeiculo")]
        public async Task<IActionResult> EditVeiculo([FromBody] Veiculo veiculo)
        {
            var veiculoSyncResult = await _mediator.Send(new SyncEditMockApiVeiculosRequest(veiculo));
            return Ok(veiculoSyncResult);
        }

        [HttpDelete("deleteVeiculo/{id}")]
        public async Task<IActionResult> DeleteVeiculo(int id)
        {
            var result = await _mediator.Send(new SyncDeleteMockApiVeiculosRequest(id));
            if (result)
                return Ok(result);
            return NotFound();
        }

        [HttpGet("getVeiculoById/{id}")]
        public async Task<IActionResult> GetVeiculoById(int id)
        {
            var veiculo = await _mediator.Send(new SyncGetByIdMockApiVeiculosRequest(id));
            if (veiculo != null)
            {
                return Ok(veiculo);
            }
            return NotFound();
        }
    }
}

