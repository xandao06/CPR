using CPR.Domain;
using MediatR;

public class EditMockApiRegistroVeiculoRequest : IRequest<RegistroVeiculo>
{
    public RegistroVeiculo RegistroVeiculo { get; set; }

    public EditMockApiRegistroVeiculoRequest(RegistroVeiculo registroVeiculo)
    {
        RegistroVeiculo = registroVeiculo;
    }
}
