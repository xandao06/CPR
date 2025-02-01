using AutoMapper;
using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;
using CPR.Application.Features.RegistroVeiculoSync.Queries;

namespace CPR.Application.Features.RegistroVeiculoSync.Handlers
{
    public class SyncCreateMockApiRegistroVeiculoRequestHandler(IMediator mediator, IMapper mapper, IMockApiClient mockApiClient) : IRequestHandler<SyncCreateMockApiRegistroVeiculoRequest, RegistroVeiculoSyncResult>
    {
        private readonly IMediator _mediator = mediator;
        private readonly IMapper _mapper = mapper;
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<RegistroVeiculoSyncResult> Handle(SyncCreateMockApiRegistroVeiculoRequest request, CancellationToken cancellationToken)
        {
            var createdRegistroVeiculo = await _mockApiClient.CreateAsyncRegistroVeiculo(request.RegistroVeiculo);
            return new RegistroVeiculoSyncResult(1, new List<RegistroVeiculo> { createdRegistroVeiculo });
        }
    }
}
