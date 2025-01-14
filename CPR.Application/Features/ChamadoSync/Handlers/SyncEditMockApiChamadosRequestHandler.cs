using AutoMapper;
using CPR.Application.Features.ChamadoSync.Queries;
using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

namespace CPR.Application.Features.ChamadoSync.Handlers
{
    public class SyncEditMockApiChamadoRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncEditMockApiChamadoRequest, ChamadoSyncResult>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper _mapper = mapper;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<ChamadoSyncResult> Handle(SyncEditMockApiChamadoRequest request, CancellationToken cancellationToken)
        {
            var updatedChamado = await _mockApiClient.EditAsync(request.Chamado);
            return new ChamadoSyncResult(1, new List<Chamado> { updatedChamado });
        }
    }
}
