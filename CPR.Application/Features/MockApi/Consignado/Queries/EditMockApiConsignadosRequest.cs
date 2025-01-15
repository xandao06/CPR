using CPR.Domain;
using MediatR;

public class EditMockApiConsignadosRequest : IRequest<Equipamento>
{
    public Equipamento Equipamento { get; set; }

    public EditMockApiConsignadosRequest(Equipamento equipamento)
    {
        Equipamento = equipamento;
    }
}
