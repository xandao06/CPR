using CPR.Domain;
using MediatR;

public class ConcluirMockApiChamadoRequest : IRequest<Chamado>
{
    public int Id { get; set; }

    public ConcluirMockApiChamadoRequest(int id)
    {
        Id = id;
    }
}
