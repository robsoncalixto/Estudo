using NUnit.Framework;

namespace EstudoTesteUnidade
{
    [TestFixture]
    public class LeilaoTest
    {
        [Test]
        public void DeveReceberUmLance()
        {
            Leilao leilao = new Leilao("Cavalo de corrida");
            Assert.AreEqual(0, leilao.Lances.Count);

            var usuario = new Usuario("Dom Pedro II");
            leilao.Propoe(new Lance(usuario, 2000));

            Assert.AreEqual(1, leilao.Lances.Count);
            Assert.AreEqual(2000, leilao.Lances[0].valor,0.00001);
        }
        [Test]
        public void DeveReceberVariosLances()
        {
            Leilao leilao = new Leilao("Cavalo de corrida");
            leilao.Propoe(new Lance(new Usuario("Don Pedro II"), 20000));
            leilao.Propoe(new Lance(new Usuario("Don Juan"), 18000));

            Assert.AreEqual(2, leilao.Lances.Count);
            Assert.AreEqual(20000, leilao.Lances[0].valor, 0.00001);
            Assert.AreEqual(18000, leilao.Lances[1].valor, 0.00001);
        }
        [Test]
        public void NaoDeveAceitarDoisLancesSeguidosDoMesmoUsuario()
        {
            Leilao leilao = new Leilao("Macbook Pro 15");
            Usuario steveJobs = new Usuario("Steve Jobs");

            leilao.Propoe(new Lance(steveJobs, 2000));
            leilao.Propoe(new Lance(steveJobs, 3000));

            Assert.AreEqual(1, leilao.Lances.Count);
            Assert.AreEqual(2000, leilao.Lances[0].valor, 0.00001);
        }

    }
}
