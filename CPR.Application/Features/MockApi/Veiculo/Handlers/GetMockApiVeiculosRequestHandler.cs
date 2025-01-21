using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

public class GetMockApiVeiculosRequestHandler : IRequestHandler<GetMockApiVeiculosRequest, List<Veiculo>>
{
    private readonly IMockApiClient _mockApiClient;
    public GetMockApiVeiculosRequestHandler(IMockApiClient mockApiClient)
    {
        _mockApiClient = mockApiClient;
    }

    public async Task<List<Veiculo>> Handle(GetMockApiVeiculosRequest request, CancellationToken cancellationToken)
    {
        return await _mockApiClient.GetAsyncVeiculo();
    }
}
