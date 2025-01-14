using CPR.Application.Features.ChamadoSync.Queries;
using CPR.Domain.Contracts.Client;
using MediatR;

namespace CPR.Application.Features.ChamadoSync.Handlers
{
    public class SyncDeleteMockApiChamadoRequestHandler(IMediator mediator, IMockApiClient mockApiClient) : IRequestHandler<SyncDeleteMockApiChamadoRequest, bool>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<bool> Handle(SyncDeleteMockApiChamadoRequest request, CancellationToken cancellationToken)
        {
            return await _mockApiClient.DeleteAsync(request.Id);
        }
    }
}
