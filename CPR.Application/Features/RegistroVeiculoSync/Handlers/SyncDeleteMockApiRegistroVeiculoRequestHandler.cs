using CPR.Application.Features.RegistroVeiculoSync.Queries;
using CPR.Domain.Contracts.Client;
using MediatR;

namespace CPR.Application.Features.RegistroVeiculoSync.Handlers
{
    public class SyncDeleteMockApiRegistroVeiculoRequestHandler(IMediator mediator, IMockApiClient mockApiClient) : IRequestHandler<SyncDeleteMockApiRegistroVeiculoRequest, bool>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<bool> Handle(SyncDeleteMockApiRegistroVeiculoRequest request, CancellationToken cancellationToken)
        {
            return await _mockApiClient.DeleteAsyncRegistroVeiculo(request.Id);
        }
    }
}
