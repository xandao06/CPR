using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

public class CreateMockApiNobreaksRequestHandler : IRequestHandler<CreateMockApiNobreaksRequest, Nobreak>
{
    private readonly IMockApiClient _mockApiClient;

    public CreateMockApiNobreaksRequestHandler(IMockApiClient mockApiClient)
    {
        _mockApiClient = mockApiClient;
    }

    public async Task<Nobreak> Handle(CreateMockApiNobreaksRequest request, CancellationToken cancellationToken)
    {
        return await _mockApiClient.CreateAsyncNobreak(request.Nobreak);
    }
}
