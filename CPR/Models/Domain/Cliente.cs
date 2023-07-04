namespace CPR.Models.Domain
{
    public class Cliente
    {
        public string Fantasia { get; set; }
        public int Id { get; set; }
        public string Contrato { get; set; }
        public int CNPJ { get; set; }
        public int CPF { get; set; }
        public string Endereco { get; set; }
        public string InscricaoEstadual { get; set; }
        public int Telefone { get; set; }
        public string RazaoSocial { get; set; }
    }
}
