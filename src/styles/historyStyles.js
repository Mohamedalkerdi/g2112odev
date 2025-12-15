import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const historyStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  header: { fontSize: 26, fontWeight: '900', color: colors.text, letterSpacing: -0.2 },
  subtitle: { color: colors.subtext, fontSize: 13 },
  headerIconBtn: { width: 34, height: 34, borderRadius: 10, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 12 },
  seedBtn: { backgroundColor: colors.primary },
  deleteBtn: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.danger },
  actionText: { color: colors.text, fontWeight: '800' },

  statGrid: { flexDirection: 'row', gap: 12, marginBottom: 18 },
  statCard: { flex: 1.3, backgroundColor: colors.surface, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.border, shadowColor: colors.primary, shadowOpacity: 0.12, shadowRadius: 6, elevation: 2 },
  statCardSmall: { flex: 1, backgroundColor: colors.surface, padding: 12, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
  statLabel: { color: colors.subtext, fontWeight: '700', fontSize: 12, letterSpacing: 0.3, textTransform: 'uppercase' },
  statValue: { color: colors.text, fontWeight: '900', fontSize: 22, marginTop: 6 },

  timeline: { marginTop: 4 },
  dayCard: { backgroundColor: colors.surface, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.border, marginBottom: 12, shadowColor: colors.primary, shadowOpacity: 0.12, shadowRadius: 6, elevation: 2 },
  dayHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' },
  dayTitle: { color: colors.text, fontWeight: '800', fontSize: 16 },
  dayMeta: { color: colors.subtext, fontWeight: '700', fontSize: 12 },

  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  itemRowLast: { borderBottomWidth: 0 },
  itemInfo: { flex: 1 },
  itemCat: { color: colors.text, fontWeight: '800', fontSize: 15 },
  itemDate: { color: colors.subtext, fontSize: 12, marginTop: 2 },
  itemDuration: { color: colors.primary, fontWeight: '800', fontSize: 15 },
  itemLoss: { color: colors.danger, fontSize: 12, marginTop: 2, textAlign: 'right' },

  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: colors.border, marginLeft: 8 },
  badgeText: { color: colors.subtext, fontWeight: '700', fontSize: 11 },
});

