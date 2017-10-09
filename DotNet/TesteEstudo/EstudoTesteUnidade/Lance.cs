
using System.Collections.Generic;


namespace EstudoTesteUnidade
{
    public class Lance
    {
        public Usuario Usuario { get; private set; }
        public double valor { get; private set; }

        public Lance(Usuario usuario, double valor)
        {
            this.Usuario = usuario;
            this.valor = valor;
        }
    }
}
