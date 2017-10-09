using System.Collections.Generic;
using NUnit.Framework;

namespace EstudoTesteUnidade.Desafio
{
    [TestFixture]
    public class FiltroDeLancesTest
    {
        [Test]
        public void DeveSelecionarLancesEntre1000E3000()
        {
            Usuario joao = new Usuario("Joao");

            FiltroDeLances filtro = new FiltroDeLances();
            IList<Lance> resultado = filtro.Filtra(new List<Lance>() {
            new Lance(joao,2000),
            new Lance(joao,1000),
            new Lance(joao,3000),
            new Lance(joao, 800)});

            Assert.AreEqual(1, resultado.Count);
            Assert.AreEqual(2000, resultado[0].valor, 0.00001);
        }

        [Test]
        public void DeveSelecionarLancesEntre500E700()
        {
            Usuario joao = new Usuario("Joao");

            FiltroDeLances filtro = new FiltroDeLances();
            IList<Lance> resultado = filtro.Filtra(new List<Lance>() {
            new Lance(joao,600),
            new Lance(joao,500),
            new Lance(joao,700),
            new Lance(joao, 800)});

            Assert.AreEqual(1, resultado.Count);
            Assert.AreEqual(600, resultado[0].valor, 0.00001);
        }

        [Test]
        public void DeveSelecionarLancesMaiorQue5000()
        {
            Usuario joao = new Usuario("Joao");

            FiltroDeLances filtro = new FiltroDeLances();
            IList<Lance> resultado = filtro.Filtra(new List<Lance>() {
            new Lance(joao,6000),
            new Lance(joao,500),
            new Lance(joao,7000),
            new Lance(joao, 800)});

            Assert.AreEqual(2, resultado.Count);
            Assert.AreEqual(6000, resultado[0].valor, 0.00001);
        }
    }
}
