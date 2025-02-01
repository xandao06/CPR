using CPR.Domain;
using MediatR;
public class CreateMockApiRegistroVeiculoRequest : IRequest<RegistroVeiculo>
{
    public RegistroVeiculo RegistroVeiculo { get; set; }

    public CreateMockApiRegistroVeiculoRequest(RegistroVeiculo registroVeiculo)
    {
        RegistroVeiculo = registroVeiculo;
    }
}
