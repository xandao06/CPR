using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.ConsignadoSync.Queries
{
    public class SyncConcluirMockApiConsignadosRequest : IRequest<Equipamento>
    {
        public int Id { get; set; }

        public SyncConcluirMockApiConsignadosRequest(int id)
        {
            Id = id;
        }
    }
}
