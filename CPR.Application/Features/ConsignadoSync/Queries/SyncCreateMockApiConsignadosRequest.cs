using CPR.Domain;
using MediatR;


namespace CPR.Application.Features.ConsignadoSync.Queries
{
    public class SyncCreateMockApiConsignadosRequest : IRequest<ConsignadoSyncResult>
    {
        public Equipamento Equipamento { get; set; }

        public SyncCreateMockApiConsignadosRequest(Equipamento equipamento)
        {
            Equipamento = equipamento;
        }
    }
}
