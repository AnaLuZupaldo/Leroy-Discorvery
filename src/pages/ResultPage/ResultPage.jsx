import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Search, Zap } from 'lucide-react';
import BackButton from '../../components/BackButton/BackButton';
import BotaoCustomizado from '../../components/CustomizedButton/CustomizedButton';
import ProdutoCard from './components/ProductCard';
import styles from './ResultPage.module.css';

// Importando as imagens locais
import estanteImg from '../../assets/estantetomneutro.png';
import quadroImg from '../../assets/quadrosneutros.png';

const PRODUTOS_RECOMENDADOS = [
  {
    id: 1, // Prateleira (estoque baixo)
    nome: 'Prateleira industrial preta',
    preco: 349.0,
    compatibilidade: 96,
    imagem: estanteImg
  },
  {
    id: 2, // Luminária (indisponível)
    nome: 'Luminária pendente de metal',
    preco: 189.0,
    compatibilidade: 91,
    imagem: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3, // Quadro (disponível)
    nome: 'Quadro em tons neutros',
    preco: 129.0,
    compatibilidade: 88,
    imagem: quadroImg
  }
];

export default function ResultPage() {
  const navigate = useNavigate();

  const [screenState, setScreenState] = useState('success');
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [favoritos, setFavoritos] = useState({});

  const toggleFavorito = (id) => {
    setFavoritos((prev) => ({ ...prev, [id]: !prev[id] }));
    setShowAccountModal(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.phone}>

        <div className={styles.topBar}>
          <BackButton onClick={() => navigate('/Home')} />
          {screenState === 'success' && (
            <button
              type="button"
              onClick={() => setShowAccountModal(true)}
              className={styles.favoriteTopButton}
              aria-label="Ver itens salvos"
            >
              <Heart size={22} aria-hidden="true" />
            </button>
          )}
        </div>

        {screenState === 'loading' && (
          <div className={styles.loadingState}>
            <h2 className={styles.loadingTitle}>Escolhendo o que combina...</h2>

            <div className={styles.analysisNotice}>
              <Zap size={14} aria-hidden="true" />
              Analisando cores, materiais e estilo do seu ambiente.
            </div>

            <div className={styles.skeletonList}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.skeletonCard} />
              ))}
            </div>
          </div>
        )}

        {screenState === 'success' && (
          <div className={styles.successState}>
            <h2 className={styles.successTitle}>Sua parede cinza combina com</h2>

            <div className={styles.analysisBadge}>
              <Zap size={12} fill="currentColor" aria-hidden="true" />
              Baseado em visão computacional
            </div>

            {/* Ao clicar no card, passa o ID do produto para a página de disponibilidade */}
            <div className={styles.productList}>
              {PRODUTOS_RECOMENDADOS.map((prod) => (
                <ProdutoCard
                  key={prod.id}
                  nome={prod.nome}
                  preco={prod.preco}
                  imagem={prod.imagem}
                  compatibilidade={prod.compatibilidade}
                  favorito={!!favoritos[prod.id]}
                  onToggleFavorito={() => toggleFavorito(prod.id)}
                  onClick={() => navigate('/availability', { state: { produtoId: prod.id } })}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate('/scan')}
              className={styles.scanAgainButton}
            >
              Escanear outro ambiente
            </button>
          </div>
        )}

        {screenState === 'empty' && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Search size={32} aria-hidden="true" />
            </div>

            <h3 className={styles.emptyTitle}>Não encontramos sugestões</h3>

            <p className={styles.emptyDescription}>
              Tente escanear com mais luz ou apontar para outra parede.
            </p>

            <div className={styles.emptyActions}>
              <BotaoCustomizado
                texto="Escanear de novo"
                tamanho="grande"
                variante="verde"
                onClick={() => setScreenState('loading')}
              />
              <BotaoCustomizado
                texto="Escolher da galeria"
                tamanho="grande"
                variante="texto"
                onClick={() => navigate('/scan')}
              />
            </div>
          </div>
        )}

        {showAccountModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalSheet}>
              <h3 className={styles.modalTitle}>Crie uma conta para salvar</h3>
              <p className={styles.modalDescription}>
                Guarde seus projetos e veja tudo em qualquer aparelho.
              </p>

              <div className={styles.modalActions}>
                <BotaoCustomizado
                  texto="Criar conta grátis"
                  tamanho="grande"
                  variante="verde"
                 onClick={() => navigate("/cadastro ")}
                />
                <BotaoCustomizado
                  texto="Agora não"
                  tamanho="grande"
                  variante="branco"
                  onClick={() => setShowAccountModal(false)}
                />
              </div>
            </div>
          </div>
        )}

        <div className={styles.homeIndicator}></div>
      </div>
    </div>
  );
}