import { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { loadSessions, clearData, seedDatabase } from '../services/storage';

export const useHistoryLogic = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchSessions();
    }, [])
  );

  const fetchSessions = async () => {
    const data = await loadSessions();
    const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    setSessions(sorted);
  };

  const grouped = useMemo(() => {
    const byDay = {};
    sessions.forEach((s) => {
      const dayKey = s.date.split('T')[0];
      if (!byDay[dayKey]) byDay[dayKey] = [];
      byDay[dayKey].push(s);
    });
    return Object.keys(byDay)
      .sort((a, b) => new Date(b) - new Date(a))
      .map((day) => {
        const daySessions = byDay[day];
        const duration = daySessions.reduce((a, b) => a + b.duration, 0);
        const distractions = daySessions.reduce((a, b) => a + b.focusLoss, 0);
        return { day, duration, distractions, items: daySessions };
      });
  }, [sessions]);

  const totals = useMemo(() => {
    const duration = sessions.reduce((a, b) => a + b.duration, 0);
    const distractions = sessions.reduce((a, b) => a + b.focusLoss, 0);
    return { duration, distractions, count: sessions.length };
  }, [sessions]);

  const handleClearData = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await clearData();
      await fetchSessions();
      Alert.alert("Temizlendi", "Tüm geçmiş silindi.");
    } catch (e) {
      Alert.alert("Hata", "Silme sırasında sorun oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDemo = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await seedDatabase();
      await fetchSessions();
      Alert.alert("Eklendi", "Örnek veriler yüklendi.");
    } catch (e) {
      Alert.alert("Hata", "Demo veri yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  return { sessions, grouped, totals, refresh: fetchSessions, handleClearData, handleSeedDemo, loading };
};

