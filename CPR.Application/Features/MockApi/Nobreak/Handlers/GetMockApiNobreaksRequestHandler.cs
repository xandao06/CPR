using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

public class GetMockApiNobreaksRequestHandler : IRequestHandler<GetMockApiNobreaksRequest, List<Nobreak>>
{
    private readonly IMockApiClient _mockApiClient;

    public GetMockApiNobreaksRequestHandler(IMockApiClient mockApiClient)
    {
        _mockApiClient = mockApiClient;
    }

    public async Task<List<Nobreak>> Handle(GetMockApiNobreaksRequest request, CancellationToken cancellationToken)
    {
        return await _mockApiClient.GetAsyncNobreak();
    }
}
