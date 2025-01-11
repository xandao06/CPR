using CPR.Application.Features.NobreakSync.Queries;
using CPR.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CPR.Server.Controllers
{
    [Route("nobreaks/sync")]
    [ApiController]
    public class NobreakSyncController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpGet("getNobreaks")]
        public async Task<IActionResult> SyncNobreaks()
        {
            NobreakSyncResult nobreakSyncResult = await _mediator.Send(new SyncMockApiNobreaksRequest());
            return Ok(nobreakSyncResult);
        }
    }
}
