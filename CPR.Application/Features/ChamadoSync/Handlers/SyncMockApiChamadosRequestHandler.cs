using AutoMapper;
using CPR.Application.Features.ChamadoSync.Queries;
using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

namespace CPR.Application.Features.ChamadoSync.Handlers
{
    public class SyncMockApiChamadosRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncMockApiChamadosRequest, ChamadoSyncResult>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper _mapper = mapper;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<ChamadoSyncResult> Handle(SyncMockApiChamadosRequest request, CancellationToken cancellationToken)
        {
            var chamados = await _mockApiClient.GetAsync();
            return new ChamadoSyncResult(chamados.Count, chamados);
        }
    }
}
