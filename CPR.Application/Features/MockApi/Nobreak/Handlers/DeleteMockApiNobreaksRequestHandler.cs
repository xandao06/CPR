using CPR.Domain.Contracts.Client;
using MediatR;

public class DeleteMockApiNobreaksRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<DeleteMockApiNobreaksRequest, bool>
{
    private readonly IMockApiClient _mockApiClient = mockApiClient;

    public async Task<bool> Handle(DeleteMockApiNobreaksRequest request, CancellationToken cancellationToken)
    {
        return await _mockApiClient.DeleteAsyncNobreak(request.Id);
    }
}
