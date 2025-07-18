import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Toaster } from 'sonner-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MockModeProvider } from './contexts/MockModeContext';
import { useEffect } from 'react';
import { startMonitoring, stopMonitoring } from './services/debug/NetworkMonitor';
import HomeScreen from "./screens/HomeScreen"
import DevicesScreen from "./screens/DevicesScreen"
import DeviceSelectionScreen from "./screens/DeviceSelectionScreen"
import DeviceControlScreen from "./screens/DeviceControlScreen"
import DeviceTrafficScreen from "./screens/DeviceTrafficScreen"
import SettingsScreen from "./screens/SettingsScreen"
import WifiConfigurationScreen from "./screens/wifi/WifiConfigurationScreen"
import NetworkConfigurationScreen from "./screens/network/NetworkConfigurationScreen"
import PortForwardingScreen from "./screens/firewall/PortForwardingScreen"
import DiagnosticsScreen from "./screens/diagnostics/DiagnosticsScreen"

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Devices" component={DevicesScreen} />
      <Stack.Screen name="DeviceSelection" component={DeviceSelectionScreen} />
      <Stack.Screen name="DeviceControl" component={DeviceControlScreen} />
      <Stack.Screen name="DeviceTraffic" component={DeviceTrafficScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="WifiConfiguration" component={WifiConfigurationScreen} />
      <Stack.Screen name="NetworkConfiguration" component={NetworkConfigurationScreen} />
      <Stack.Screen name="PortForwarding" component={PortForwardingScreen} />
      <Stack.Screen name="Diagnostics" component={DiagnosticsScreen} />
    </Stack.Navigator>
  );
}

const App: React.FC = () => {
  useEffect(() => {
    // Start network monitoring when app starts
    startMonitoring();

    // Stop monitoring when app unmounts
    return () => {
      stopMonitoring();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <MockModeProvider>
          <View style={styles.container}>
            <Toaster />
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
          </View>
        </MockModeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none"
  }
});