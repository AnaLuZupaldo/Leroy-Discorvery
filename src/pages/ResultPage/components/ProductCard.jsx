import React, { useState } from 'react';
import { AlertCircle, Heart, Zap } from 'lucide-react';
import styles from './ProductCardResult.module.css';

const formatarPreco = (valor) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

export default function ProdutoCard({
  nome,
  preco,
  imagem,
  compatibilidade,
  alerta,
  favorito = false,
  onToggleFavorito,
  onClick
}) {
  const [imagemQuebrada, setImagemQuebrada] = useState(false);
  const precoIndisponivel = typeof preco !== 'number';
  const Area = onClick ? 'button' : 'div';
  const areaProps = onClick ? { type: 'button', onClick } : {};

  return (
    <div className={styles.card}>
      <Area className={styles.area} {...areaProps}>
        {imagem && !imagemQuebrada ? (
          <img
            src={imagem}
            alt={nome}
            className={styles.imagem}
            onError={() => setImagemQuebrada(true)}
          />
        ) : (
          <div className={`${styles.imagem} ${styles.imagemVazia}`} aria-hidden="true" />
        )}

        <div className={styles.info}>
          <span className={styles.nome}>{nome}</span>

          <span className={`${styles.preco} ${precoIndisponivel ? styles.precoIndisponivel : ''}`}>
            {precoIndisponivel ? preco : formatarPreco(preco)}
          </span>

          {compatibilidade != null && (
            <span className={styles.badge}>
              <Zap size={12} fill="currentColor" aria-hidden="true" />
              {compatibilidade}% combina
            </span>
          )}

          {alerta && (
            <span className={`${styles.badge} ${styles.badgeAlerta}`}>
              <AlertCircle size={12} aria-hidden="true" />
              {alerta}
            </span>
          )}
        </div>
      </Area>

      <button
        type="button"
        className={`${styles.favorito} ${favorito ? styles.favoritoAtivo : ''}`}
        onClick={onToggleFavorito}
        aria-pressed={favorito}
        aria-label={favorito ? `Remover ${nome} dos salvos` : `Salvar ${nome}`}
      >
        <Heart size={22} fill={favorito ? 'currentColor' : 'none'} aria-hidden="true" />
      </button>
    </div>
  );
}