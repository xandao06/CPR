using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

public class EditMockApiChamadosRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<EditMockApiChamadosRequest, Chamado>
{
    private readonly IMockApiClient _mockApiClient = mockApiClient;

    public async Task<Chamado> Handle(EditMockApiChamadosRequest request, CancellationToken cancellationToken)
    {
        var updatedChamado = await _mockApiClient.EditAsync(request.Chamado);
        return updatedChamado;
    }
}
