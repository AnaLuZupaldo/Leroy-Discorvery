import React from "react";
import BotaoCustomizado from "../CustomizedButton/CustomizedButton";
import styles from "./AnalyzingState.module.css";

const TAGS_DETECTADAS = [
  { id: "parede", texto: "✓ Parede cinza", tipo: "ok" },
  { id: "madeira", texto: "✓ Madeira clara", tipo: "ok" },
  { id: "estilo", texto: "⚡ Estilo industrial...", tipo: "alerta" },
];

export default function AnalyzingState({ onCancel, tags = TAGS_DETECTADAS }) {
  return (
    <>
      <div className={styles.painel}>
        <p className={styles.painelTexto}>Analisando cores e estilo...</p>
        <div className={styles.barra}>
          <div className={styles.barraProgresso}></div>
        </div>
      </div>

      <div className={styles.tags}>
        {tags.map(({ id, texto, tipo }) => (
          <span
            key={id}
            className={`${styles.tag} ${tipo === "ok" ? styles.tagOk : styles.tagAlerta}`}
          >
            {texto}
          </span>
        ))}
      </div>

      <div className={styles.botaoCancelar}>
        <BotaoCustomizado
          texto="Cancelar"
          tamanho="grande"
          variante="branco"
          onClick={onCancel}
        />
      </div>
    </>
  );
}
