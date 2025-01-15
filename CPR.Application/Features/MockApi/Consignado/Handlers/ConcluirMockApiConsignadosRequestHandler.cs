using CPR.Domain;
using CPR.Domain.Contracts.Client;
using MediatR;

public class ConcluirMockApiConsignadosRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<ConcluirMockApiConsignadosRequest, Equipamento>
{
    private readonly IMockApiClient _mockApiClient = mockApiClient;

    public async Task<Equipamento> Handle(ConcluirMockApiConsignadosRequest request, CancellationToken cancellationToken)
    {
        var equipamento = await _mockApiClient.GetByIdAsyncConsignado(request.Id);
        if (equipamento != null)
        {
            equipamento.Status = "Concluido";
            await _mockApiClient.EditAsyncConsignado(equipamento);
        }
        return equipamento;
    }
}
