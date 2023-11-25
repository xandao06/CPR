using Microsoft.AspNetCore.Components.Web.Virtualization;

namespace CPR.Models.Domain
{
    public class Cliente
    {
        public string Fantasia { get; set; }
        public int Id { get; set; }
        public string Contrato { get; set; }
        public int CPFouCNPJ { get; set; }
        public string Endereco { get; set; }
        public string InscricaoEstadual { get; set; }
        public int Telefone { get; set; }
        public string RazaoSocial { get; set; }
    }
}
