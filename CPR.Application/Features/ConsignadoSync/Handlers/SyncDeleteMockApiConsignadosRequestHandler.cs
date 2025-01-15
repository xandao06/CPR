using CPR.Application.Features.ConsignadoSync.Queries;
using CPR.Domain.Contracts.Client;
using MediatR;

namespace CPR.Application.Features.ConsignadoSync.Handlers
{
    public class SyncDeleteMockApiConsignadosRequestHandler(IMediator mediator, IMockApiClient mockApiClient) : IRequestHandler<SyncDeleteMockApiConsignadosRequest, bool>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<bool> Handle(SyncDeleteMockApiConsignadosRequest request, CancellationToken cancellationToken)
        {
            return await _mockApiClient.DeleteAsyncConsignado(request.Id);
        }
    }
}
