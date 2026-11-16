import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import BotaoCustomizado from "../../components/CustomizedButton/CustomizedButton";
import styles from "./CheckoutPage.module.css";

const ETAPAS = [
  { id: "h1_caixa", label: "H1" },
  { id: "h2_pagamento", label: "H2" },
  { id: "h3_cupom_caixa", label: "H3" },
  { id: "h4_concluido", label: "H4" },
];

const METODOS_PAGAMENTO = [
  { id: "pix", icone: "⚡", nome: "Pix", descricao: "Aprovação na hora" },
  {
    id: "cartao",
    icone: "",
    nome: "Cartão de crédito",
    descricao: "Em até 10x sem juros",
  },
];

const formatarValor = (valor) => valor.toFixed(2).replace(".", ",");

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Recebe os itens selecionados do state da navegação (ou usa um item padrão se não houver)
  const itensCarrinho = location.state?.itensSelecionados || [
    { nome: "Prateleira industrial preta", preco: 349.0 },
  ];

  // Estados possíveis: 'h1_caixa', 'h2_pagamento', 'h3_cupom_caixa', 'h4_concluido'
  const [etapaCheckout, setEtapaCheckout] = useState("h1_caixa");
  const [tipoPagamento, setTipoPagamento] = useState("pix");
  const [contadorCupom, setContadorCupom] = useState(5);

  // Calcula subtotal dinamicamente com base no que foi escolhido
  const subtotal = itensCarrinho.reduce((acc, item) => acc + item.preco, 0);
  const descontoPrimeiraCompra = subtotal * 0.1; // 10% de desconto
  const totalFinal = subtotal - descontoPrimeiraCompra;

  // Efeito para o temporizador de 5 segundos na tela de cupom para o caixa
  useEffect(() => {
    let timer;
    if (etapaCheckout === "h3_cupom_caixa" && contadorCupom > 0) {
      timer = setInterval(() => {
        setContadorCupom((prev) => prev - 1);
      }, 1000);
    } else if (contadorCupom === 0 && etapaCheckout === "h3_cupom_caixa") {
      setEtapaCheckout("h4_concluido");
    }
    return () => clearInterval(timer);
  }, [etapaCheckout, contadorCupom]);

  const handleAvancarPagamento = () => {
    setContadorCupom(5);
    setEtapaCheckout("h3_cupom_caixa");
  };

  return (
    <div className={styles.page}>
      <div className={styles.phone}>
        <div className={styles.topo}>
          <BackButton onClick={() => navigate("/store-map")} />

          <div className={styles.seletor} role="tablist">
            {ETAPAS.map(({ id, label }) => (
              <button
                key={id}
                role="tab"
                aria-selected={etapaCheckout === id}
                className={`${styles.seletorBotao} ${etapaCheckout === id ? styles.seletorBotaoAtivo : ""}`}
                onClick={() => setEtapaCheckout(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* H1: NO CAIXA (Carrinho Dinâmico) */}
        {etapaCheckout === "h1_caixa" && (
          <div className={styles.caixa}>
            <h2 className={styles.titulo}>No caixa</h2>

            <div className={styles.itensCard}>
              {itensCarrinho.map((item, index) => (
                <div key={index} className={styles.itemLinha}>
                  <span>{item.nome}</span>
                  <b>R$ {formatarValor(item.preco)}</b>
                </div>
              ))}
            </div>

            <div className={styles.subtitulo}>Seus benefícios</div>

            <div className={styles.beneficios}>
              <div className={styles.beneficioCard}>
                <div className={styles.beneficioTexto}>
                  <div className={styles.beneficioTitulo}>
                    10% off na primeira compra
                  </div>
                  <div className={styles.beneficioDescricao}>
                    Aplicado em todos os itens
                  </div>
                </div>
                <span className={styles.beneficioValor}>
                  -R$ {formatarValor(descontoPrimeiraCompra)}
                </span>
              </div>
            </div>

            <div className={styles.resumo}>
              <div className={`${styles.resumoLinha} ${styles.resumoSubtotal}`}>
                <span>Subtotal</span>
                <span>R$ {formatarValor(subtotal)}</span>
              </div>
              <div className={`${styles.resumoLinha} ${styles.resumoDesconto}`}>
                <span>Descontos</span>
                <span>-R$ {formatarValor(descontoPrimeiraCompra)}</span>
              </div>
              <div className={`${styles.resumoLinha} ${styles.resumoTotal}`}>
                <span>Total</span>
                <span>R$ {formatarValor(totalFinal)}</span>
              </div>
            </div>
          </div>
        )}

        {/* H2: PAGAMENTO */}
        {etapaCheckout === "h2_pagamento" && (
          <div className={styles.pagamento}>
            <h2 className={styles.titulo}>Como quer pagar?</h2>

            <div className={styles.opcoes}>
              {METODOS_PAGAMENTO.map(({ id, icone, nome, descricao }) => (
                <div
                  key={id}
                  className={`${styles.opcao} ${tipoPagamento === id ? styles.opcaoAtiva : ""}`}
                  onClick={() => setTipoPagamento(id)}
                >
                  <div className={styles.opcaoInfo}>
                    <span>{icone}</span>
                    <div>
                      <div>{nome}</div>
                      <div className={styles.opcaoDescricao}>{descricao}</div>
                    </div>
                  </div>
                  <input type="radio" checked={tipoPagamento === id} readOnly />
                </div>
              ))}
            </div>

            <div className={styles.totalCard}>
              <div>
                <div className={styles.totalRotulo}>Total a pagar</div>
                <div className={styles.totalValor}>
                  R$ {formatarValor(totalFinal)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* H3: TELA DE CUPOM PARA APRESENTAR AO CAIXA (Fica 5s) */}
        {etapaCheckout === "h3_cupom_caixa" && (
          <div className={styles.cupom}>
            <div className={styles.cupomCard}>
              <div className={styles.cupomTitulo}>
                🎟️ Apresente ao Atendente do Caixa
              </div>
              <div className={styles.cupomCodigo}>LERY-8842</div>
              <div className={styles.cupomDescricao}>
                Código válido para validação dos descontos no app.
              </div>
            </div>

            <div className={styles.cupomTimer}>
              Validando pagamento em <b>{contadorCupom}s</b>...
            </div>
          </div>
        )}

        {/* H4: COMPRA CONCLUÍDA COM 100 PONTOS */}
        {etapaCheckout === "h4_concluido" && (
          <div className={styles.concluido}>
            <div className={styles.concluidoIcone}>✓</div>

            <h3 className={styles.concluidoTitulo}>Compra confirmada!</h3>

            <p className={styles.concluidoTexto}>
              Obrigado por comprar com o Leroy Discovery.
            </p>

            <div className={styles.pontosCard}>
              <div className={styles.pontosTitulo}>🌟 Clube Leroy</div>
              <div className={styles.pontosValor}>+100 pontos adicionados!</div>
            </div>
          </div>
        )}

        {/* BOTÕES DE AÇÃO NA BASE */}
        <div className={styles.acoes}>
          {etapaCheckout === "h1_caixa" && (
            <BotaoCustomizado
              texto="Escolher pagamento"
              tamanho="grande"
              variante="verde"
              onClick={() => setEtapaCheckout("h2_pagamento")}
            />
          )}

          {etapaCheckout === "h2_pagamento" && (
            <BotaoCustomizado
              texto="Gerar Cupom para o Caixa"
              tamanho="grande"
              variante="verde"
              onClick={handleAvancarPagamento}
            />
          )}

          {etapaCheckout === "h3_cupom_caixa" && (
            <BotaoCustomizado
              texto="Pular espera"
              tamanho="grande"
              variante="branco"
              onClick={() => setEtapaCheckout("h4_concluido")}
            />
          )}

          {etapaCheckout === "h4_concluido" && (
            <BotaoCustomizado
              texto="Voltar ao início"
              tamanho="grande"
              variante="verde"
              onClick={() => navigate("/Home")}
            />
          )}
        </div>

        <div className={styles.indicador}></div>
      </div>
    </div>
  );
}
