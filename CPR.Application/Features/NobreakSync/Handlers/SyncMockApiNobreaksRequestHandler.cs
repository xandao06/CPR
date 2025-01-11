using AutoMapper;
using CPR.Application.Features.NobreakSync.Queries;
using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

namespace CPR.Application.Features.NobreakSync.Handlers
{
    public class SyncMockApiNobreaksRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncMockApiNobreaksRequest, NobreakSyncResult>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper _mapper = mapper;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<NobreakSyncResult> Handle(SyncMockApiNobreaksRequest request, CancellationToken cancellationToken)
        {
            var nobreaks = await _mockApiClient.GetAsyncNobreak();
            return new NobreakSyncResult(nobreaks.Count, nobreaks);
        }
    }
}
