using CPR.Domain;
using MediatR;

public class EditMockApiChamadosRequest : IRequest<Chamado>
{
    public Chamado Chamado { get; set; }

    public EditMockApiChamadosRequest(Chamado chamado)
    {
        Chamado = chamado;
    }
}
