import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { content, type Content, type Language } from "./content";

export const LANGUAGE_STORAGE_KEY = "sorayasacaan:language";

function detectLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "en" || saved === "es") return saved;
  } catch {
    // Storage can be unavailable (private mode): fall back to the browser language.
  }
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initial,
}: {
  children: ReactNode;
  /** Forces the starting language (useful in tests). */
  initial?: Language;
}) {
  const [language, setLanguage] = useState<Language>(() => initial ?? detectLanguage());

  // Keep the page language, the tab title and the saved choice in sync.
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = content[language].meta.title;
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignored: the choice just will not be remembered.
    }
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t: content[language] }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside a LanguageProvider");
  return context;
}
