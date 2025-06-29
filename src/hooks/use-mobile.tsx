import * as React from "react"
import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return !!isMobile
}

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export function useSmoothScroll() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Melhorar a performance do scroll */
      * {
        scroll-behavior: smooth;
      }
      
      /* Adicionar momentum scroll para dispositivos móveis */
      @media (max-width: 768px) {
        body {
          -webkit-overflow-scrolling: touch;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
}

// Hook para gerenciar cache de forma eficiente
export function useCacheManager() {
  const [cacheStatus, setCacheStatus] = useState<'loading' | 'cached' | 'fresh' | 'error'>('loading');

  const checkCacheStatus = () => {
    try {
      const cached = localStorage.getItem('github_projects_cache');
      if (!cached) {
        setCacheStatus('fresh');
        return;
      }

      const cacheData = JSON.parse(cached);
      const now = Date.now();
      const cacheAge = now - cacheData.timestamp;
      const cacheDuration = 1000 * 60 * 30; // 30 minutos

      if (cacheAge < cacheDuration) {
        setCacheStatus('cached');
      } else {
        setCacheStatus('fresh');
      }
    } catch (error) {
      setCacheStatus('error');
    }
  };

  useEffect(() => {
    checkCacheStatus();
    
    // Verificar status do cache periodicamente
    const interval = setInterval(checkCacheStatus, 1000 * 60); // A cada minuto
    
    return () => clearInterval(interval);
  }, []);

  return {
    cacheStatus,
    checkCacheStatus
  };
}
