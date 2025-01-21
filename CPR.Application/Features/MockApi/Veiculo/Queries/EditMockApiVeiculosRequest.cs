using CPR.Domain;
using MediatR;

public class EditMockApiVeiculosRequest : IRequest<Veiculo>
{
    public Veiculo Veiculo { get; set; }

    public EditMockApiVeiculosRequest(Veiculo veiculo)
    {
        Veiculo = veiculo;
    }
}
