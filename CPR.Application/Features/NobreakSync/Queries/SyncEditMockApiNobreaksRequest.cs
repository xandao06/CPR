using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.NobreakSync.Queries
{
    public class SyncEditMockApiNobreaksRequest : IRequest<NobreakSyncResult>
    {
        public Nobreak Nobreak { get; set; }

        public SyncEditMockApiNobreaksRequest(Nobreak nobreak)
        {
            Nobreak = nobreak;
        }
    }
}
