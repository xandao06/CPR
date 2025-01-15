using AutoMapper;
using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;
using CPR.Application.Features.ConsignadoSync.Queries;

namespace CPR.Application.Features.ConsignadoSync.Handlers
{
    public class SyncMockApiConsignadosRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncMockApiConsignadosRequest, ConsignadoSyncResult>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper _mapper = mapper;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<ConsignadoSyncResult> Handle(SyncMockApiConsignadosRequest request, CancellationToken cancellationToken)
        {
            var consignados = await _mockApiClient.GetAsyncConsignado();
            return new ConsignadoSyncResult(consignados.Count, consignados);
        }
    }
}
