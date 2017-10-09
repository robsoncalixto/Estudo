
using System.Collections.Generic;

namespace EstudoTesteUnidade
{
    public class Leilao
    {
        public string Descricao { get; set; }
        public IList<Lance> Lances { get; set; }

        public Leilao(string descricao)
        {
            this.Descricao = descricao;
            this.Lances = new List<Lance>(); 

        }

        public void Propoe(Lance lance)
        {
            if (Lances.Count == 0 || (
           !ultimoLanceDado().Usuario.Equals(lance.Usuario) &&
           qtdDelancesDo(lance.Usuario) < 5))
            {
                Lances.Add(lance);
            }
        }
        private Lance ultimoLanceDado()
        {
            return Lances[Lances.Count - 1];
        }
        private int qtdDelancesDo(Usuario usuario)
        {
            int total = 0;
            foreach (Lance lance in Lances)
            {
                if (lance.Usuario.Equals(usuario)) total++;
            }
            return total;
        }
        private bool podeDarLance(Usuario usuario)
        {
            return !ultimoLanceDado().Usuario.Equals(usuario)
                && qtdDelancesDo(usuario) < 5;
        }
    }
}
