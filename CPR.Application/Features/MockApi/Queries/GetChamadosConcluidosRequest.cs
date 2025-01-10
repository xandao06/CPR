using MediatR;
using CPR.Domain;
using System.Collections.Generic;

public class GetChamadosConcluidosRequest : IRequest<List<Chamado>>
{
}
