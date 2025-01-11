using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

public class CreateMockApiChamadosRequestHandler : IRequestHandler<CreateMockApiChamadosRequest, Chamado>
{
    private readonly IMockApiClient _mockApiClient;

    public CreateMockApiChamadosRequestHandler(IMockApiClient mockApiClient)
    {
        _mockApiClient = mockApiClient;
    }

    public async Task<Chamado> Handle(CreateMockApiChamadosRequest request, CancellationToken cancellationToken)
    {
        return await _mockApiClient.CreateAsync(request.Chamado);
    }
}
