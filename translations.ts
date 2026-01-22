
import { Translations, Language } from './types';

export const translations: Record<Language, Translations> = {
  es: {
    title: 'Control de Ausentismo Industrial',
    dashboard: 'Panel de Control',
    newEntry: 'Nueva Entrada',
    history: 'Historial',
    date: 'Fecha',
    department: 'Departamento',
    shift: 'Turno',
    totalStaff: 'Personal Total',
    absences: 'Ausencias',
    save: 'Guardar Registro',
    clear: 'Borrar Datos',
    export: 'Exportar CSV',
    delete: 'Eliminar',
    absenceRate: 'Tasa de Ausentismo',
    summary: 'Resumen Diario',
    avgShiftRate: 'Tasa Media por Turno',
    deptDistribution: 'Distribución por Depto.',
    aiAnalysis: 'Análisis Inteligente',
    noData: 'No hay datos disponibles para el periodo seleccionado.',
    confirmClear: '¿Estás seguro de que quieres borrar todos los datos del día?',
    departments: {
      production: 'Producción',
      logistics: 'Logística',
      maintenance: 'Mantenimiento',
      quality: 'Calidad'
    },
    shifts: {
      morning: 'Mañana',
      afternoon: 'Tarde',
      night: 'Noche'
    }
  },
  fr: {
    title: 'Contrôle d\'Absentéisme Industriel',
    dashboard: 'Tableau de Bord',
    newEntry: 'Nouvelle Entrée',
    history: 'Historique',
    date: 'Date',
    department: 'Département',
    shift: 'Équipe',
    totalStaff: 'Effectif Total',
    absences: 'Absences',
    save: 'Enregistrer',
    clear: 'Effacer',
    export: 'Exporter CSV',
    delete: 'Supprimer',
    absenceRate: 'Taux d\'Absentéisme',
    summary: 'Résumé Quotidien',
    avgShiftRate: 'Taux Moyen par Équipe',
    deptDistribution: 'Distribution par Dépt.',
    aiAnalysis: 'Analyse IA',
    noData: 'Aucune donnée disponible pour cette période.',
    confirmClear: 'Voulez-vous vraiment effacer toutes les données du jour?',
    departments: {
      production: 'Production',
      logistics: 'Logistique',
      maintenance: 'Maintenance',
      quality: 'Qualité'
    },
    shifts: {
      morning: 'Matin',
      afternoon: 'Après-midi',
      night: 'Nuit'
    }
  },
  ar: {
    title: 'مراقب الغياب الصناعي',
    dashboard: 'لوحة القيادة',
    newEntry: 'إدخال جديد',
    history: 'السجل',
    date: 'التاريخ',
    department: 'القسم',
    shift: 'الفوج',
    totalStaff: 'إجمالي الموظفين',
    absences: 'الغيابات',
    save: 'حفظ السجل',
    clear: 'مسح البيانات',
    export: 'تصدير CSV',
    delete: 'حذف',
    absenceRate: 'نسبة الغياب',
    summary: 'الملخص اليومي',
    avgShiftRate: 'متوسط النسبة حسب الفوج',
    deptDistribution: 'توزيع الغيابات حسب القسم',
    aiAnalysis: 'تحليل الذكاء الاصطناعي',
    noData: 'لا توجد بيانات متاحة للفترة المختارة.',
    confirmClear: 'هل أنت متأكد من مسح جميع بيانات اليوم؟',
    departments: {
      production: 'الإنتاج',
      logistics: 'اللوجستيك',
      maintenance: 'الصيانة',
      quality: 'الجودة'
    },
    shifts: {
      morning: 'الصباح',
      afternoon: 'المساء',
      night: 'الليل'
    }
  }
};
