import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import BotaoCustomizado from "../../components/CustomizedButton/CustomizedButton";
import styles from "./StoreMapPage.module.css";
import { Lightbulb, MoveRight, ShoppingCart } from "lucide-react";

const ETAPAS = [
  { id: "g1_rota", label: "Item 1" },
  { id: "g3_proximo", label: "Item 2" },
  { id: "g5_concluido", label: "Final" },
];

const CORREDORES = [3, 4, 5, 6, 7, 8];

const ITENS_RESERVADOS = [
  { nome: "Prateleira industrial preta", preco: 349.0 },
  { nome: "Luminária pendente de metal", preco: 189.0 },
];

export default function StoreMapPage() {
  const navigate = useNavigate();

  const [etapaFluxo, setEtapaFluxo] = useState("g1_rota");
  const [mostrarPopupCrossSell, setMostrarPopupCrossSell] = useState(false);

  const avancarParaProximoPasso = () => {
    setMostrarPopupCrossSell(true);
  };

  const fecharPopupEContinuar = () => {
    setMostrarPopupCrossSell(false);
    setEtapaFluxo("g3_proximo");
  };

  const mostrandoMapa = etapaFluxo === "g1_rota" || etapaFluxo === "g3_proximo";

  return (
    <div className={styles.page}>
      {/* Moldura do Telemóvel */}
      <div className={styles.phone}>
        {/* Topo: Voltar e seletor rápido */}
        <BackButton onClick={() => navigate("/Home")} />
        <div className={styles.topo}>
          <div className={styles.seletor} role="tablist">
            {ETAPAS.map(({ id, label }) => (
              <button
                key={id}
                role="tab"
                aria-selected={etapaFluxo === id}
                className={`${styles.seletorBotao} ${etapaFluxo === id ? styles.seletorBotaoAtivo : ""}`}
                onClick={() => setEtapaFluxo(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL DO MAPA */}
        {mostrandoMapa && (
          <div className={styles.conteudo}>
            <h2 className={styles.titulo}>Navegação Interna</h2>

            {/* Card de Instrução Principal */}
            <div className={styles.direcaoCard}>
              <div className={styles.direcaoRotulo}>Direção Atual</div>
              <div className={styles.direcaoTexto}>
                <MoveRight size={16} />
                {etapaFluxo === "g1_rota"
                  ? " Vá para o Corredor 5 (Prateleira)"
                  : " Vá para o Corredor 7 (Luminária)"}
              </div>
            </div>

            {/* MAPA ESQUEMÁTICO */}
            <div className={styles.mapa}>
              {/* Rótulo Superior (Fundo da Loja) */}
              <div className={styles.mapaFundo}>
                FUNDO DA LOJA (Área de Estoque)
              </div>

              {/* Corredores da Loja em Paralelo */}
              <div className={styles.corredores}>
                {CORREDORES.map((num) => {
                  const isAlvo =
                    (num === 5 && etapaFluxo === "g1_rota") ||
                    (num === 7 && etapaFluxo === "g3_proximo");

                  return (
                    <div key={num} className={styles.corredor}>
                      <span
                        className={`${styles.corredorRotulo} ${isAlvo ? styles.corredorRotuloAlvo : ""}`}
                      >
                        {isAlvo ? "📍 DESTINO" : `C-${num}`}
                      </span>

                      {/* Bloco do Corredor */}
                      <div
                        className={`${styles.corredorBloco} ${isAlvo ? styles.corredorBlocoAlvo : ""}`}
                      >
                        <span
                          className={`${styles.corredorNumero} ${isAlvo ? styles.corredorNumeroAlvo : ""}`}
                        >
                          {num}
                        </span>

                        {/* Indicador do item exato dentro do corredor */}
                        {isAlvo && <div className={styles.corredorPino}></div>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Rótulo Inferior (Entrada / Você está aqui) */}
              <div className={styles.mapaRodape}>
                <span className={styles.mapaVoce}>
                  <span className={styles.mapaVoceBolinha}></span>
                  Você (Entrada)
                </span>
                <span className={styles.mapaSiga}>Siga a linha vermelha ➔</span>
              </div>
            </div>

            {/* Resumo do Item Atual */}
            <div className={styles.itemAtual}>
              <div className={styles.itemAtualIcone}>
                <ShoppingCart size={16} />
              </div>
              <div>
                <div className={styles.itemAtualRotulo}>Item a recolher:</div>
                <div className={styles.itemAtualNome}>
                  {etapaFluxo === "g1_rota"
                    ? "Prateleira industrial preta"
                    : "Luminária pendente de metal"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TELA G5: ROTA CONCLUÍDA */}
        {etapaFluxo === "g5_concluido" && (
          <div className={styles.concluido}>
            <div className={styles.concluidoIcone}>✓</div>

            <h3 className={styles.concluidoTitulo}>Rota Concluída!</h3>

            <p className={styles.concluidoTexto}>
              Todos os itens foram recolhidos com sucesso. Vamos prosseguir para
              o pagamento.
            </p>
          </div>
        )}

        {/* POP-UP DE CROSS-SELL AO LONGO DO CAMINHO */}
        {mostrarPopupCrossSell && (
          <div className={styles.overlay}>
            <div className={styles.popup}>
              <div className={styles.popupIcone}>
                <Lightbulb />
              </div>
              <div className={styles.popupTitulo}>Combina com sua escolha!</div>
              <p className={styles.popupTexto}>
                Notamos que você pegou a prateleira. Que tal adicionar{" "}
                <b>Fitas de LED autoadesivas</b> para iluminar seus nichos?
              </p>
              <div className={styles.popupAcoes}>
                <BotaoCustomizado
                  texto="Adicionar (R$ 49,90)"
                  tamanho="pequeno"
                  variante="verde"
                  onClick={fecharPopupEContinuar}
                />
                <BotaoCustomizado
                  texto="Ignorar"
                  tamanho="pequeno"
                  variante="branco"
                  onClick={fecharPopupEContinuar}
                />
              </div>
            </div>
          </div>
        )}

        {/* BOTÕES DE AÇÃO NA BASE */}
        <div className={styles.acoes}>
          {etapaFluxo === "g1_rota" && (
            <BotaoCustomizado
              texto="Peguei o Item 1"
              tamanho="grande"
              variante="verde"
              onClick={avancarParaProximoPasso}
            />
          )}

          {etapaFluxo === "g3_proximo" && (
            <BotaoCustomizado
              texto="Peguei o Item 2"
              tamanho="grande"
              variante="verde"
              onClick={() => setEtapaFluxo("g5_concluido")}
            />
          )}

          {etapaFluxo === "g5_concluido" && (
            <BotaoCustomizado
              texto="Ir para o Caixa / Pagamento"
              tamanho="grande"
              variante="verde"
              onClick={() =>
                navigate("/checkout", {
                  state: { itensSelecionados: ITENS_RESERVADOS },
                })
              }
            />
          )}
        </div>

        <div className={styles.indicador}></div>
      </div>
    </div>
  );
}
