
export type Language = 'es' | 'fr' | 'ar';

export type DepartmentKey = 'production' | 'logistics' | 'maintenance' | 'quality';
export type ShiftKey = 'morning' | 'afternoon' | 'night';

export interface AbsenceRecord {
  id: string;
  date: string;
  department: DepartmentKey;
  shift: ShiftKey;
  totalStaff: number;
  absences: number;
  rate: number;
  createdAt: number;
}

export interface Translations {
  title: string;
  dashboard: string;
  newEntry: string;
  history: string;
  date: string;
  department: string;
  shift: string;
  totalStaff: string;
  absences: string;
  save: string;
  clear: string;
  export: string;
  delete: string;
  absenceRate: string;
  summary: string;
  avgShiftRate: string;
  deptDistribution: string;
  aiAnalysis: string;
  noData: string;
  departments: Record<DepartmentKey, string>;
  shifts: Record<ShiftKey, string>;
  confirmClear: string;
}
