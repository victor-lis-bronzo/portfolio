"use client";
import { motion } from "framer-motion";
import skyImg from '../assets/sky.svg';
import grassImg from '../assets/grass.svg';
import dirtImg from '../assets/dirt.svg';

export default function PortfolioVictor() {
  return (
    <div className="bg-[#0f0f1e] text-white font-sans overflow-x-hidden">

      {/* ================================================== */}
      {/* SESSÃO 1: HERO SECTION                             */}
      {/* ================================================== */}
      <section
        className="min-h-screen relative flex flex-col justify-end overflow-hidden"
        style={{
          backgroundImage: `url(${skyImg.src})`,
          backgroundSize: '256px 256px',
          backgroundRepeat: 'repeat',
          imageRendering: 'pixelated'
        }}
      >
        {/* Content Container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-auto z-10">
            {/* Lado Esquerdo - Copy Impactante */}
            <div className="flex flex-col gap-6 text-white drop-shadow-md">
              <span className="text-[#34df8b] font-mono tracking-widest text-sm border border-[#34df8b]/50 bg-black/40 backdrop-blur-sm py-1 px-3 w-fit rounded-full shadow-lg">
                Status: Open for Work
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight" style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                Construindo software <br />
                <span className="text-[#34df8b]">
                  de alto impacto.
                </span>
              </h1>
              <p className="text-gray-200 text-lg lg:text-xl max-w-lg font-medium" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
                Engenharia de ponta a ponta. Focado em performance, design de
                sistemas e código sustentável que resolve problemas reais.
              </p>
            </div>

            {/* Lado Direito - O Asset da API */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-end"
            >
              <div className="relative group">
                {/* Sombra escura imitando Minecraft atrás do card */}
                <div className="absolute -inset-2 bg-black/40 blur-xl rounded-xl"></div>
                <img
                  src="https://gitassets.victorlisbronzo.me/api/card/cmjhew7bb00032ajvo8q4vzpw?v=uvsl04"
                  alt="Victor Lis - GitHub Profile Asset"
                  className="relative w-full max-w-md shadow-2xl rounded-lg border-4 border-black/80"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Chãozinho de Grama do Minecraft */}
        <div className="relative w-full h-32 flex flex-col pointer-events-none">
          {/* Topo da Grama */}
          <div
            className="w-full h-16"
            style={{
              backgroundImage: `url(${grassImg.src})`,
              backgroundSize: '64px 64px',
              backgroundRepeat: 'repeat-x',
              imageRendering: 'pixelated'
            }}
          ></div>
          {/* Terra embaixo da Grama */}
          <div
            className="w-full h-16"
            style={{
              backgroundImage: `url(${dirtImg.src})`,
              backgroundSize: '64px 64px',
              backgroundRepeat: 'repeat',
              imageRendering: 'pixelated'
            }}
          ></div>
        </div>
      </section>
    </div>
  );
}