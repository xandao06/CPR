using CPR.Application.Features.ConsignadoSync.Queries;
using CPR.Application.Features.VeiculoSync.Queries;
using CPR.Domain.Contracts.Client;
using MediatR;

namespace CPR.Application.Features.VeiculoSync.Handlers
{
    public class SyncDeleteMockApiVeiculosRequestHandler(IMediator mediator, IMockApiClient mockApiClient) : IRequestHandler<SyncDeleteMockApiVeiculosRequest, bool>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<bool> Handle(SyncDeleteMockApiVeiculosRequest request, CancellationToken cancellationToken)
        {
            return await _mockApiClient.DeleteAsyncVeiculo(request.Id);
        }
    }
}
