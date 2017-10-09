
using System.Collections.Generic;

namespace EstudoTesteUnidade.Desafio
{
   public class FiltroDeLances
    {
        public IList<Lance> Filtra(IList<Lance> lances)
        {
            IList<Lance> resultado = new List<Lance>();

            foreach (Lance lance in lances)
            {
                if (lance.valor > 1000 && lance.valor < 3000)
                    resultado.Add(lance);
                else if (lance.valor > 500 && lance.valor < 700)
                    resultado.Add(lance);
                else if (lance.valor > 5000)
                    resultado.Add(lance);
            }

            return resultado;
        }

    }
}
