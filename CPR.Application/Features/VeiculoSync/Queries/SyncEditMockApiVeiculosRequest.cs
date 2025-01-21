using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.VeiculoSync.Queries
{
    public class SyncEditMockApiVeiculosRequest : IRequest<VeiculoSyncResult>
    {
        public Veiculo Veiculo { get; set; }

        public SyncEditMockApiVeiculosRequest(Veiculo veiculo)
        {
            Veiculo = veiculo;
        }
    }
}
