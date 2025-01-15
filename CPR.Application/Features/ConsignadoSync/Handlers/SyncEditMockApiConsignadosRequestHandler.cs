using AutoMapper;
using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;
using CPR.Application.Features.ConsignadoSync.Queries;

namespace CPR.Application.Features.ConsignadoSync.Handlers
{
    public class SyncEditMockApiConsignadosRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncEditMockApiConsignadosRequest, ConsignadoSyncResult>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper _mapper = mapper;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<ConsignadoSyncResult> Handle(SyncEditMockApiConsignadosRequest request, CancellationToken cancellationToken)
        {
            var updatedConsignado = await _mockApiClient.EditAsyncConsignado(request.Equipamento);
            return new ConsignadoSyncResult(1, new List<Equipamento> { updatedConsignado });
        }
    }
}
