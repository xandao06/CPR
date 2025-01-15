using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

public class GetMockApiConsignadosRequestHandler : IRequestHandler<GetMockApiConsignadosRequest, List<Equipamento>>
{
    private readonly IMockApiClient _mockApiClient;
    public GetMockApiConsignadosRequestHandler(IMockApiClient mockApiClient)
    {
        _mockApiClient = mockApiClient;
    }

    public async Task<List<Equipamento>> Handle(GetMockApiConsignadosRequest request, CancellationToken cancellationToken)
    {
        return await _mockApiClient.GetAsyncConsignado();
    }
}
