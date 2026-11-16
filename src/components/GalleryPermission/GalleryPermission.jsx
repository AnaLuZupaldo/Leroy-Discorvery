import React from 'react';
import BotaoCustomizado from '../CustomizedButton/CustomizedButton';
import styles from './GalleryPermission.module.css';
import { BookImage, Settings } from 'lucide-react';

export default function GalleryPermission({ onBack }) {
  return (
    <>
      <div className={styles.card}>
        <span className={styles.icone}><BookImage size={40} /></span>
        <h3 className={styles.titulo}>Acesso à Galeria Necessário</h3>
        <p className={styles.texto}>
          Por favor, dê acesso à sua galeria para o nosso aplicativo.
        </p>
        <div className={styles.caminho}>
         <Settings size={12} /> 
         <p>Vá em Configurações &gt; Permissões &gt; Fotos</p>
        </div>
      </div>
      <div className={styles.modalActions}>
      <BotaoCustomizado
        texto="Voltar ao Scanner"
        tamanho="grande"
        variante="verde"
        onClick={onBack}
      />
      </div>
    </>
  );
}
