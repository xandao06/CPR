using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;
using AutoMapper;
using CPR.Application.Features.VeiculoSync.Queries;

namespace CPR.Application.Features.VeiculoSync.Handlers
{
    public class SyncGetByIdMockApiVeiculosRequestHandler : IRequestHandler<SyncGetByIdMockApiVeiculosRequest, VeiculoSyncResult>
    {
        private readonly IMockApiClient _mockApiClient;
        private readonly IMapper _mapper;

        public SyncGetByIdMockApiVeiculosRequestHandler(IMockApiClient mockApiClient, IMapper mapper)
        {
            _mockApiClient = mockApiClient;
            _mapper = mapper;
        }

        public async Task<VeiculoSyncResult> Handle(SyncGetByIdMockApiVeiculosRequest request, CancellationToken cancellationToken)
        {
            var veiculo = await _mockApiClient.GetByIdAsyncVeiculo(request.Id);

            if (veiculo != null)
            {
                // Aqui aplicamos lógica adicional de sincronização, se necessário
                return new VeiculoSyncResult(1, new List<Veiculo> { veiculo });
            }

            return new VeiculoSyncResult(0, new List<Veiculo>());
        }
    }
}