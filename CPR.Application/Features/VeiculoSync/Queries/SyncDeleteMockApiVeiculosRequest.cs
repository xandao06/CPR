using MediatR;

namespace CPR.Application.Features.VeiculoSync.Queries
{
    public class SyncDeleteMockApiVeiculosRequest : IRequest<bool>
    {
        public int Id { get; set; }

        public SyncDeleteMockApiVeiculosRequest(int id)
        {
            Id = id;
        }
    }
}
