using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

public class EditMockApiNobreaksRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<EditMockApiNobreaksRequest, Nobreak>
{
    private readonly IMockApiClient _mockApiClient = mockApiClient;

    public async Task<Nobreak> Handle(EditMockApiNobreaksRequest request, CancellationToken cancellationToken)
    {
        var updatedNobreak = await _mockApiClient.EditAsyncNobreak(request.Nobreak);
        return updatedNobreak;
    }
}
