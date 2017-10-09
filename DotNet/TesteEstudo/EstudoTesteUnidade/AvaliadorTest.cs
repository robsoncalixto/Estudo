
using System;
using NUnit.Framework;
using System.Collections.Generic;

namespace EstudoTesteUnidade
{
    [TestFixture]
    public class AvaliadorTest
    {
        [Test]
        public void DeveEntenderLancesEmOrdemCrescente()
        {
            Usuario joao = new Usuario("Joao");
            Usuario jose = new Usuario("José");
            Usuario maria = new Usuario("Maria");

            Leilao leilao = new Leilao("Playstation 3 Novo");

            leilao.Propoe(new Lance(joao, 300.0));
            leilao.Propoe(new Lance(jose, 400.0));
            leilao.Propoe(new Lance(maria, 250.0));

            Avaliador leiloeiro = new Avaliador();
            leiloeiro.Avalia(leilao);

            double maiorLance = 400;
            double menorLance = 250;


            Assert.AreEqual(maiorLance, leiloeiro.MaiorLance);
            Assert.AreEqual(menorLance, leiloeiro.MenorLance);
        }
        [Test]
        public void DeveEntederLanceUnico()
        {
            var Jose = new Usuario("Jose");

            var leilao = new Leilao("Opala 86 v8");
            leilao.Propoe(new Lance(Jose, 470.0));

            Avaliador leiloeiro = new Avaliador();

            leiloeiro.Avalia(leilao);
            
            Assert.AreEqual(470, leiloeiro.MaiorLance);
            Assert.AreEqual(470, leiloeiro.MenorLance);
        }

        [Test]
        public void DeveEncontrarOsTresMaioresLances()
        {
            Usuario joao = new Usuario("João");
            Usuario maria = new Usuario("Maria");
            Leilao leilao = new Leilao("Playstation 3 Novo");

            leilao.Propoe(new Lance(joao, 100.0));
            leilao.Propoe(new Lance(maria, 200.0));
            leilao.Propoe(new Lance(joao, 300.0));
            leilao.Propoe(new Lance(maria, 400.0));

            Avaliador leiloeiro = new Avaliador();
            leiloeiro.Avalia(leilao);

            IList<Lance> maiores = leiloeiro.TresMaiores;

            Assert.AreEqual(3, maiores.Count);
            Assert.AreEqual(400, maiores[0].valor);
            Assert.AreEqual(300, maiores[1].valor);
            Assert.AreEqual(200, maiores[2].valor);

        }

        [Test]
        public void DeveEncontrarMaiorEoMenorEmOrdemAleatoria()
        {
            Usuario maria = new Usuario("Maria");
            Usuario patricia = new Usuario("Patricia");
            Usuario suelen = new Usuario("Suelen");
            Usuario clementina = new Usuario("Clementina");
            Usuario thais = new Usuario("Thais");

            Leilao leilao = new Leilao("Sapato Novinho");

            leilao.Propoe(new Lance(patricia, 200.0));
            leilao.Propoe(new Lance(maria, 450.0));
            leilao.Propoe(new Lance(clementina, 120.0));
            leilao.Propoe(new Lance(thais, 700.0));
            leilao.Propoe(new Lance(suelen, 600.0));
            leilao.Propoe(new Lance(maria, 230.0));

            Avaliador leiloeiro = new Avaliador();
            leiloeiro.Avalia(leilao);

            Assert.AreEqual(700, leiloeiro.MaiorLance);
            Assert.AreEqual(120, leiloeiro.MenorLance);

        }
        [Test]
        public void DeveEncontrarOsTresMaiores()
        {
            Usuario joao = new Usuario("João");
            Usuario maria = new Usuario("Maria");
            Usuario jessica = new Usuario("Jessica");
            Usuario reginaldo = new Usuario("reginaldo");


            Leilao leilao = new Leilao("Furadeira da Marvel");

            leilao.Propoe(new Lance(joao, 300.0));
            leilao.Propoe(new Lance(maria, 50.0));
            leilao.Propoe(new Lance(reginaldo, 800.0));
            leilao.Propoe(new Lance(jessica, 2700.0));

            Avaliador leiloeiro = new Avaliador();
            leiloeiro.Avalia(leilao);

            IList<Lance> maiores = leiloeiro.TresMaiores;
            Assert.AreEqual(3, maiores.Count);
            Assert.AreEqual(2700, maiores[0].valor);
            Assert.AreEqual(800, maiores[1].valor);
            Assert.AreEqual(300, maiores[2].valor);

        }

        [Test]
        public void DeveEncontrarOsDoisMaiores()
        {
            Usuario joao = new Usuario("João");
            Usuario pedro = new Usuario("Pedro");
            Leilao leilao = new Leilao("Furadeira da Marvel");

            leilao.Propoe(new Lance(joao, 300.0));
            leilao.Propoe(new Lance(pedro, 2700.0));

            Avaliador leiloeiro = new Avaliador();
            leiloeiro.Avalia(leilao);

            IList<Lance> maiores = leiloeiro.TresMaiores;

            Assert.AreEqual(2, maiores.Count);
            Assert.AreEqual(2700, maiores[0].valor);
            Assert.AreEqual(300, maiores[1].valor);

        }

        [Test]
        public void DeveRetornarUmaListaFazia()
        {
            Usuario joao = new Usuario("João");
            Leilao leilao = new Leilao("Furadeira da Marvel");

            Avaliador leiloeiro = new Avaliador();
            leiloeiro.Avalia(leilao);

            IList<Lance> maiores = leiloeiro.TresMaiores;
            Assert.AreEqual(0, maiores.Count);

        }
        [Test]
        public void NaoDeveAceitarMaisDoQue5LancesDeUmMesmoUsuario()
        {
            Leilao leilao = new Leilao("Macbook Pro 15");
            Usuario steveJobs = new Usuario("Steve Jobs");
            Usuario billGates = new Usuario("Bill Gates");

            leilao.Propoe(new Lance(steveJobs, 2000));
            leilao.Propoe(new Lance(billGates, 3000));
            leilao.Propoe(new Lance(steveJobs, 4000));
            leilao.Propoe(new Lance(billGates, 5000));
            leilao.Propoe(new Lance(steveJobs, 6000));
            leilao.Propoe(new Lance(billGates, 7000));
            leilao.Propoe(new Lance(steveJobs, 8000));
            leilao.Propoe(new Lance(billGates, 9000));
            leilao.Propoe(new Lance(steveJobs, 10000));
            leilao.Propoe(new Lance(billGates, 11000));

            // deve ser ignorado
            leilao.Propoe(new Lance(steveJobs, 12000));

            Assert.AreEqual(10, leilao.Lances.Count);
            int ultimo = leilao.Lances.Count - 1;
            Lance ultimoLance = leilao.Lances[ultimo];
            Assert.AreEqual(11000.0, ultimoLance.valor, 0.00001);
        }
    }
}
