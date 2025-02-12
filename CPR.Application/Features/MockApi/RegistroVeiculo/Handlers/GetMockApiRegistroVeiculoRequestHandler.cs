using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

public class GetMockApiRegistroVeiculoRequestHandler : IRequestHandler<GetMockApiRegistroVeiculoRequest, List<RegistroVeiculo>>
{
    private readonly IMockApiClient _mockApiClient;

    public GetMockApiRegistroVeiculoRequestHandler(IMockApiClient mockApiClient)
    {
        _mockApiClient = mockApiClient;
    }

    public async Task<List<RegistroVeiculo>> Handle(GetMockApiRegistroVeiculoRequest request, CancellationToken cancellationToken)
    {
        // Obtém todos os registros ou filtra pelo VeiculoId
        return await _mockApiClient.GetAsyncRegistroVeiculo(request.VeiculoId);
    }
}
