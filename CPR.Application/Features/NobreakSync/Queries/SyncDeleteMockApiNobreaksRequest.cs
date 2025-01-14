using MediatR;

namespace CPR.Application.Features.NobreakSync.Queries
{
    public class SyncDeleteMockApiNobreaksRequest : IRequest<bool>
    {
        public int Id { get; set; }

        public SyncDeleteMockApiNobreaksRequest(int id)
        {
            Id = id;
        }
    }
}
