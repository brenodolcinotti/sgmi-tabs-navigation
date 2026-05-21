import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: '#005499' },
      headerTintColor: '#fff',
      tabBarActiveTintColor: '#005499',
    }}>
      <Tabs.Screen name="index" options={{ title: 'Monitoramento', tabBarLabel: 'Painel' }} />
      <Tabs.Screen name="manutencao" options={{ title: 'Manutenção', tabBarLabel: 'Ordens' }} />
      <Tabs.Screen name="perfil" options={{ title: 'Meu Perfil', tabBarLabel: 'Perfil' }} />
    </Tabs>
  );
}