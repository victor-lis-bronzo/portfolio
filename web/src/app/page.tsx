"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PortfolioHome() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Mapeia o scroll vertical (0 a 1) para um movimento horizontal em porcentagem (-100%, etc)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]); // Move baseado no nº de telas

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#0f0f1e]">

      <div className="sticky top-0 h-screen flex items-center overflow-hidden">

        <motion.div style={{ x }} className="flex gap-10 px-20">

          {/* =========================================
              TELA 1: HERO (O que aparece ao abrir)
          ========================================= */}
          <div className="w-screen h-[80vh] flex flex-shrink-0 items-center justify-between pe-32">

            {/* Lado Esquerdo - Textos */}
            <div className="flex flex-col gap-6 max-w-2xl">
              <span className="text-[#34df8b] font-mono text-sm tracking-widest uppercase">
                // System Initialized
              </span>
              <h1 className="text-6xl font-bold text-white leading-tight">
                Construindo experiências digitais <br />
                <span className="text-[#34df8b]">inteligentes.</span>
              </h1>
              <p className="text-[#9CA3AF] text-lg">
                Engenheiro de Software focado em performance, arquitetura
                e transições fluidas. (Ative o modo PITCH para ver a versão Business).
              </p>

              <div className="flex gap-4 mt-4">
                <button className="px-8 py-3 bg-[#34df8b] text-[#0f0f1e] font-bold rounded-md hover:bg-[#2bc479] transition-all shadow-[0_0_15px_rgba(52,223,139,0.3)]">
                  Explorar Skills
                </button>
                <button className="px-8 py-3 bg-transparent text-white border border-[#1a1a2e] rounded-md hover:border-[#34df8b] transition-all">
                  GitHub
                </button>
              </div>
            </div>

            {/* Lado Direito - Terminal Interativo */}
            <div className="w-[500px] h-[350px] bg-[#1a1a2e] rounded-xl border border-gray-800 shadow-2xl relative flex flex-col overflow-hidden group hover:border-[#34df8b]/50 transition-colors duration-500">
              {/* Barra do topo do terminal */}
              <div className="h-10 bg-[#0f0f1e] w-full flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-[#34df8b]"></div>
              </div>
              {/* Conteúdo do código */}
              <div className="p-6 font-mono text-sm text-[#34df8b]">
                <p><span className="text-pink-500">const</span> developer = {'{'}</p>
                <p className="ml-4">name: <span className="text-blue-400">"Seu Nome"</span>,</p>
                <p className="ml-4">role: <span className="text-blue-400">"Full Stack Developer"</span>,</p>
                <p className="ml-4">currentMode: <span className="text-yellow-400">"Tech"</span>,</p>
                <p className="ml-4">status: <span className="text-blue-400">"Building awesome things"</span></p>
                <p>{'}'}</p>
                <p className="mt-4 animate-pulse">_</p>
              </div>
            </div>

          </div>

          {/* =========================================
              TELA 2: ABOUT / EXPERTISE (Aparece ao scrollar)
          ========================================= */}
          <div className="w-screen h-[80vh] flex flex-shrink-0 items-center justify-center bg-[#1a1a2e]/30 rounded-3xl border border-[#34df8b]/20">
            <h2 className="text-5xl text-white">Essa tela veio da direita!</h2>
            {/* Aqui entrarão suas skills, arquitetura de projetos, etc */}
          </div>

        </motion.div>
      </div>
    </section>
  );
}