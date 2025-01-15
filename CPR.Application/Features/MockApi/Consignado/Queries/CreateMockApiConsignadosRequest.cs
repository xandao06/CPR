using CPR.Domain;
using MediatR;

public class CreateMockApiConsignadosRequest : IRequest<Equipamento>
{
    public Equipamento Equipamento { get; set; }

    public CreateMockApiConsignadosRequest(Equipamento equipamento)
    {
        Equipamento = equipamento;
    }
}
