using MediatR;

namespace CPR.Application.Features.ConsignadoSync.Queries
{
    public class SyncDeleteMockApiConsignadosRequest : IRequest<bool>
    {
        public int Id { get; set; }

        public SyncDeleteMockApiConsignadosRequest(int id)
        {
            Id = id;
        }
    }
}
