
using System;
using System.Collections.Generic;
using System.Linq;

namespace EstudoTesteUnidade
{
    public class Avaliador
    {
        private double maiorDeTodos = Double.MinValue;
        private double menorDeTodos = Double.MaxValue;
        private List<Lance> maiores;

        public void Avalia(Leilao leilao)
        {
            foreach (var lance in leilao.Lances)
            {
                if (lance.valor > maiorDeTodos) maiorDeTodos = lance.valor;
                if (lance.valor < menorDeTodos) menorDeTodos = lance.valor;
            }

            PegaMaioresNo(leilao);
        }
        public double MaiorLance { get { return maiorDeTodos; } }
        public double MenorLance { get { return menorDeTodos; } }
        
        public List<Lance> TresMaiores
        {
          get { return this.maiores; }
        }

        private void PegaMaioresNo(Leilao leilao)
        {
            var filtro = leilao.Lances.OrderByDescending(p => p.valor).Take(3);
            maiores = new List<Lance>(filtro);
        }

    }
}
