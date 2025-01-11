using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.NobreakSync.Queries
{
    public class SyncMockApiNobreaksRequest : IRequest<NobreakSyncResult>
    {
    }
}
