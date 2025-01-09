using CPR.Domain;
using MediatR;

namespace CPR.Application.Features.ChamadoSync.Commands
{
    public class SyncConcluirMockApiChamadoRequest : IRequest<Chamado>
    {
        public int Id { get; set; }

        public SyncConcluirMockApiChamadoRequest(int id)
        {
            Id = id;
        }
    }
}
