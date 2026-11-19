import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import BotaoCustomizado from '../../components/CustomizedButton/CustomizedButton';
import styles from './StoreAvailability.module.css';
import estanteImg from '../../assets/estantetomneutro.png';
import quadroImg from '../../assets/quadrosneutros.png';
import { AlarmClock, Heart, LockKeyhole } from 'lucide-react';

export default function StoreAvailabilityPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [estadoEstoque, setEstadoEstoque] = useState('baixo');
  const [produtoAtual, setProdutoAtual] = useState({
    nome: 'Prateleira industrial preta',
    preco: 349.00,
    imagem: estanteImg
  });

  // Estado para controlar o pop-up do Google Maps
  const [mostrarModalMaps, setMostrarModalMaps] = useState(false);
  const [contadorMaps, setContadorMaps] = useState(5);

  useEffect(() => {
    const produtoId = location.state?.produtoId;

    if (produtoId === 1 || !produtoId) {
      setEstadoEstoque('baixo');
      setProdutoAtual({
        nome: 'Prateleira industrial preta',
        preco: 349.00,
        imagem: estanteImg
      });
    } else if (produtoId === 2) {
      setEstadoEstoque('indisponivel');
      setProdutoAtual({
        nome: 'Luminária pendente de metal',
        preco: 189.00,
        imagem: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=200&q=80'
      });
    } else if (produtoId === 3) {
      setEstadoEstoque('disponivel');
      setProdutoAtual({
        nome: 'Quadro em tons neutros',
        preco: 129.00,
        imagem: quadroImg
      });
    }
  }, [location.state]);

  // Efeito para o temporizador de 5 segundos do Google Maps
  useEffect(() => {
    let timer;
    if (mostrarModalMaps && contadorMaps > 0) {
      timer = setInterval(() => {
        setContadorMaps(prev => prev - 1);
      }, 1000);
    } else if (contadorMaps === 0 && mostrarModalMaps) {
      // Após 5 segundos, fecha o pop-up e vai para a Home indicando que a reserva foi feita
      setMostrarModalMaps(false);
      navigate('/', { state: { reservaRealizada: true } });
    }
    return () => clearInterval(timer);
  }, [mostrarModalMaps, contadorMaps, navigate]);

  const handleAbrirGoogleMaps = () => {
    setContadorMaps(5);
    setMostrarModalMaps(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.phone}>

        <div className={styles.topBar}>
          <BackButton onClick={() => navigate('/results')} />
        </div>

        <div className={styles.conteudo}>

          <div className={styles.imagemWrapper}>
            <img
              src={produtoAtual.imagem}
              alt={produtoAtual.nome}
              className={styles.imagem}
            />
          </div>

          <h2 className={styles.nome}>{produtoAtual.nome}</h2>

          <div className={styles.preco}>
            R$ {produtoAtual.preco.toFixed(2).replace('.', ',')}
          </div>

          <div className={styles.disponibilidadeTitulo}>
            Disponibilidade em loja
          </div>

          <div className={styles.lojaLista}>
            <div className={styles.lojaCard}>
              <div>
                <div className={styles.lojaNome}>Loja Pinheiros</div>
                <div className={styles.lojaEstoque}><AlarmClock size={16} />Últimas 3 unidades</div>
              </div>
              <span className={styles.lojaCorredor}>Corredor 5</span>
            </div>

            <div className={styles.lojaAviso}>
              <LockKeyhole size={16} /> Poucas unidades. Reserve por 2 horas e retire sem fila.
            </div>
          </div>

        </div>

        {/* Botões solicitados para a prateleira */}
        <div className={styles.acoes}>
          <BotaoCustomizado
            texto="Reservar por 2 horas"
            tamanho="grande"
            variante="verde"
            onClick={() => {
              alert('Produto reservado com sucesso por 2 horas!');
              navigate('/', { state: { reservaRealizada: true } });
            }}
          />
          <BotaoCustomizado
            texto="Localização da Loja de Pinheiros"
            tamanho="grande"
            variante="branco"
            onClick={() => navigate('/store-map')}
          />
        </div>

        {/* MODAL / POP-UP DO GOOGLE MAPS (Simulação por 5 segundos) */}
        {mostrarModalMaps && (
          <div className={styles.mapsOverlay}>
            <div className={styles.mapsIcone}><Map /></div>
            <h3 className={styles.mapsTitulo}>Abrindo Google Maps...</h3>
            <p className={styles.mapsTexto}>
              Traçando rota para a <b>Leroy Merlin - Loja Pinheiros</b>.
            </p>
            <div className={styles.mapsContador}>
              Retornando em <b>{contadorMaps}s</b>...
            </div>
          </div>
        )}

        <div className={styles.indicador}></div>
      </div>
    </div>
  );
}