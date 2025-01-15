
using CPR.Domain.Contracts.Client;
using CPR.Domain;
using MediatR;

    public class EditMockApiConsignadosRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<EditMockApiConsignadosRequest, Equipamento>
    {
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<Equipamento> Handle(EditMockApiConsignadosRequest request, CancellationToken cancellationToken)
        {
            var updatedConsignado = await _mockApiClient.EditAsyncConsignado(request.Equipamento);
            return updatedConsignado;
        }
    }
