using AutoMapper;
using CPR.Application.Features.Chamado.Commands;
using CPR.Application.Features.ChamadoSync.Queries;
using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.ChamadoSync.Handlers
{
    public class SyncMockApiChamadosRequestHandler(IMediator mediator, IMapper mapper) : IRequestHandler<SyncMockApiChamadosRequest, ChamadoSyncResult>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<ChamadoSyncResult> Handle(SyncMockApiChamadosRequest request, CancellationToken cancellationToken)
        {
            List<Chamado> mockApiChamados = await _mediator.Send(new GetMockApiChamadosRequest(), cancellationToken);

            await _mediator.Send(new CreateChamadosCommand, cancellationToken);

            return new ChamadoSyncResult(SyncedChamados: mockApiChamados.Count, Chamados: mockApiChamados);
        }
    }
}
