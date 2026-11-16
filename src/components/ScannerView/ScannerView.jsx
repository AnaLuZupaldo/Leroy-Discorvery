import React from "react";
import {  Camera, Sun } from "lucide-react";
import BotaoCustomizado from "../CustomizedButton/CustomizedButton";
import styles from "./ScannerView.module.css";

export default function ScannerView({ onScan, onOpenGallery }) {
  return (
    <>
      {/* Moldura da câmera com imagem de fundo (simulando o cômodo) */}
      <div className={styles.camera}>
        <div className={styles.cameraFundo} />
        <div className={styles.cameraGuia} />
        <p className={styles.cameraTexto}>Aponte para a parede ou o cômodo</p>
      </div>

      {/* Dica de iluminação */}
      <div className={styles.dica}>
        <span className={styles.dicaIcone}>
          <Sun  color="#0D47A1" />
        </span>
        <p className={styles.dicaTexto}>
          Fique a 1 metro da parede e mova o celular devagar.
        </p>
      </div>

      {/* Botões de ação */}
      <div className={styles.acoes}>
        <BotaoCustomizado
          texto="Escanear ambiente"
          tamanho="grande"
          variante="verde"
          onClick={onScan}
          icone={<Camera size={18} />}
          posicaoIcone="esquerda"
        />

        <BotaoCustomizado
          texto="Escolher da galeria"
          tamanho="grande"
          variante="texto"
          onClick={onOpenGallery}
        />
      </div>
    </>
  );
}
