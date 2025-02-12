using MediatR;

namespace CPR.Application.Features.RegistroVeiculoSync.Queries
{
    public class SyncDeleteMockApiRegistroVeiculoRequest : IRequest<bool>
    {
        public int Id { get; set; }

        public SyncDeleteMockApiRegistroVeiculoRequest(int id)
        {
            Id = id;
        }
    }
}
