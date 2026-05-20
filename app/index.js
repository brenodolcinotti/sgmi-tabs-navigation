import React, { useState } from 'react';
import { 
  View, Text, ScrollView, StyleSheet, Modal, 
  TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import MachineCard from '../components/MachineCard';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMachineName, setAlertMachineName] = useState('');
  const [observacao, setObservacao] = useState('');

  const [machinesUsinagem, setMachinesUsinagem] = useState([
    { id: '1', name: 'Torno CNC - T01', isOperating: true },
    { id: '2', name: 'Fresa Industrial - F03', isOperating: true },
    { id: '3', name: 'Fiasa Industrial - F02', isOperating: true },
    { id: '4', name: 'Liso Industrial - F05', isOperating: true },
  ]);

  const toggleMachine = (id) => {
    const updateList = (list) => list.map(machine => {
      if (machine.id === id) {
        const newState = !machine.isOperating;
        if (id === '1' && newState === false) {
          setAlertMachineName(machine.name);
          setModalVisible(true);
        }
        return { ...machine, isOperating: newState };
      }
      return machine;
    });
    setMachinesUsinagem(updateList(machinesUsinagem));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>SETOR: USINAGEM</Text>
        <View style={styles.grid}>
          {machinesUsinagem.map(machine => (
            <MachineCard 
              key={machine.id} 
              name={machine.name} 
              isOperating={machine.isOperating} 
              onToggle={() => toggleMachine(machine.id)} 
            />
          ))}
        </View>
      </ScrollView>

      {/* Alerta de Manutenção */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.modalTitle}>ALERTA DE MANUTENÇÃO</Text>
              <Text style={styles.modalDescription}>Máquina {alertMachineName} requer inspeção preventiva.</Text>
              
              <TextInput 
                style={styles.modalInput} 
                value={observacao} 
                onChangeText={setObservacao} 
                placeholder="Insira as observações..." 
              />
              
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.btnConfirm} onPress={() => setModalVisible(false)}>
                  <Text style={styles.btnText}>CONFIRMAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnIgnore} onPress={() => setModalVisible(false)}>
                  <Text style={styles.btnText}>IGNORAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 15 },
  sectionTitle: { fontSize: 18, color: '#333', marginBottom: 10, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#ffffff', borderRadius: 12, padding: 20, alignItems: 'center' },
  warningIcon: { fontSize: 50, marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#003366', marginBottom: 10 },
  modalDescription: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
  modalInput: { width: '100%', borderWidth: 1, borderColor: '#005499', borderRadius: 8, padding: 10, marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  btnConfirm: { backgroundColor: '#005499', paddingVertical: 12, borderRadius: 6, flex: 1, marginRight: 10, alignItems: 'center' },
  btnIgnore: { backgroundColor: '#888888', paddingVertical: 12, borderRadius: 6, flex: 0.8, alignItems: 'center' },
  btnText: { color: '#ffffff', fontWeight: 'bold' }
});