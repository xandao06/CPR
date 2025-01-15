using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.ConsignadoSync.Queries
{
    public class SyncEditMockApiConsignadosRequest : IRequest<ConsignadoSyncResult>
    {
        public Equipamento Equipamento { get; set; }

        public SyncEditMockApiConsignadosRequest(Equipamento equipamento)
        {
            Equipamento = equipamento;
        }
    }
}
