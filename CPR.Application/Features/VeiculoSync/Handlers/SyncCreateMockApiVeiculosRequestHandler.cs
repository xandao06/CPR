using AutoMapper;
using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;
using CPR.Application.Features.ConsignadoSync.Queries;
using CPR.Application.Features.VeiculoSync.Queries;

namespace CPR.Application.Features.VeiculoSync.Handlers
{
    public class SyncCreateMockApiVeiculosRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncCreateMockApiVeiculosRequest, VeiculoSyncResult>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper _mapper = mapper;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<VeiculoSyncResult> Handle(SyncCreateMockApiVeiculosRequest request, CancellationToken cancellationToken)
        {
            var createdVeiculo = await _mockApiClient.CreateAsyncVeiculo(request.Veiculo);
            return new VeiculoSyncResult(1, new List<Veiculo> { createdVeiculo });
        }
    }
}
