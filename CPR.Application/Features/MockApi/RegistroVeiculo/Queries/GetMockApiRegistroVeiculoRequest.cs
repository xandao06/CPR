using CPR.Domain;
using MediatR;

public class GetMockApiRegistroVeiculoRequest : IRequest<List<RegistroVeiculo>>
{
    public int? VeiculoId { get; }

    public GetMockApiRegistroVeiculoRequest(int? veiculoId = null)
    {
        VeiculoId = veiculoId;
    }
}
