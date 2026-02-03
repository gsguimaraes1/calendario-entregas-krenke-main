import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogtoProvider, type LogtoConfig, useLogto } from '@logto/react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Callback from "./pages/Callback";

const config: LogtoConfig = {
  endpoint: 'https://e4b5wh.logto.app/',
  appId: 'genm4d3na17mkxtheiwlx',
};

const queryClient = new QueryClient();

const ProtectedContent = () => {
  const { isAuthenticated, isLoading, signIn } = useLogto();

  // Se estiver em modo de desenvolvimento (npm run dev), pula o login
  if (import.meta.env.DEV) {
    return <Index />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2563eb]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4">
        <div className="bg-[#0f1115] p-8 rounded-[2rem] border border-white/10 shadow-2xl text-center max-w-sm w-full">
          <img src="/logo_krenke.png" alt="Krenke" className="h-12 mx-auto mb-6" />
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Monitor de Entregas</h1>
          <p className="text-gray-400 mb-8 text-sm">Acesse o painel para gerenciar as entregas da Krenke.</p>
          <button
            onClick={() => signIn(`${window.location.origin}/callback`)}
            className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest text-sm"
          >
            Entrar no Sistema
          </button>
        </div>
      </div>
    );
  }

  return <Index />;
};

const App = () => (
  <LogtoProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedContent />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </LogtoProvider>
);

export default App;
