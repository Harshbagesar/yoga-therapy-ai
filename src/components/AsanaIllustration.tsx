"use client";

import React from "react";

interface AsanaIllustrationProps {
  id: string;
  className?: string;
}

export const AsanaIllustration: React.FC<AsanaIllustrationProps> = ({ id, className = "h-48 w-full" }) => {
  // Common gradient definitions to reuse
  const gradients = (
    <defs>
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" /> {/* emerald-500 */}
        <stop offset="100%" stopColor="#06b6d4" /> {/* cyan-500 */}
      </linearGradient>
      <linearGradient id="auraGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#34d399" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  );

  const getSvgContent = () => {
    switch (id) {
      case "tadasana":
        return (
          <>
            {/* Mountain background */}
            <path d="M20 180 L80 80 L140 180 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <path d="M80 180 L140 60 L200 180 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            {/* Glowing Aura */}
            <ellipse cx="100" cy="100" rx="30" ry="70" fill="url(#auraGrad)" filter="url(#glow)" />
            {/* Body Stick Figure - Tadasana (Mountain Pose) */}
            {/* Ground */}
            <line x1="40" y1="180" x2="160" y2="180" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
            {/* Legs */}
            <line x1="100" y1="180" x2="100" y2="130" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" />
            {/* Torso */}
            <line x1="100" y1="130" x2="100" y2="75" stroke="url(#bodyGrad)" strokeWidth="7" strokeLinecap="round" />
            {/* Arms */}
            <line x1="100" y1="85" x2="90" y2="135" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="100" y1="85" x2="110" y2="135" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" />
            {/* Head */}
            <circle cx="100" cy="55" r="12" fill="url(#bodyGrad)" filter="url(#glow)" />
            {/* Crown Chakra Glow */}
            <circle cx="100" cy="55" r="3" fill="#f59e0b" />
          </>
        );

      case "vrikshasana":
        return (
          <>
            {/* Sun in background */}
            <circle cx="100" cy="70" r="45" fill="url(#sunGrad)" />
            <ellipse cx="100" cy="110" rx="40" ry="60" fill="url(#auraGrad)" />
            {/* Ground */}
            <line x1="40" y1="180" x2="160" y2="180" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
            {/* Standing Leg */}
            <line x1="100" y1="180" x2="100" y2="130" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" />
            {/* Folded Leg */}
            <path d="M100 130 L85 150 L100 155" fill="none" stroke="url(#bodyGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Spine/Torso */}
            <line x1="100" y1="130" x2="100" y2="80" stroke="url(#bodyGrad)" strokeWidth="7" strokeLinecap="round" />
            {/* Hands joined overhead */}
            <path d="M100 90 L85 70 L97 40" fill="none" stroke="url(#bodyGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M100 90 L115 70 L103 40" fill="none" stroke="url(#bodyGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Head */}
            <circle cx="100" cy="58" r="11" fill="url(#bodyGrad)" />
            <circle cx="100" cy="38" r="3" fill="#f59e0b" filter="url(#glow)" />
          </>
        );

      case "bhujangasana":
        return (
          <>
            <path d="M30 170 Q 110 165 140 120 T 170 50" fill="none" stroke="url(#auraGrad)" strokeWidth="30" strokeLinecap="round" filter="url(#glow)" />
            {/* Ground */}
            <line x1="30" y1="175" x2="180" y2="175" stroke="#475569" strokeWidth="3" />
            {/* Legs on ground */}
            <path d="M40 170 C 80 170, 100 170, 115 160" fill="none" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" />
            {/* Arching Torso / Cobra rise */}
            <path d="M115 160 Q 140 150 145 110 T 130 65" fill="none" stroke="url(#bodyGrad)" strokeWidth="7.5" strokeLinecap="round" />
            {/* Arm support */}
            <path d="M135 110 L125 140 L125 170" fill="none" stroke="url(#bodyGrad)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Head looking slightly up */}
            <circle cx="130" cy="48" r="11" fill="url(#bodyGrad)" />
            <line x1="130" y1="48" x2="140" y2="44" stroke="url(#bodyGrad)" strokeWidth="4" strokeLinecap="round" />
          </>
        );

      case "vajrasana":
        return (
          <>
            <ellipse cx="100" cy="120" rx="45" ry="45" fill="url(#auraGrad)" />
            {/* Ground */}
            <line x1="40" y1="180" x2="160" y2="180" stroke="#475569" strokeWidth="3" />
            {/* Folded Legs */}
            <path d="M60 170 Q 100 175 120 170 T 90 145 Z" fill="none" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Vertical Torso */}
            <line x1="90" y1="145" x2="92" y2="80" stroke="url(#bodyGrad)" strokeWidth="7.5" strokeLinecap="round" />
            {/* Hands on thighs */}
            <path d="M92 95 L110 120 L115 145" fill="none" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Head */}
            <circle cx="92" cy="62" r="11" fill="url(#bodyGrad)" />
          </>
        );

      case "shavasana":
        return (
          <>
            {/* Horizontal waves of calm energy */}
            <path d="M30 120 Q 100 110 170 120" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="10" filter="url(#glow)" />
            <path d="M30 150 Q 100 140 170 150" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="6" />
            {/* Ground */}
            <line x1="20" y1="165" x2="180" y2="165" stroke="#475569" strokeWidth="3" />
            {/* Lie down body */}
            {/* Legs */}
            <line x1="50" y1="158" x2="110" y2="158" stroke="url(#bodyGrad)" strokeWidth="5.5" strokeLinecap="round" />
            {/* Torso */}
            <line x1="110" y1="158" x2="150" y2="158" stroke="url(#bodyGrad)" strokeWidth="6.5" strokeLinecap="round" />
            {/* Feet resting open */}
            <line x1="50" y1="158" x2="42" y2="150" stroke="url(#bodyGrad)" strokeWidth="4" strokeLinecap="round" />
            {/* Arms slightly out */}
            <line x1="120" y1="158" x2="140" y2="162" stroke="url(#bodyGrad)" strokeWidth="4" strokeLinecap="round" />
            {/* Head resting */}
            <circle cx="163" cy="155" r="10" fill="url(#bodyGrad)" />
            {/* Chakra centers (glowing dots along the spine) */}
            <circle cx="110" cy="158" r="2.5" fill="#ef4444" /> {/* Root */}
            <circle cx="120" cy="158" r="2.5" fill="#f97316" /> {/* Sacral */}
            <circle cx="130" cy="158" r="2.5" fill="#eab308" /> {/* Solar Plexus */}
            <circle cx="140" cy="158" r="2.5" fill="#10b981" /> {/* Heart */}
            <circle cx="150" cy="158" r="2.5" fill="#3b82f6" /> {/* Throat */}
            <circle cx="160" cy="156" r="2" fill="#6366f1" /> {/* Third Eye */}
          </>
        );

      case "setubandhasana":
        return (
          <>
            {/* Bridge arching glow */}
            <ellipse cx="100" cy="135" rx="50" ry="25" fill="url(#auraGrad)" />
            {/* Ground */}
            <line x1="30" y1="175" x2="170" y2="175" stroke="#475569" strokeWidth="3" />
            {/* Bridge curve body (Shoulders to Knees) */}
            {/* Shoulders on ground (left) to knees raised (middle-right) to feet on ground (right) */}
            {/* Feet support */}
            <line x1="140" y1="175" x2="140" y2="135" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" />
            {/* Arch (Shoulders at 60,170 to Knees at 140,135) */}
            <path d="M65 170 Q 100 115 140 135" fill="none" stroke="url(#bodyGrad)" strokeWidth="7" strokeLinecap="round" />
            {/* Head on floor */}
            <circle cx="48" cy="170" r="10" fill="url(#bodyGrad)" />
            {/* Hands clasped underneath */}
            <line x1="60" y1="175" x2="110" y2="175" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" />
          </>
        );

      case "paschimottanasana":
        return (
          <>
            <ellipse cx="100" cy="130" rx="50" ry="30" fill="url(#auraGrad)" />
            {/* Ground */}
            <line x1="30" y1="175" x2="170" y2="175" stroke="#475569" strokeWidth="3" />
            {/* Seated leg forward */}
            <line x1="75" y1="170" x2="150" y2="170" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" />
            {/* Torso folded forward over legs */}
            <path d="M75 170 Q 75 135 110 145 T 145 160" fill="none" stroke="url(#bodyGrad)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Arms reaching to feet */}
            <path d="M85 148 L125 155 L150 170" fill="none" stroke="url(#bodyGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Head tucked down */}
            <circle cx="138" cy="154" r="10" fill="url(#bodyGrad)" />
          </>
        );

      case "trikonasana":
        return (
          <>
            {/* Triangular outlines in background */}
            <polygon points="100,50 60,170 140,170" fill="none" stroke="rgba(16,185,129,0.06)" strokeWidth="2" />
            {/* Ground */}
            <line x1="30" y1="175" x2="170" y2="175" stroke="#475569" strokeWidth="3" />
            {/* Legs wide apart */}
            <line x1="100" y1="110" x2="60" y2="170" stroke="url(#bodyGrad)" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="100" y1="110" x2="135" y2="170" stroke="url(#bodyGrad)" strokeWidth="5.5" strokeLinecap="round" />
            {/* Torso tilted laterally */}
            <line x1="100" y1="110" x2="130" y2="85" stroke="url(#bodyGrad)" strokeWidth="6.5" strokeLinecap="round" />
            {/* Hand down to foot */}
            <line x1="120" y1="95" x2="135" y2="165" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" />
            {/* Hand extended straight up */}
            <line x1="120" y1="95" x2="95" y2="50" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" />
            {/* Head looking up */}
            <circle cx="135" cy="74" r="10" fill="url(#bodyGrad)" />
          </>
        );

      case "padmasana":
        return (
          <>
            {/* Aura surrounding yogi */}
            <circle cx="100" cy="110" r="50" fill="url(#auraGrad)" filter="url(#glow)" />
            {/* Ground */}
            <line x1="40" y1="175" x2="160" y2="175" stroke="#475569" strokeWidth="3" />
            {/* Cross legs flat on ground (triangle base) */}
            <path d="M55 170 Q 100 180 145 170 C 130 150, 70 150, 55 170 Z" fill="none" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Straight Spine */}
            <line x1="100" y1="160" x2="100" y2="90" stroke="url(#bodyGrad)" strokeWidth="7.5" strokeLinecap="round" />
            {/* Arms on knees (Gyan Mudra) */}
            <path d="M100 100 L70 135 L60 160" fill="none" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M100 100 L130 135 L140 160" fill="none" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Head */}
            <circle cx="100" cy="70" r="12" fill="url(#bodyGrad)" />
            {/* Halo light */}
            <circle cx="100" cy="70" r="16" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5" strokeDasharray="4,2" />
          </>
        );

      case "sukhasana":
        return (
          <>
            <circle cx="100" cy="115" r="45" fill="url(#auraGrad)" />
            {/* Ground */}
            <line x1="40" y1="175" x2="160" y2="175" stroke="#475569" strokeWidth="3" />
            {/* Crossed legs base */}
            <path d="M60 170 Q 100 178 140 170 C 120 155, 80 155, 60 170 Z" fill="none" stroke="url(#bodyGrad)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Spine */}
            <line x1="100" y1="160" x2="100" y2="92" stroke="url(#bodyGrad)" strokeWidth="7" strokeLinecap="round" />
            {/* Relaxed arms */}
            <path d="M100 105 L72 135 L65 160" fill="none" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Head */}
            <circle cx="100" cy="72" r="12" fill="url(#bodyGrad)" />
          </>
        );

      case "suryanamaskar":
        return (
          <>
            {/* 12 zodiac/cycles sun background */}
            <circle cx="100" cy="100" r="60" fill="none" stroke="url(#sunGrad)" strokeWidth="2" strokeDasharray="5,10" />
            <circle cx="100" cy="100" r="30" fill="url(#sunGrad)" filter="url(#glow)" />
            {/* Fluid posture wave */}
            <path d="M40 120 C 60 80, 140 80, 160 120" fill="none" stroke="url(#bodyGrad)" strokeWidth="5.5" strokeLinecap="round" />
            {/* Symbolic kneeling & standing stick figures */}
            <circle cx="100" cy="50" r="8" fill="url(#bodyGrad)" />
            <line x1="100" y1="58" x2="100" y2="90" stroke="url(#bodyGrad)" strokeWidth="5" />
            <path d="M90 110 L100 90 L110 110" stroke="url(#bodyGrad)" strokeWidth="4" />
          </>
        );

      default:
        return generateProceduralAsana(id);
    }
  };

  const getHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const generateProceduralAsana = (poseId: string) => {
    const hash = getHash(poseId);
    
    // Choose pose type based on hash:
    // 0: Standing/Balancing, 1: Seated/Meditative, 2: Forward Fold/Stretch, 3: Backbend/Bridge/Inversion, 4: Lying down/Relaxing
    const poseType = hash % 5;
    
    // Background decorations based on hash
    const bgType = (hash >> 2) % 3;
    let bgDecoration = null;
    if (bgType === 0) {
      // Mountain background
      bgDecoration = <path d="M30 180 L90 90 L150 180 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />;
    } else if (bgType === 1) {
      // Sun/Halo
      bgDecoration = <circle cx="100" cy="80" r="40" fill="url(#sunGrad)" />;
    } else {
      // Circular waves
      bgDecoration = <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(6,182,212,0.05)" strokeWidth="1.5" strokeDasharray="6,4" />;
    }

    // Aura
    const aura = <ellipse cx="100" cy="110" rx="35" ry="60" fill="url(#auraGrad)" filter="url(#glow)" />;
    // Ground
    const ground = <line x1="30" y1="180" x2="170" y2="180" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />;

    // Generate joints and limbs dynamically
    let limbs = null;
    
    if (poseType === 0) {
      // Standing/Balancing Pose
      const balancing = (hash % 2) === 0;
      const armsUp = ((hash >> 3) % 2) === 0;
      
      limbs = (
        <>
          {/* Standing legs */}
          {balancing ? (
            <>
              <line x1="100" y1="180" x2="100" y2="130" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" />
              <path d="M100 130 L115 155 L100 160" fill="none" stroke="url(#bodyGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : (
            <>
              <line x1="90" y1="180" x2="100" y2="130" stroke="url(#bodyGrad)" strokeWidth="5.5" strokeLinecap="round" />
              <line x1="110" y1="180" x2="100" y2="130" stroke="url(#bodyGrad)" strokeWidth="5.5" strokeLinecap="round" />
            </>
          )}
          {/* Torso */}
          <line x1="100" y1="130" x2="100" y2="80" stroke="url(#bodyGrad)" strokeWidth="6.5" strokeLinecap="round" />
          {/* Arms */}
          {armsUp ? (
            <>
              <path d="M100 90 L80 65 L95 40" fill="none" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M100 90 L120 65 L105 40" fill="none" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : (
            <>
              <line x1="100" y1="90" x2="70" y2="100" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="100" y1="90" x2="130" y2="100" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" />
            </>
          )}
          {/* Head */}
          <circle cx="100" cy="58" r="11" fill="url(#bodyGrad)" />
        </>
      );
    } else if (poseType === 1) {
      // Seated/Meditative Pose
      const handsFolded = ((hash >> 3) % 2) === 0;
      
      limbs = (
        <>
          {/* Folded legs base */}
          <path d="M55 175 Q 100 183 145 175 C 125 158, 75 158, 55 175 Z" fill="none" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Spine */}
          <line x1="100" y1="162" x2="100" y2="95" stroke="url(#bodyGrad)" strokeWidth="7" strokeLinecap="round" />
          {/* Arms */}
          {handsFolded ? (
            <path d="M100 110 L85 130 L100 135 L115 130 L100 110" fill="none" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <>
              <path d="M100 110 L75 138 L65 160" fill="none" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M100 110 L125 138 L135 160" fill="none" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            </>
          )}
          {/* Head */}
          <circle cx="100" cy="74" r="11" fill="url(#bodyGrad)" />
        </>
      );
    } else if (poseType === 2) {
      // Forward Fold/Stretch Pose
      const seatedFold = ((hash >> 3) % 2) === 0;
      
      if (seatedFold) {
        limbs = (
          <>
            {/* Seated leg forward */}
            <line x1="70" y1="175" x2="150" y2="175" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" />
            {/* Torso folded forward */}
            <path d="M70 175 Q 75 138 105 142 T 140 158" fill="none" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Arms reaching */}
            <path d="M82 146 L120 152 L150 175" fill="none" stroke="url(#bodyGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* Head tucked down */}
            <circle cx="132" cy="152" r="10" fill="url(#bodyGrad)" />
          </>
        );
      } else {
        // Standing fold
        limbs = (
          <>
            {/* Standing legs */}
            <line x1="100" y1="180" x2="100" y2="135" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" />
            {/* Torso hanging down */}
            <path d="M100 135 C 100 95, 75 95, 75 135" fill="none" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" />
            {/* Arms reaching to ground */}
            <path d="M92 120 L75 140 L70 180" fill="none" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" />
            {/* Head hanging */}
            <circle cx="75" cy="148" r="10" fill="url(#bodyGrad)" />
          </>
        );
      }
    } else if (poseType === 3) {
      // Backbend/Bridge/Lunge
      const lunging = ((hash >> 3) % 2) === 0;
      
      if (lunging) {
        // Warrior-like lunge pose
        limbs = (
          <>
            {/* Front bent leg */}
            <path d="M135 180 L135 145 L100 135" fill="none" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Back straight leg */}
            <line x1="60" y1="180" x2="100" y2="135" stroke="url(#bodyGrad)" strokeWidth="5.5" strokeLinecap="round" />
            {/* Torso vertical/proud */}
            <line x1="100" y1="135" x2="100" y2="85" stroke="url(#bodyGrad)" strokeWidth="6.5" strokeLinecap="round" />
            {/* Arms wide or up */}
            <line x1="100" y1="95" x2="70" y2="80" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="100" y1="95" x2="130" y2="80" stroke="url(#bodyGrad)" strokeWidth="4.5" strokeLinecap="round" />
            {/* Head */}
            <circle cx="100" cy="63" r="11" fill="url(#bodyGrad)" />
          </>
        );
      } else {
        // Cobra-like arch
        limbs = (
          <>
            {/* Legs on floor */}
            <path d="M40 175 C 80 175, 100 175, 115 165" fill="none" stroke="url(#bodyGrad)" strokeWidth="6" strokeLinecap="round" />
            {/* Arching spine */}
            <path d="M115 165 Q 140 155 140 115 T 125 70" fill="none" stroke="url(#bodyGrad)" strokeWidth="7" strokeLinecap="round" />
            {/* Arm support */}
            <path d="M128 115 L120 142 L120 175" fill="none" stroke="url(#bodyGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Head looking back/up */}
            <circle cx="120" cy="53" r="11" fill="url(#bodyGrad)" />
          </>
        );
      }
    } else {
      // Lying down/Relaxing Pose
      limbs = (
        <>
          {/* Lie down body */}
          <line x1="45" y1="165" x2="105" y2="165" stroke="url(#bodyGrad)" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="105" y1="165" x2="145" y2="165" stroke="url(#bodyGrad)" strokeWidth="6.5" strokeLinecap="round" />
          {/* Feet resting open */}
          <line x1="45" y1="165" x2="38" y2="157" stroke="url(#bodyGrad)" strokeWidth="4" strokeLinecap="round" />
          {/* Arms resting */}
          <line x1="115" y1="165" x2="135" y2="169" stroke="url(#bodyGrad)" strokeWidth="4" strokeLinecap="round" />
          {/* Head resting */}
          <circle cx="158" cy="162" r="10" fill="url(#bodyGrad)" />
        </>
      );
    }

    return (
      <>
        {bgDecoration}
        {aura}
        {ground}
        {limbs}
      </>
    );
  };

  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} overflow-visible`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {gradients}
      {getSvgContent()}
    </svg>
  );
};
