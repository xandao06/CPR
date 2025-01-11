using CPR.Domain.Contracts.Client;
using MediatR;

public class DeleteMockApiChamadosRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<DeleteMockApiChamadosRequest, bool>
{
    private readonly IMockApiClient _mockApiClient = mockApiClient;

    public async Task<bool> Handle(DeleteMockApiChamadosRequest request, CancellationToken cancellationToken)
    {
        return await _mockApiClient.DeleteAsync(request.Id);
    }
}
