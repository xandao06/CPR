using CPR.Domain.Contracts.Client;
using MediatR;

public class DeleteMockApiRegistroVeiculoRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<DeleteMockApiRegistroVeiculoRequest, bool>
{
    private readonly IMockApiClient _mockApiClient = mockApiClient;

    public async Task<bool> Handle(DeleteMockApiRegistroVeiculoRequest request, CancellationToken cancellationToken)
    {
        return await _mockApiClient.DeleteAsyncRegistroVeiculo(request.Id);
    }
}
