using AutoMapper;
using CPR.Application.Features.NobreakSync.Queries;
using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

namespace CPR.Application.Features.NobreakSync.Handlers
{
    public class SyncEditMockApiNobreaksRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncEditMockApiNobreaksRequest, NobreakSyncResult>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper _mapper = mapper;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<NobreakSyncResult> Handle(SyncEditMockApiNobreaksRequest request, CancellationToken cancellationToken)
        {
            var updatedNobreak = await _mockApiClient.EditAsyncNobreak(request.Nobreak);
            return new NobreakSyncResult(1, new List<Nobreak> { updatedNobreak });
        }
    }
}
