
using System;

namespace EstudoTesteUnidade.Desafio
{
    public class Palindromo
    {
        public bool EhPalindromo(String frase)
        {
            String fraseFiltrada = frase
                    .ToUpper().Replace(" ", "").Replace("-", "");

            int index = fraseFiltrada.Length;
            for (int i = 0; i < fraseFiltrada.Length; i++)
            {
                --index;
                if (fraseFiltrada[i] != fraseFiltrada[index])
                {
                    return false;
                }
            }

            return true;
        }
    }

}
