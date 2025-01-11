using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;

public class GetChamadosConcluidosRequestHandler(IMockApiClient mockApiClient)
    : IRequestHandler<GetChamadosConcluidosRequest, List<Chamado>>
{
    private readonly IMockApiClient _mockApiClient = mockApiClient;

    public async Task<List<Chamado>> Handle(GetChamadosConcluidosRequest request, CancellationToken cancellationToken)
    {
        return await _mockApiClient.GetHistoricoAsync();
    }
}

