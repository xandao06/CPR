using AutoMapper;
using CPR.Application.Features.NobreakSync.Queries;
using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

namespace CPR.Application.Features.NobreakSync.Handlers
{
    public class SyncCreateMockApiNobreaksRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncCreateMockApiNobreaksRequest, NobreakSyncResult>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper _mapper = mapper;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<NobreakSyncResult> Handle(SyncCreateMockApiNobreaksRequest request, CancellationToken cancellationToken)
        {
            var createdNobreak = await _mockApiClient.CreateAsyncNobreak(request.Nobreak);
            return new NobreakSyncResult(1, new List<Nobreak> { createdNobreak });
        }
    }
}
