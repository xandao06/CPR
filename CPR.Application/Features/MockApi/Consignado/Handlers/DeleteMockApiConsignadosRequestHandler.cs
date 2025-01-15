using CPR.Domain.Contracts.Client;
using MediatR;

    public class DeleteMockApiConsignadosRequestHandler(IMockApiClient mockApiClient) : IRequestHandler<DeleteMockApiConsignadosRequest, bool>
    {
        private readonly IMockApiClient _mockApiClient = mockApiClient;

        public async Task<bool> Handle(DeleteMockApiConsignadosRequest request, CancellationToken cancellationToken)
        {
            return await _mockApiClient.DeleteAsyncConsignado(request.Id);
        }
    }
