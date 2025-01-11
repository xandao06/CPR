using CPR.Domain;
using MediatR;

public class CreateMockApiChamadosRequest : IRequest<Chamado>
{
    public Chamado Chamado { get; set; }

    public CreateMockApiChamadosRequest(Chamado chamado)
    {
        Chamado = chamado;
    }
}
