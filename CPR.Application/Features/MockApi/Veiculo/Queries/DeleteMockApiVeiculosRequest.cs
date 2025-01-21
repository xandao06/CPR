using MediatR;

    public class DeleteMockApiVeiculosRequest : IRequest<bool>
    {
        public int Id { get; set; }

        public DeleteMockApiVeiculosRequest(int id)
        {
            Id = id;
        }
    }
