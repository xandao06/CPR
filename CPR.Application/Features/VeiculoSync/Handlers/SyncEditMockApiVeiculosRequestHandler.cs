using AutoMapper;
using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;
using CPR.Application.Features.ConsignadoSync.Queries;
using CPR.Application.Features.VeiculoSync.Queries;

namespace CPR.Application.Features.VeiculoSync.Handlers
{
    public class SyncEditMockApiVeiculosRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncEditMockApiVeiculosRequest, VeiculoSyncResult>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper _mapper = mapper;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<VeiculoSyncResult> Handle(SyncEditMockApiVeiculosRequest request, CancellationToken cancellationToken)
        {
            var updatedVeiculo = await _mockApiClient.EditAsyncVeiculo(request.Veiculo);
            return new VeiculoSyncResult(1, new List<Veiculo> { updatedVeiculo });
        }
    }
}
