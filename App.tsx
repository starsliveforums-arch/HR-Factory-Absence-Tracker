
import React, { useState, useEffect, useMemo } from 'react';
import { translations } from './translations';
import { AbsenceRecord, Language, DepartmentKey, ShiftKey } from './types';
import EntryForm from './components/EntryForm';
import Dashboard from './components/Dashboard';
import History from './components/History';
import { LayoutGrid, ClipboardList, History as HistoryIcon, Download, Trash2, Languages } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const LOCAL_STORAGE_KEY = 'factory_absence_data_v1';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [activeTab, setActiveTab] = useState<'entry' | 'dashboard' | 'history'>('entry');
  const [records, setRecords] = useState<AbsenceRecord[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const t = translations[lang];
  const isRTL = lang === 'ar';

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved data");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const addRecord = (record: Omit<AbsenceRecord, 'id' | 'createdAt'>) => {
    const newRecord: AbsenceRecord = {
      ...record,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    setRecords(prev => [newRecord, ...prev]);
    setActiveTab('dashboard');
  };

  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  const clearDayData = () => {
    if (confirm(t.confirmClear)) {
      setRecords([]);
      setAiInsight(null);
    }
  };

  const exportCSV = () => {
    const headers = [t.date, t.department, t.shift, t.totalStaff, t.absences, t.absenceRate];
    const rows = records.map(r => [
      r.date,
      t.departments[r.department],
      t.shifts[r.shift],
      r.totalStaff,
      r.absences,
      `${r.rate.toFixed(2)}%`
    ]);

    const csvContent = "\uFEFF" + [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `absence_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAiAnalysis = async () => {
    if (records.length === 0) return;
    setIsAiLoading(true);
    setAiInsight(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Analyze the following industrial absence data and provide a professional, 3-sentence summary of trends and potential actions in ${lang === 'es' ? 'Spanish' : lang === 'fr' ? 'French' : 'Arabic'}. Data: ${JSON.stringify(records)}`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setAiInsight(response.text || "Analysis failed");
    } catch (error) {
      console.error("AI Error:", error);
      setAiInsight("Error generating insight.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-all duration-300" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-6 h-6" />
            <h1 className="text-xl font-bold truncate max-w-[200px] md:max-w-none">{t.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-indigo-600 text-white border-none rounded px-2 py-1 text-sm focus:ring-2 focus:ring-white outline-none cursor-pointer"
            >
              <option value="es">ES</option>
              <option value="fr">FR</option>
              <option value="ar">AR</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-4 pb-24">
        {activeTab === 'entry' && (
          <EntryForm 
            t={t} 
            onAdd={addRecord} 
            isRTL={isRTL} 
          />
        )}
        
        {activeTab === 'dashboard' && (
          <Dashboard 
            t={t} 
            records={records} 
            isRTL={isRTL}
            onAiAnalyze={handleAiAnalysis}
            aiInsight={aiInsight}
            isAiLoading={isAiLoading}
          />
        )}

        {activeTab === 'history' && (
          <History 
            t={t} 
            records={records} 
            onDelete={deleteRecord}
            onClearAll={clearDayData}
            onExport={exportCSV}
            isRTL={isRTL}
          />
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-5xl mx-auto flex justify-around">
          <button 
            onClick={() => setActiveTab('entry')}
            className={`flex flex-col items-center py-3 px-6 flex-1 transition-colors ${activeTab === 'entry' ? 'text-indigo-600 border-t-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}
          >
            <ClipboardList className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">{t.newEntry}</span>
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center py-3 px-6 flex-1 transition-colors ${activeTab === 'dashboard' ? 'text-indigo-600 border-t-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}
          >
            <LayoutGrid className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">{t.dashboard}</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center py-3 px-6 flex-1 transition-colors ${activeTab === 'history' ? 'text-indigo-600 border-t-2 border-indigo-600' : 'text-gray-500 hover:text-indigo-500'}`}
          >
            <HistoryIcon className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">{t.history}</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default App;
