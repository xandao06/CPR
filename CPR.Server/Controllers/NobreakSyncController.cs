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

        [HttpPost("createNobreaks")]
        public async Task<IActionResult> CreateNobreak([FromBody] Nobreak nobreak)
        {
            var nobreakSyncResult = await _mediator.Send(new SyncCreateMockApiNobreaksRequest(nobreak));
            return CreatedAtAction(nameof(CreateNobreak), new { id = nobreakSyncResult.Nobreaks.FirstOrDefault()?.Id }, nobreakSyncResult);
        }

        [HttpPut("editNobreak")]
        public async Task<IActionResult> EditNobreak([FromBody] Nobreak nobreak)
        {
            var nobreakSyncResult = await _mediator.Send(new SyncEditMockApiNobreaksRequest(nobreak));
            return Ok(nobreakSyncResult);
        }

        [HttpDelete("deleteNobreak/{id}")]
        public async Task<IActionResult> DeleteNobreak(int id)
        {
            var result = await _mediator.Send(new SyncDeleteMockApiNobreaksRequest(id));
            if (result)
                return Ok(result);
            return NotFound();
        }
    }
}
