import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';

export const homeStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContainer: { alignItems: 'center', padding: 24, paddingBottom: 50 },
  header: { fontSize: 30, fontWeight: '900', color: colors.text, marginBottom: 6, letterSpacing: -0.4 },
  subtitle: { color: colors.subtext, marginBottom: 18, fontSize: 14 },

  // Selectors (category/time bars)
  selector: {
    width: '100%',
    backgroundColor: '#020617',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  selectorTextWrap: { flex: 1, alignItems: 'center' },
  selectorLabel: {
    color: colors.subtext,
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  selectorValue: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 18,
    marginTop: 4,
    textAlign: 'center',
  },

  // Timer
  timerContainer: { marginBottom: 18, alignItems: 'center', justifyContent: 'center' },
  timerOuter: { width: 260, height: 260, justifyContent: 'center', alignItems: 'center' },
  glowRing: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.primary,
    opacity: 0.2,
  },
  timerCircle: { 
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.4,
    borderColor: colors.primary,
    ...Platform.select({ android: { elevation: 16 }, ios: { shadowColor: '#0f172a', shadowOffset: { width: 0, height: 18 }, shadowOpacity: 0.25, shadowRadius: 22 } }) 
  },
  timerCircleActive: { borderWidth: 2.2, borderColor: colors.accent },
  timerTextWrap: {
    paddingHorizontal: 26,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#020617',
    borderWidth: 1,
    borderColor: colors.border,
  },
  timerText: {
    fontSize: 60,
    fontWeight: '800',
    letterSpacing: 3,
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
  statusPillContainer: { marginTop: 16, alignItems: 'center', width: '100%' },
  statusPill: { paddingHorizontal: 18, paddingVertical: 6, borderRadius: 999, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  statusText: { fontSize: 12, letterSpacing: 3, color: colors.subtext, fontWeight: '800' },
  progressWrap: { width: 280, alignItems: 'center', marginTop: 10 },
  progressBar: { width: '100%', height: 10, borderRadius: 10, backgroundColor: colors.border, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 10, backgroundColor: colors.primary },
  progressLabel: { marginTop: 6, color: colors.subtext, fontSize: 12, letterSpacing: 0.5 },

  // Selector modal options
  selectContent: { width: '82%', backgroundColor: colors.surface, borderRadius: 18, padding: 20, borderWidth: 1, borderColor: colors.border },
  optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  optionText: { color: colors.text, fontWeight: '800', fontSize: 15 },
  optionAdd: { gap: 8, borderBottomWidth: 0 },

  // Controls
  statsRow: { flexDirection: 'row', marginTop: 16, marginBottom: 24, alignItems: 'center', justifyContent: 'center', width: '100%', gap: 12 },
  statBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.primary, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14 },
  statLabel: { color: colors.background, fontWeight: '900', letterSpacing: 0.3 },
  statChip: { backgroundColor: colors.accent, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 14, minWidth: 64, alignItems: 'center' },
  statChipText: { color: colors.background, fontWeight: '900', fontSize: 16 },
  btnColumn: { width: '100%', marginTop: 8, gap: 10, marginBottom: 20 },

  // Summary
  summaryContainer: { width: '100%', alignItems: 'center', marginTop: 16 },
  summaryTitle: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 12 },
  divider: { width: '100%', height: 1, backgroundColor: colors.divider, marginBottom: 18 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 14 },
  summaryLabel: { fontSize: 15, color: colors.subtext },
  summaryValue: { fontSize: 18, fontWeight: '800', color: colors.text },
  summaryBtnRow: { flexDirection: 'row', marginTop: 16, gap: 12, width: '100%' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '82%', backgroundColor: colors.surface, borderRadius: 20, padding: 24, elevation: 5, borderWidth: 1, borderColor: colors.border },
  modalTitle: { fontSize: 20, fontWeight: '900', marginBottom: 15, color: colors.text },
  input: { borderBottomWidth: 1, borderBottomColor: colors.border, padding: 10, fontSize: 16, marginBottom: 20, color: colors.text },
  modalBtns: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15 },
});