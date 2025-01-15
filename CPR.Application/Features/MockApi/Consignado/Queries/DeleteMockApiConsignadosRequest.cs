using MediatR;

    public class DeleteMockApiConsignadosRequest : IRequest<bool>
    {
        public int Id { get; set; }

        public DeleteMockApiConsignadosRequest(int id)
        {
            Id = id;
        }
    }
