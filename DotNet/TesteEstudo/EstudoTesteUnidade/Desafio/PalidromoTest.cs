using NUnit.Framework;

namespace EstudoTesteUnidade.Desafio
{
    [TestFixture]
    public class PalidromoTest
    {
        [Test]
        public void identificaPalidromo()
        {
            var palidromo = new Palindromo();
            var resultado = palidromo.EhPalindromo("Socorram-me subi no onibus em Marrocos");

            Assert.IsTrue(resultado);
        }
        [Test]
        public void identificaNaoPolidromo()
        {
            var palidromo = new Palindromo();
            var resultado = palidromo.EhPalindromo("Uma vez flamengo sempre flamengo");

            Assert.IsFalse(resultado);

        }

    }
}
