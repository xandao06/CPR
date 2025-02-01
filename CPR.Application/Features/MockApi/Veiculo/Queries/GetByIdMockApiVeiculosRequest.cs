using CPR.Domain;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

    public class GetByIdMockApiVeiculosRequest : IRequest<Veiculo>
    {
        public int Id { get; set; }

        public GetByIdMockApiVeiculosRequest(int id)
        {
            Id = id;
        }
    }
