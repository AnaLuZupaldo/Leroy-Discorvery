import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import ProdutoCard from '../../components/ProductCard/ProductCard';
import { produtos } from '../../data/produtos';
import { catalogo } from '../../data/catalogo';
import styles from './CatalogPage.module.css';

export default function CatalogPage() {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]);

  const alternarFavorito = (produtoId) => {
    setFavoritos((atuais) =>
      atuais.includes(produtoId)
        ? atuais.filter((id) => id !== produtoId)
        : [...atuais, produtoId]
    );
  };

  return (
    <main className={styles.page}>
      {/* Moldura do telemóvel */}
      <div className={styles.phone}>
        <header className={styles.header}>
          <BackButton onClick={() => navigate('/Home')} />
          <h1 className={styles.title}>Catálogo de produtos</h1>
        </header>

        <section className={styles.productList} aria-label="Produtos disponíveis">
          {produtos.map((produto) => {
            const ofertas = catalogo.filter((item) => item.produtoId === produto.id);
            const oferta = ofertas[0];
            const estoqueTotal = ofertas.reduce((total, item) => total + item.estoque, 0);

            return (
              <ProdutoCard
                key={produto.id}
                nome={produto.nome ?? produto.name}
                imagem={produto.image || produto.imagem}
                preco={oferta?.preco ?? 'Indisponível'}
                alerta={estoqueTotal === 0 ? 'Sem estoque no momento' : undefined}
                favorito={favoritos.includes(produto.id)}
                onToggleFavorito={() => alternarFavorito(produto.id)}
              />
            );
          })}
        </section>

        <div className={styles.indicador}></div>
      </div>
    </main>
  );
}