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

        [HttpGet]
        public async Task<IActionResult> SyncChamados()
        {
            ChamadoSyncResult chamadoSyncResult = await _mediator.Send(new SyncMockApiChamadosRequest());
            return Ok(chamadoSyncResult);
        }

    }
}
