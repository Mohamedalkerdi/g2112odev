import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useHistoryLogic } from '../hooks/useHistoryLogic';
import { historyStyles as styles } from '../styles/historyStyles';
import { colors } from '../styles/colors';
import Card from '../components/Card';

const fmtTime = (s) => { const m = Math.floor(s/60); const sec = s%60; return m===0 ? `${sec}s` : `${m}m ${sec}s`; };
const fmtDate = (d) => { const date = new Date(d); return `${date.toLocaleDateString()} ${date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}`; };
const fmtDay = (d) => {
  const date = new Date(d);
  const today = new Date();
  const diff = Math.floor((today - date) / (1000*60*60*24));
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
};

export default function HistoryScreen() {
  const { grouped, totals, handleClearData, handleSeedDemo, loading } = useHistoryLogic();

  const metaBadges = useMemo(() => [
    { label: 'Sessions', value: totals.count },
    { label: 'Distractions', value: totals.distractions },
  ], [totals]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.header}>History</Text>
            <Text style={styles.subtitle}>Review your recent focus streaks.</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.seedBtn]} onPress={handleSeedDemo} disabled={loading} activeOpacity={0.8}>
            {loading ? <ActivityIndicator size="small" color={colors.background} /> : <Ionicons name="sparkles-outline" size={18} color={colors.background} />}
            <Text style={styles.actionText}>Fill Demo Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={handleClearData} disabled={loading} activeOpacity={0.8}>
            {loading ? <ActivityIndicator size="small" color={colors.danger} /> : <Ionicons name="trash-outline" size={18} color={colors.danger} />}
            <Text style={[styles.actionText, { color: colors.danger }]}>Delete All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Time</Text>
            <Text style={styles.statValue}>{fmtTime(totals.duration)}</Text>
          </View>
          {metaBadges.map((b, idx) => (
            <View key={idx} style={styles.statCardSmall}>
              <Text style={styles.statLabel}>{b.label}</Text>
              <Text style={styles.statValue}>{b.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.timeline}>
          {grouped.length === 0 && (
            <Card style={{ alignItems: 'center' }}>
              <Text style={{ color: colors.subtext, fontWeight: '700' }}>No sessions yet.</Text>
              <Text style={{ color: colors.subtext, marginTop: 6 }}>Start a timer to build your streak.</Text>
            </Card>
          )}

          {grouped.map((day) => (
            <View key={day.day} style={styles.dayCard}>
              <View style={styles.dayHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.dayTitle}>{fmtDay(day.day)}</Text>
                  <View style={styles.badge}><Text style={styles.badgeText}>{day.items.length} logs</Text></View>
                </View>
                <Text style={styles.dayMeta}>{fmtTime(day.duration)} · {day.distractions} distractions</Text>
              </View>

              {day.items.map((s, idx) => (
                <View key={idx} style={[styles.itemRow, idx === day.items.length - 1 && styles.itemRowLast]}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemCat}>{s.category}</Text>
                    <Text style={styles.itemDate}>{fmtDate(s.date)}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.itemDuration}>{fmtTime(s.duration)}</Text>
                    {s.focusLoss > 0 && <Text style={styles.itemLoss}>{s.focusLoss} distractions</Text>}
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

