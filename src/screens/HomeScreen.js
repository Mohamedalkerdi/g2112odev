import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// Logic & Components
import { useHomeLogic } from '../hooks/useHomeLogic';
import { homeStyles as styles } from '../styles/homeStyles';
import { colors } from '../styles/colors';
import Card from '../components/Card';
import AppButton from '../components/AppButton';

export default function HomeScreen() {
  const {
    timeLeft, initialTime, isActive, focusLoss, mode,
    category, categories, timeOptions, setCategory,
    toggleTimer, resetTimer, changeDuration, saveCurrentSession,
    addCategory, addTimer, deleteItem
  } = useHomeLogic();

  // Modal State (View only state)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('category');
  const [inputText, setInputText] = useState('');
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [selectorType, setSelectorType] = useState('category');
  const pulse = useRef(new Animated.Value(0)).current;
  const pulseLoop = useRef(null);

  const handleStart = () => {
    if (!isActive) toggleTimer();
  };

  const handlePause = () => {
    if (isActive) toggleTimer();
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  useEffect(() => {
    if (isActive) {
      pulseLoop.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 0, duration: 1200, useNativeDriver: true }),
        ])
      );
      pulseLoop.current.start();
    } else {
      pulseLoop.current?.stop();
      pulse.setValue(0);
    }
    return () => pulseLoop.current?.stop();
  }, [isActive]);

  const handleAdd = () => {
    if (!inputText.trim()) return;
    if (modalType === 'category') addCategory(inputText.trim());
    else addTimer(parseInt(inputText));
    setModalVisible(false); setInputText('');
  };

  const openSelector = (type) => {
    setSelectorType(type);
    setSelectorVisible(true);
  };

  const progress = initialTime ? Math.min(1, Math.max(0, (initialTime - timeLeft) / initialTime)) : 0;
  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.15, 0.35] });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Pomodoro Timer</Text>
        <Text style={styles.subtitle}>Stay in flow, track distractions,celebrate wins.</Text>

        {/* Category Picker */}
        <TouchableOpacity style={styles.selector} onPress={() => openSelector('category')} disabled={mode !== 'idle'}>
          <View style={styles.selectorTextWrap}>
            <Text style={styles.selectorLabel}>Kategori</Text>
            <Text style={styles.selectorValue}>{category}</Text>
          </View>
          <Ionicons name="chevron-down" size={18} color={colors.subtext} />
        </TouchableOpacity>

        {/* Timer Display */}
        <View style={styles.timerContainer}>
          <View style={styles.timerOuter}>
            {isActive && (
              <Animated.View style={[styles.glowRing, { opacity: pulseOpacity, transform: [{ scale: pulseScale }] }]} />
            )}
            <View style={[styles.timerCircle, isActive && styles.timerCircleActive]}>
              <View style={styles.timerTextWrap}>
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.progressWrap}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.progressLabel}>{Math.round(progress * 100)}% complete</Text>
          </View>
        </View>

        {/* Status pill */}
        <View style={styles.statusPillContainer}>
          <View style={styles.statusPill}>
            <Text style={styles.statusText}>
              {mode === 'running' ? 'FOCUSING' : mode === 'idle' ? 'READY' : 'PAUSED'}
            </Text>
          </View>
        </View>

        {/* Time Picker */}
        {mode === 'idle' && (
          <TouchableOpacity style={styles.selector} onPress={() => openSelector('time')}>
            <View style={styles.selectorTextWrap}>
              <Text style={styles.selectorLabel}>Süre</Text>
              <Text style={styles.selectorValue}>{Math.round(initialTime/60)} dakika</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={colors.subtext} />
          </TouchableOpacity>
        )}

        {/* Stats (Active) */}
        {mode !== 'idle' && (
          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <Ionicons name="alert-circle-outline" size={18} color={colors.background} />
              <Text style={styles.statLabel}>Dikkat Dağınıklığı</Text>
            </View>
            <View style={styles.statChip}>
              <Text style={styles.statChipText}>{focusLoss}</Text>
            </View>
          </View>
        )}

        {/* Controls – Başlat/Duraklat + Sıfırla */}
        {mode !== 'summary' && (
          <View style={styles.btnColumn}>
            <AppButton
              title={isActive ? 'Duraklat' : 'Başlat'}
              onPress={isActive ? handlePause : handleStart}
              icon={isActive ? 'pause' : 'play'}
              color={colors.primary}
              style={{ width: '100%' }}
            />
            <AppButton
              title="Sıfırla"
              onPress={resetTimer}
              icon="refresh"
              color={colors.danger}
              style={{ width: '100%' }}
            />
          </View>
        )}

        {/* Summary Card */}
        {(mode === 'paused' || mode === 'summary') && (
          <View style={styles.summaryContainer}>
            <Card style={{ width: '100%' }}>
              <Text style={styles.summaryTitle}>{mode === 'summary' ? 'Session Complete' : 'Paused'}</Text>
              <View style={styles.divider} />
              <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Category</Text><Text style={styles.summaryValue}>{category}</Text></View>
              <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Time</Text><Text style={styles.summaryValue}>{formatTime(initialTime - timeLeft)}</Text></View>
              <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Distractions</Text><Text style={styles.summaryValue}>{focusLoss}</Text></View>
              <View style={styles.summaryBtnRow}>
                <AppButton title="Discard" onPress={resetTimer} icon="trash-outline" color={colors.danger} outline style={{ flex: 1 }} />
                <AppButton title="Save" onPress={saveCurrentSession} icon="checkmark-circle" color={colors.success} style={{ flex: 1 }} />
              </View>
            </Card>
          </View>
        )}

        <View style={{height:50}} />
        
        {/* Simple Modal */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add {modalType === 'category' ? 'Category' : 'Timer'}</Text>
              <TextInput style={styles.input} placeholder={modalType === 'category' ? "Name..." : "Minutes..."} 
                placeholderTextColor={colors.subtext}
                keyboardType={modalType === 'timer' ? 'numeric' : 'default'} onChangeText={setInputText} autoFocus />
              <View style={styles.modalBtns}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{padding:10, marginRight:10}}><Text>Cancel</Text></TouchableOpacity>
                <AppButton title="Add" onPress={handleAdd} style={{height:40}} />
              </View>
            </View>
          </View>
        </Modal>

        {/* Selector Modal */}
        <Modal visible={selectorVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.selectContent}>
              <Text style={styles.modalTitle}>{selectorType === 'category' ? 'Kategori Seç' : 'Süre Seç'}</Text>
              <ScrollView style={{ maxHeight: 260 }}>
                {(selectorType === 'category' ? categories : timeOptions).map((item, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.optionRow}
                    onPress={() => {
                      if (selectorType === 'category') { setCategory(item); }
                      else { changeDuration(item); }
                      Haptics.selectionAsync();
                      setSelectorVisible(false);
                    }}
                    onLongPress={() => {
                      if (selectorType === 'category') deleteItem(item, 'cat', ['Study','Coding','Reading']);
                      else deleteItem(item, 'time', [15,25,45,60]);
                    }}
                    disabled={mode !== 'idle'}
                  >
                    <Text style={styles.optionText}>{selectorType === 'category' ? item : `${item} dakika`}</Text>
                    {(selectorType === 'category' ? category === item : initialTime === item*60) && (
                      <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  style={[styles.optionRow, styles.optionAdd]}
                  onPress={() => { setSelectorVisible(false); setModalType(selectorType === 'category' ? 'category' : 'timer'); setModalVisible(true); }}
                  disabled={mode !== 'idle'}
                >
                  <Ionicons name="add" size={18} color={colors.accent} />
                  <Text style={[styles.optionText, { color: colors.accent }]}>Yeni ekle</Text>
                </TouchableOpacity>
              </ScrollView>
              <View style={styles.modalBtns}>
                <TouchableOpacity onPress={() => setSelectorVisible(false)} style={{padding:10, marginRight:10}}>
                  <Text style={{ color: colors.text }}>Kapat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
} //homepage