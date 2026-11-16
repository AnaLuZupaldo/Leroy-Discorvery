import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomizedButton from '../../components/CustomizedButton/CustomizedButton';
import logoImg from "../../assets/logo.png";
import styles from "./HomePage.module.css";
import { Camera, Clock, LockKeyhole } from "lucide-react";

const iconeProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const IconeEscanear = () => (
  <svg {...iconeProps}>
    <path d="M4 8V6a2 2 0 0 1 2-2h2" />
    <path d="M16 4h2a2 2 0 0 1 2 2v2" />
    <path d="M20 16v2a2 2 0 0 1-2 2h-2" />
    <path d="M8 20H6a2 2 0 0 1-2-2v-2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconeCatalogo = () => (
  <svg {...iconeProps}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
  </svg>
);

const IconeResultados = () => (
  <svg {...iconeProps}>
    <path d="M4 20V10" />
    <path d="M10 20V4" />
    <path d="M16 20v-7" />
    <path d="M22 20H2" />
  </svg>
);

const ATALHOS = [
  {
    id: "scan",
    label: "Escanear",
    rota: "/scan",
    Icone: IconeEscanear,
    ativo: true,
  },
  { id: "catalog", label: "Catálogo", rota: "/catalog", Icone: IconeCatalogo },
  {
    id: "results",
    label: "Resultados",
    rota: "/results",
    Icone: IconeResultados,
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [temReserva, setTemReserva] = useState(
    location.state?.reservaRealizada || true,
  );
  const [tempoRestante, setTempoRestante] = useState(7190);

  useEffect(() => {
    if (location.state?.reservaRealizada) {
      setTemReserva(true);
    }
  }, [location.state]);

  useEffect(() => {
    if (!temReserva) return;

    const timer = setInterval(() => {
      setTempoRestante((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [temReserva]);

  const formatarTempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segs).padStart(2, "0")}`;
  };

  return (
    <div className={styles.page}>
      <div className={styles.phone}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <img
              src={logoImg}
              alt="Leroy Discovery"
              className={styles.logoImage}
            />
          </div>
          <h1 className={styles.title}>Olá, seja bem-vindo(a)!</h1>
        </div>

        {/* CARD DE RESERVA ATIVA */}
        {temReserva ? (
          <div className={styles.reservaCard}>
            <div className={styles.reservaTopo}>
              <span className={styles.reservaBadge}>
                <LockKeyhole size={12} /> Reserva Realizada
              </span>
              <span className={styles.reservaTimer}>
                <Clock size={13} /> {formatarTempo(tempoRestante)}
              </span>
            </div>

            <div className={styles.reservaTitulo}>
              Vá até a loja de Pinheiros
            </div>

            <div className={styles.reservaTexto}>
              Produto separado com sucesso. Chegando na loja, clique no botão
              abaixo para iniciar a sua rota interna.
            </div>

            <button
              className={styles.reservaBotao}
              onClick={() => navigate("/store-map")}
            >
              Cheguei na Loja
            </button>
          </div>
        ) : (
          <div className={styles.scanCard}>
            <div className={styles.scanIcone}>
              <Camera />
            </div>
            <div className={styles.scanTitulo}>Escanear Ambiente</div>
            <div className={styles.scanTexto}>
              Aponte a câmera para a parede e descubra os melhores itens
              combinando com a sua decoração.
            </div>
            <button
              className={styles.scanBotao}
              onClick={() => navigate("/scan")}
            >
              Começar Escaneamento
            </button>
          </div>
        )}

        <div className={styles.atalhos}>
          <nav className={styles.atalhosNav} aria-label="Atalhos rápidos">
            {ATALHOS.map(({ id, label, rota, Icone, ativo }) => (
              <button
                key={id}
                type="button"
                className={`${styles.atalhoItem} ${ativo ? styles.atalhoItemAtivo : ""}`}
                aria-current={ativo ? "page" : undefined}
                onClick={() => navigate(rota)}
              >
                <span className={styles.atalhoIcone}>
                  <Icone />
                </span>
                {label}
              </button>
            ))}
          </nav>
          <CustomizedButton
            texto="Ir para permissões"
            className={styles.continueButton}
            tamanho="grande"
            variante="texto" /* Ou "link", dependendo do nome no teu CustomizedButton */
            onClick={() => navigate("/permission")}
          />
        </div>

        <div className={styles.indicador}></div>
      </div>
    </div>
  );
}
