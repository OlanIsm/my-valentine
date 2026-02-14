"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const memories = [
  {
    id: 1,
    date: "Tahun 2023",
    title: "Cinta pertama kita",
    description:
      "Seng, inget ga sih pas pertama kali kita kenal? Waktu itu aku bener-bener ga nyangka kalau cewek yang aktif ini bakal jadi tempat paling nyaman buat aku. Makasih ya seng, di tahun ini kamu udah mau buka hati buat aku",
    image: "/photos/2023.jpg",
  },
  {
    id: 2,
    date: "Tahun 2024",
    title: "Makin Jatuh Cinta",
    description:
      "Di tahun ini, aku makin sadar kalau aku ga bisa jauh-jauh dari kamu. Hari-hari yang awalnya biasa aja, tiba-tiba jadi spesial banget cuma karena ada kamu di dalemnya. Kamu tuh bener-bener the best part of my 2024, seng.",
    image: "/photos/2024.jpg",
  },
  {
    id: 3,
    date: "Tahun 2025",
    title: "Belajar & Bertahan",
    description:
      "Banyak berantem, banyak miskom, banyak ngambeknya juga ya kita wkwk. Tapi aku bersyukur banget kita berdua ga ada yang nyerah. Tiap kali kita ribut, itu malah bikin aku makin sadar kalau kamu tuh orang yang pantes buat aku perjuangin mati-matian.",
    image: "/photos/2025.jpg",
  },
  {
    id: 4,
    date: "Tahun 2026",
    title: "Nyaman & Seterusnya",
    description:
      "Sekarang rasanya jauh lebih tenang, karena kita udah makin ngerti satu sama lain. Makasih ya seng udah sabar dan selalu nemenin aku ngelewatin semuanya. Happy Valentine's Day! Ayo kita terus sama-sama, aku sayang banget sama kamu. Love you always! ❤️",
    image: "/photos/2026.jpg",
  },
];

// Komponen buat Animasi Ngetik Surat
const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      // Pake substring biar kebal dari bug Strict Mode React
      if (i <= text.length) {
        setDisplayedText(text.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Kecepatan ngetik (ms)

    return () => clearInterval(typingInterval);
  }, [text]);

  return <>{displayedText}</>;
};

export default function JourneyTimeline() {
  const [isRevealed, setIsRevealed] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);

  const handleReveal = () => {
    setIsRevealed(true);

    // Tembakin Confetti warna warni pink/merah
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff1493", "#ff69b4", "#ffb6c1", "#dc143c"], // Tema Valentine
    });

    setTimeout(() => {
      if (photoRef.current) {
        photoRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 150);
  };

  // Surat cinta lu buat dia (Bisa lu ubah sesuka hati)
  const secretLetter =
    "Seng, makasih ya udah nemenin aku dari 2023 sampe sekarang. Maaf ya tadi sempat salah ngitung tahun jadian kita wkwk. Makasih udah sabar, udah ngertiin, dan selalu ada buat aku. You are my favorite adventure, and I can't wait to make more memories with you. Happy Valentine's Day, seng! ✨";

  return (
    <main className="bg-pink-50 font-sans min-h-screen pb-24 overflow-x-hidden">
      {/* === BAGIAN TIMELINE === */}
      <div className="pt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-rose-600 mb-4 tracking-tight">
              Our Journey 💖
            </h1>
            <p className="text-lg text-rose-400 font-medium">
              2023 - 2026 & Masih Berlanjut
            </p>
          </div>

          <div className="relative border-l-4 border-rose-300 ml-3 md:ml-6 space-y-12">
            {memories.map((memory) => (
              <div key={memory.id} className="relative pl-8 md:pl-10">
                <div className="absolute -left-3.5 top-1 h-6 w-6 rounded-full bg-rose-500 border-4 border-pink-50 shadow"></div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
                  <span className="text-sm font-bold text-rose-500 tracking-wider uppercase mb-2 block">
                    {memory.date}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {memory.title}
                  </h3>
                  <div className="w-full h-64 md:h-80 bg-rose-100 rounded-xl mb-4 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className={`object-cover w-full h-full ${memory.id === 4 ? "object-top" : "object-center"}`}
                    />
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {memory.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* === BAGIAN KEJUTAN DI AKHIR === */}
      <div className="flex flex-col items-center justify-center px-4 mt-10">
        <motion.button
          onClick={handleReveal}
          whileHover={{ scale: 1.1 }}
          animate={!isRevealed ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ repeat: !isRevealed ? Infinity : 0, duration: 1.5 }}
          className="text-7xl focus:outline-none drop-shadow-md z-10"
        >
          ❤️
        </motion.button>

        {!isRevealed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-rose-400 font-medium mt-4 animate-pulse"
          >
            Coba klik lovenya seng...
          </motion.p>
        )}

        <AnimatePresence>
          {isRevealed && (
            <motion.div
              ref={photoRef}
              initial={{ opacity: 0, height: 0, y: -30 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center mt-12 w-full max-w-2xl mx-auto"
            >
              {/* Foto Best Pop Up */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border-8 border-white shadow-2xl mb-8 rotate-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photos/best.jpg"
                  alt="Best of Us"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Surat Cinta Ketik Otomatis */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }} // Teks mulai diketik setelah foto selesai turun
                className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-sm border border-rose-100 text-center mt-4 w-full"
              >
                <p className="text-rose-600 text-lg md:text-xl font-medium leading-relaxed italic">
                  <TypewriterText text={secretLetter} />
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
