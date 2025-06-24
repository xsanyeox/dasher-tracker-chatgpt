import React, { useState } from 'react';
import { View, Text, Button, ScrollView, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rollingLimit = 100;

export default function App() {
  const [ratings, setRatings] = useState({ 1: [], 2: [], 3: [], 4: [], 5: [] });
  const [acceptance, setAcceptance] = useState([]);
  const [completion, setCompletion] = useState([]);
  const [ontime, setOntime] = useState([]);
  const theme = useColorScheme();

  const addRating = (star) => {
    const updated = [...ratings[star], new Date().toISOString()];
    if (updated.length > rollingLimit) updated.shift();
    setRatings((prev) => ({ ...prev, [star]: updated }));
  };

  const addStat = (type, val, setter) => {
    const updated = [...type, val];
    if (updated.length > rollingLimit) updated.shift();
    setter(updated);
  };

  const percentage = (arr, val) => {
    const count = arr.filter(x => x === val).length;
    return `${((count / arr.length) * 100).toFixed(1)}%`;
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : '#fff', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000' }}>Dasher Tracker</Text>

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Ratings (last 100)</Text>
      {[1, 2, 3, 4, 5].map((star) => (
        <View key={star} style={{ marginVertical: 5 }}>
          <Button title={`+ ${star} Star`} onPress={() => addRating(star)} />
          <Text>{ratings[star].length} ratings</Text>
        </View>
      ))}

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Acceptance</Text>
      <Button title="Accepted" onPress={() => addStat(acceptance, 'accepted', setAcceptance)} />
      <Button title="Declined" onPress={() => addStat(acceptance, 'declined', setAcceptance)} />
      <Text>{percentage(acceptance, 'accepted')} accepted ({acceptance.length}/100)</Text>

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Completion</Text>
      <Button title="Completed" onPress={() => addStat(completion, 'completed', setCompletion)} />
      <Button title="Unassigned" onPress={() => addStat(completion, 'unassigned', setCompletion)} />
      <Text>{percentage(completion, 'completed')} completed ({completion.length}/100)</Text>

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>On-Time</Text>
      <Button title="On Time" onPress={() => addStat(ontime, 'on_time', setOntime)} />
      <Button title="Late" onPress={() => addStat(ontime, 'late', setOntime)} />
      <Text>{percentage(ontime, 'on_time')} on-time ({ontime.length}/100)</Text>
    </ScrollView>
  );
}