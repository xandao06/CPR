using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.ChamadoSync.Queries
{
    public class SyncEditMockApiChamadoRequest : IRequest<ChamadoSyncResult>
    {
        public Chamado Chamado { get; set; }

        public SyncEditMockApiChamadoRequest(Chamado chamado)
        {
            Chamado = chamado;
        }
    }
}
