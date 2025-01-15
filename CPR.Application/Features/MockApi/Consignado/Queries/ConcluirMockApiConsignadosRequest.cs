using CPR.Domain;
using MediatR;

public class ConcluirMockApiConsignadosRequest : IRequest<Equipamento>
{
    public int Id { get; set; }

    public ConcluirMockApiConsignadosRequest(int id)
    {
        Id = id;
    }
}
