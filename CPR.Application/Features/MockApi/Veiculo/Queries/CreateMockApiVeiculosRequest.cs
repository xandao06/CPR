using CPR.Domain;
using MediatR;

public class CreateMockApiVeiculosRequest : IRequest<Veiculo>
{
    public Veiculo Veiculo { get; set; }

    public CreateMockApiVeiculosRequest(Veiculo veiculo)
    {
        Veiculo = veiculo;
    }
}
