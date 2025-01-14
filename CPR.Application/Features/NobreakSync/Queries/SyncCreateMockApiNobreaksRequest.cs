using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.NobreakSync.Queries
{
    public class SyncCreateMockApiNobreaksRequest : IRequest<NobreakSyncResult>
    {
        public Nobreak Nobreak { get; set; }

        public SyncCreateMockApiNobreaksRequest(Nobreak nobreak)
        {
            Nobreak = nobreak;
        }
    }
}

