using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;

public class GetMockApiRegistroVeiculoRequestHandler : IRequestHandler<GetMockApiRegistroVeiculoRequest, List<RegistroVeiculo>>
{
    private readonly IMockApiClient _mockApiClient;
    public GetMockApiRegistroVeiculoRequestHandler(IMockApiClient mockApiClient)
    {
        _mockApiClient = mockApiClient;
    }

    public async Task<List<RegistroVeiculo>> Handle(GetMockApiRegistroVeiculoRequest request, CancellationToken cancellationToken)
    {
        return await _mockApiClient.GetAsyncRegistroVeiculo();
    }
}
