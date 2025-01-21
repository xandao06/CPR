using CPR.Domain;
using MediatR;


namespace CPR.Application.Features.VeiculoSync.Queries
{
    public class SyncCreateMockApiVeiculosRequest : IRequest<VeiculoSyncResult>
    {
        public Veiculo Veiculo { get; set; }

        public SyncCreateMockApiVeiculosRequest(Veiculo veiculo)
        {
            Veiculo = veiculo;
        }
    }
}
