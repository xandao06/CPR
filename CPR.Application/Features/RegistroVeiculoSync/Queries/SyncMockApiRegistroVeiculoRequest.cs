using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.RegistroVeiculoSync.Queries
{
    public class SyncMockApiRegistroVeiculoRequest : IRequest<List<RegistroVeiculo>>
    {
        public int? VeiculoId { get; }

        public SyncMockApiRegistroVeiculoRequest(int? veiculoId = null)
        {
            VeiculoId = veiculoId;
        }
    }
}
