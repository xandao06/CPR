using MediatR;

namespace CPR.Application.Features.ChamadoSync.Queries
{
    public class SyncDeleteMockApiChamadoRequest : IRequest<bool>
    {
        public int Id { get; set; }

        public SyncDeleteMockApiChamadoRequest(int id)
        {
            Id = id;
        }
    }
}
