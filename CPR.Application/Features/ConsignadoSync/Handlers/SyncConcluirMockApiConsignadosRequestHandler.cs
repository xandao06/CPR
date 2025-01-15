using CPR.Application.Features.ConsignadoSync.Queries;
using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

namespace CPR.Application.Features.ConsignadoSync.Handlers
{

    public class SyncConcluirMockApiConsignadosRequestHandler(IMediator mediator, IMockApiClient mockApiClient)
    : IRequestHandler<SyncConcluirMockApiConsignadosRequest, Equipamento>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<Equipamento> Handle(SyncConcluirMockApiConsignadosRequest request, CancellationToken cancellationToken)
        {
            var equipamento = await _mockApiClient.GetByIdAsyncConsignado(request.Id);
            if (equipamento != null)
            {
                equipamento.Status = "Concluido";
                await _mockApiClient.EditAsyncConsignado(equipamento);
            }
            return equipamento;
        }
    }
}
