import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Index />
              </SignedIn>
              <SignedOut>
                <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
                  <SignIn routing="hash" signUpUrl="/sign-up" />
                </div>
              </SignedOut>
            </>
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
              <SignUp routing="hash" signInUrl="/" />
            </div>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
