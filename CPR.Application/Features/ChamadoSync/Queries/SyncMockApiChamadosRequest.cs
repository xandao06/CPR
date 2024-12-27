using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.ChamadoSync.Queries
{
    public class SyncMockApiChamadosRequest : IRequest<ChamadoSyncResult>
    {
    }
}
