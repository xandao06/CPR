using AutoMapper;
using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;
using CPR.Application.Features.ConsignadoSync.Queries;

namespace CPR.Application.Features.ConsignadoSync.Handlers
{
    public class SyncCreateMockApiConsignadosRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncCreateMockApiConsignadosRequest, ConsignadoSyncResult>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper _mapper = mapper;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<ConsignadoSyncResult> Handle(SyncCreateMockApiConsignadosRequest request, CancellationToken cancellationToken)
        {
            var createdConsignado = await _mockApiClient.CreateAsyncConsignado(request.Equipamento);
            return new ConsignadoSyncResult(1, new List<Equipamento> { createdConsignado });
        }
    }
}
