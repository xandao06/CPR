using AutoMapper;
using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;
using CPR.Application.Features.VeiculoSync.Queries;

namespace CPR.Application.Features.VeiculoSync.Handlers
{
    public class SyncMockApiVeiculosRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncMockApiVeiculosRequest, VeiculoSyncResult>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper _mapper = mapper;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<VeiculoSyncResult> Handle(SyncMockApiVeiculosRequest request, CancellationToken cancellationToken)
        {
            var veiculos = await _mockApiClient.GetAsyncVeiculo();
            return new VeiculoSyncResult(veiculos.Count, veiculos);
        }
    }
}
