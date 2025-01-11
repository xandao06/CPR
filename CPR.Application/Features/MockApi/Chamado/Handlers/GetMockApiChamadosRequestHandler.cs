using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

public class GetMockApiChamadosRequestHandler : IRequestHandler<GetMockApiChamadosRequest, List<Chamado>>
{
    private readonly IMockApiClient _mockApiClient;

    public GetMockApiChamadosRequestHandler(IMockApiClient mockApiClient)
    {
        _mockApiClient = mockApiClient;
    }

    public async Task<List<Chamado>> Handle(GetMockApiChamadosRequest request, CancellationToken cancellationToken)
    {
        return await _mockApiClient.GetAsyncChamado();
    }
}
