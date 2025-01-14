using CPR.Application.Features.NobreakSync.Queries;
using CPR.Domain.Contracts.Client;
using MediatR;

namespace CPR.Application.Features.NobreakSync.Handlers
{
    public class SyncDeleteMockApiNobreaksRequestHandler(IMediator mediator, IMockApiClient mockApiClient) : IRequestHandler<SyncDeleteMockApiNobreaksRequest, bool>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<bool> Handle(SyncDeleteMockApiNobreaksRequest request, CancellationToken cancellationToken)
        {
            return await _mockApiClient.DeleteAsyncNobreak(request.Id);
        }
    }
}
