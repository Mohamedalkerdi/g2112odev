import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BarChart, PieChart } from 'react-native-chart-kit';

import { useReportsLogic } from '../hooks/useReportsLogic';
import { reportsStyles as styles } from '../styles/reportsStyles';
import { colors } from '../styles/colors';
import Card from '../components/Card';

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "transparent",
  backgroundGradientTo: "transparent",
  color: (o = 1) => `rgba(34, 197, 94, ${o})`, // primary green
  strokeWidth: 2,
  barPercentage: 0.6,
  decimalPlaces: 0,
  labelColor: (o = 1) => `rgba(148, 163, 184, ${o})`,
  fillShadowGradientFrom: 'rgba(34, 197, 94, 0.85)',
  fillShadowGradientTo: 'rgba(34, 197, 94, 0.25)',
};

export default function ReportsScreen() {
  const { viewMode, setViewMode, stats, pieData, barData, barLabels } = useReportsLogic();

  const fmtTime = (s) => { const m = Math.floor(s/60); const sec = s%60; return m===0 ? `${sec}s` : `${m}m ${sec}s`; };
  const distTotal = pieData.reduce((a,b)=>a+b.population,0);
  const weekItems = barLabels.map((label, idx) => ({ label, value: barData[idx] || 0 }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.header}>Reports</Text>
            <Text style={styles.headerSubtitle}>See how your focus adds up.</Text>
          </View>
          <Ionicons name="stats-chart" size={22} color={colors.primary} />
        </View>

        {/* View mode toggle – swapped order: Total / Today */}
        <View style={styles.toggleCard}>
          {['Total', 'Today'].map((m) => {
            const active = viewMode === m;
            return (
              <TouchableOpacity
                key={m}
                style={[styles.toggleOption, active && styles.toggleOptionActive]}
                onPress={() => setViewMode(m)}
                activeOpacity={0.85}
              >
                <Text style={[styles.toggleText, active && styles.toggleTextActive]}>{m}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Category breakdown */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Category Breakdown</Text>
          {pieData.length > 0 ? (
            <PieChart
              data={pieData}
              width={screenWidth - 48}
              height={220}
              accessor="population"
              backgroundColor="transparent"
              center={[0,0]}
              chartConfig={chartConfig}
              hasLegend={true}
            />
          ) : <Text style={styles.noData}>No data yet.</Text>}
        </View>

        {/* Key stats */}
        <View style={styles.statsRow}>
          <Card style={styles.statCardBig}>
            <Text style={styles.cardTitle}>Focused Time</Text>
            <Text style={styles.cardValue}>{fmtTime(stats.time)}</Text>
          </Card>
          <Card style={styles.statCardBig}>
            <Text style={styles.cardTitle}>Pauses</Text>
            <Text style={styles.cardValue}>{stats.distractions}</Text>
          </Card>
        </View>

        {/* Weekly chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Weekly Focus (minutes)</Text>
          <BarChart
            data={{ labels: barLabels, datasets: [{ data: barData }] }}
            width={screenWidth - 48}
            height={240}
            yAxisLabel=""
            yAxisSuffix="m"
            chartConfig={chartConfig}
            showValuesOnTopOfBars
            style={styles.graphStyle}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}