import styles from './CustomizedButton.module.css';

function BotaoCustomizado({
  texto,
  tamanho = 'pequeno',
  variante = 'verde',
  onClick,
  icone,
  posicaoIcone = 'esquerda'
}) {
  const classesBotao = `
    ${styles.botao} 
    ${styles[tamanho] || styles.pequeno} 
    ${styles[variante] || styles.verde}
  `;

  const iconeElemento = icone && (
    <span className={styles.icone} aria-hidden="true">
      {icone}
    </span>
  );

  return (
    <button className={classesBotao} onClick={onClick}>
      {icone ? (
        <span className={styles.conteudo}>
          {posicaoIcone === 'esquerda' && iconeElemento}
          {texto}
          {posicaoIcone === 'direita' && iconeElemento}
        </span>
      ) : (
        texto
      )}
    </button>
  );
}

export default BotaoCustomizado;
