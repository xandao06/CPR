namespace CPR.Domain
{
    public class Chamado
    {
        public int Id { get; set; }
        public DateTime Data { get; set; } = DateTime.Now;
        public string Hora { get; set; } = DateTime.Now.TimeOfDay.ToString("hh\\:mm");
        public string Cliente { get; set; }
        public string Descricao { get; set; }
        public string Contrato { get; set; }
        public string Urgencia { get; set; }
        public string Status { get; set; }
        public string Opcoes { get; set; }
        public bool IsHistorico { get; set; } = false;
    }



    public class Nobreak
    {
        public int Id { get; set; }
        public DateTime DataTroca { get; set; } = DateTime.Now;
        public DateTime DataProximaTroca { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string NumeroSerie { get; set; }
        public string Cliente { get; set; }
        public string Descricao { get; set; }
        public string Bateria { get; set; }
        public int QuantidadeBateria { get; set; }
        public string VoltagemEntrada { get; set; }
        public string VoltagemSaida { get; set; }
        public string Capacidade { get; set; }
        public string Funcao { get; set; }
        public string OrdemServico { get; set; }
    }



    public class Equipamento
    {
        public int Id { get; set; }
        public DateTime Data { get; set; } = DateTime.Now;
        public string Hora { get; set; } = DateTime.Now.TimeOfDay.ToString("hh\\:mm");
        public string Cliente { get; set; }
        public string Descricao { get; set; }
        public string Contrato { get; set; }
        public string Status { get; set; }
        public string NumeroSerie { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Preco { get; set; }
        public int Quantidade { get; set; }
        public string Tipo { get; set; }
    }


    public class Veiculo
    {
        public int Id { get; set; }
        public DateTime DataUltimaRevisao { get; set; } = DateTime.Now;
        public DateTime DataUltimoAbastecimento { get; set; } = DateTime.Now;
        public DateTime DataUltimaTrocaOleo { get; set; } = DateTime.Now;
        public DateTime DataUltimaCalibragem { get; set; } = DateTime.Now;
        public int QuilometrosRodados { get; set; }
        public int QuilometrosProximaTrocaOleo { get; set; }
        public DateTime DataUltimoBalanceamento { get; set; } = DateTime.Now;
        public string PecasJaTrocadas { get; set; }
        public string PecasParaTrocar { get; set; }
        public DateTime DataTrocaPeca { get; set; } = DateTime.Now;
        public string Etanol { get; set; }
        public string PrecoGasolina { get; set; }
        public string Observacao { get; set; }
        public string MediaPorLitro { get; set; }
        public string Combustivel { get; set; }
        public int LitrosAbastecido { get; set; }
        public string PrecoAbastecimento { get; set; }
        public string Modelo { get; set; }
        public string Placa { get; set; }
        public string Ano { get; set; }
        public string Renavan { get; set; }
    }
}
