using AutoMapper;
using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;
using CPR.Application.Features.RegistroVeiculoSync.Queries;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CPR.Application.Features.RegistroVeiculoSync.Handlers
{
    public class SyncMockApiRegistroVeiculoRequestHandler : IRequestHandler<SyncMockApiRegistroVeiculoRequest, List<RegistroVeiculo>>
    {
        private readonly IMockApiClient _mockApiClient;

        public SyncMockApiRegistroVeiculoRequestHandler(IMockApiClient mockApiClient)
        {
            _mockApiClient = mockApiClient;
        }

        public async Task<List<RegistroVeiculo>> Handle(SyncMockApiRegistroVeiculoRequest request, CancellationToken cancellationToken)
        {
            // Obtém registros do veículo específico (se VeiculoId for passado)
            return await _mockApiClient.GetAsyncRegistroVeiculo(request.VeiculoId);
        }
    }
}
