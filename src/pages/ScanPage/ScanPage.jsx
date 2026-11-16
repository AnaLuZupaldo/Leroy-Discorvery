import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import logoImg from '../../assets/logo.png';
import ScannerView from '../../components/ScannerView/ScannerView';
import GalleryPermission from '../../components/GalleryPermission/GalleryPermission';
import AnalyzingState from '../../components/AnalyzingState/AnalyzingState';
import styles from './ScanPage.module.css';

export default function ScanPage() {
  const [currentScreen, setCurrentScreen] = useState('scanner');
  const navigate = useNavigate();

  // Após 3 segundos de análise, redireciona para a tela de resultados.
  // O cleanup cancela o redirecionamento se o usuário clicar em "Cancelar".
  useEffect(() => {
    if (currentScreen !== 'analyzing') return;

    const timer = setTimeout(() => navigate('/results'), 3000);
    return () => clearTimeout(timer);
  }, [currentScreen, navigate]);

  const voltarAoScanner = () => setCurrentScreen('scanner');

  return (
    <div className={styles.page}>
      {/* Moldura / Container em formato de telemóvel */}
      <div className={styles.phone}>

        <div className={styles.topo}>
          <BackButton onClick={() => navigate('/Home')} />
        </div>

        <div className={styles.conteudo}>
          <div className={styles.logoWrapper}>
            <img src={logoImg} alt="Leroy Discovery" className={styles.logo} />
          </div>

          {currentScreen === 'scanner' && (
            <ScannerView
              onScan={() => setCurrentScreen('analyzing')}
              onOpenGallery={() => setCurrentScreen('gallery_permission')}
            />
          )}

          {currentScreen === 'gallery_permission' && (
            <GalleryPermission onBack={voltarAoScanner} />
          )}

          {currentScreen === 'analyzing' && (
            <AnalyzingState onCancel={voltarAoScanner} />
          )}
        </div>

        {/* Indicador de barra inferior do telemóvel */}
        <div className={styles.indicador}></div>
      </div>
    </div>
  );
}
