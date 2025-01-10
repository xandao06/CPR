using CPR.Application.Features.ChamadoSync.Commands;
using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

namespace CPR.Application.Features.ChamadoSync.Handlers
{

    public class SyncConcluirMockApiChamadoRequestHandler(IMediator mediator, IMockApiClient mockApiClient)
    : IRequestHandler<SyncConcluirMockApiChamadoRequest, Chamado>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<Chamado> Handle(SyncConcluirMockApiChamadoRequest request, CancellationToken cancellationToken)
        {
            var chamado = await _mockApiClient.GetByIdAsync(request.Id);
            if (chamado != null)
            {
                chamado.Status = "Concluido";
                chamado.IsHistorico = true;
                await _mockApiClient.EditAsync(chamado);
            }
            return chamado;
        }
    }
}
