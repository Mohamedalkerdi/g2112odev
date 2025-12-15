import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const reportsStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: 24 },
  
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  header: { fontSize: 24, fontWeight: '900', color: colors.text, letterSpacing: -0.2 },
  headerSubtitle: { fontSize: 13, color: colors.subtext, marginTop: 4 },

  // New toggle segmented control
  toggleCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 999,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleOptionActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    color: colors.subtext,
    fontWeight: '800',
    fontSize: 13,
  },
  toggleTextActive: {
    color: colors.background,
  },
  
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 22 },
  statCardBig: { flex: 1, alignItems: 'center' },
  cardTitle: { fontSize: 12, color: colors.subtext, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.3 },
  cardValue: { fontSize: 22, fontWeight: '900', color: colors.text },
  
  chartContainer: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chartTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 12, textAlign: 'left' },
  
  graphStyle: { borderRadius: 16 },
  noData: { textAlign: 'center', color: colors.subtext, marginVertical: 30, fontStyle: 'italic' },
  
  sectionHeader: { fontSize: 18, fontWeight: '800', color: colors.text, marginBottom: 15, marginTop: 10 },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, padding: 16, borderRadius: 14, marginBottom: 10, elevation: 2, borderWidth: 1, borderColor: colors.border },
  historyCat: { fontWeight: '700', color: colors.text, fontSize: 16 },
  historyDate: { color: colors.subtext, fontSize: 12, marginTop: 4 },
  historyDuration: { fontWeight: '800', color: colors.primary, fontSize: 16 },
  historyLoss: { color: colors.danger, fontSize: 12, marginTop: 2 }
});