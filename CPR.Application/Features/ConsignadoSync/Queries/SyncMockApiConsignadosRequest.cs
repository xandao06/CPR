using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.ConsignadoSync.Queries
{
    public class SyncMockApiConsignadosRequest : IRequest<ConsignadoSyncResult>
    {
    }
}
