using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

public class ConcluirMockApiChamadoRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<ConcluirMockApiChamadoRequest, Chamado>
{
    private readonly IMockApiClient _mockApiClient = mockApiClient;

    public async Task<Chamado> Handle(ConcluirMockApiChamadoRequest request, CancellationToken cancellationToken)
    {
        var chamado = await _mockApiClient.GetByIdAsync(request.Id);
        if (chamado != null)
        {
            chamado.Status = "Concluido";
            await _mockApiClient.EditAsync(chamado);
        }
        return chamado;
    }
}
