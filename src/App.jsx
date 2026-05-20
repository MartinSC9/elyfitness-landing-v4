import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./app/page'));

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-6">
      <div className="text-center">
        <p className="text-6xl font-black text-white/10 mb-4">404</p>
        <p className="text-white/60 text-sm mb-6">Pagina no encontrada</p>
        <a href="/" className="text-[#D9A3FF] hover:text-[#c084fc] text-sm font-medium transition-colors">
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
