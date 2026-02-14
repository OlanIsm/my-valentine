"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const memories = [
  {
    id: 1,
    date: "Tahun 2024",
    title: "Awal Cerita Kita",
    description:
      "Masih inget banget momen-momen awal kita. Masih malu-malu tapi bahagia banget rasanya bisa bareng kamu.",
    image: "/photos/2024.jpg",
  },
  {
    id: 2,
    date: "Tahun 2025",
    title: "Makin Deket & Bucin",
    description:
      "Tahun di mana kita makin kenal satu sama lain. Ngelewatin banyak hal bareng, dari yang seneng sampe yang bikin pusing.",
    image: "/photos/2025.jpg",
  },
  {
    id: 3,
    date: "Februari 2026",
    title: "Sekarang dan Seterusnya",
    description:
      "Happy Valentine's Day, seng! Tiga tahun ini rasanya cepet banget. Makasih udah selalu ada. Love you always! ❤️",
    image: "/photos/2026.jpg",
  },
];

export default function JourneyTimeline() {
  const [isRevealed, setIsRevealed] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);

  const handleReveal = () => {
    setIsRevealed(true);
    // Kita kasih jeda dikit biar animasinya jalan dulu, baru layarnya nge-scroll nengahin foto
    setTimeout(() => {
      if (photoRef.current) {
        photoRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 150);
  };

  return (
    <main className="bg-pink-50 font-sans min-h-screen pb-24 overflow-x-hidden">
      {/* === BAGIAN TIMELINE === */}
      <div className="pt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-20">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-rose-600 mb-4 tracking-tight">
              Our Journey 💖
            </h1>
            <p className="text-lg text-rose-400 font-medium">
              2024 - 2026 & Masih Berlanjut
            </p>
          </div>

          {/* Timeline Section */}
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
                      className="object-cover w-full h-full"
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

      {/* === BAGIAN KEJUTAN DI AKHIR (THE GRAND FINALE) === */}
      <div className="flex flex-col items-center justify-center px-4 mt-10">
        {/* Tombol Love yang detak-detak */}
        <motion.button
          onClick={handleReveal}
          whileHover={{ scale: 1.1 }}
          animate={!isRevealed ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ repeat: !isRevealed ? Infinity : 0, duration: 1.5 }}
          className="text-7xl focus:outline-none drop-shadow-md z-10"
        >
          ❤️
        </motion.button>

        {/* Teks petunjuk yang ilang pas di-klik */}
        {!isRevealed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-rose-400 font-medium mt-4 animate-pulse"
          >
            Coba klik lovenya seng...
          </motion.p>
        )}

        {/* Foto The Best yang Pop-Up ke Bawah */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              ref={photoRef} // Ref ditaruh di sini biar scrollnya pas ke elemen ini
              initial={{ opacity: 0, height: 0, y: -30 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center mt-12 w-full"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border-8 border-white shadow-2xl mb-8 rotate-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photos/best.jpg" // Pastikan ada file best.jpg di folder public/photos
                  alt="Best of Us"
                  className="object-cover w-full h-full"
                />
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-5xl font-extrabold text-rose-600 mb-3 text-center"
              >
                You are my favorite adventure.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-rose-500 text-lg font-medium text-center mb-12"
              >
                Happy Valentine's Day! ✨
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
