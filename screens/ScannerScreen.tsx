import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraView, Camera } from 'expo-camera';

const ScannerScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarcodeScanned = (event: { data: string; type: string }) => {
    if (!scanned) {
      setScanned(true);
      setQrData(event.data);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission…</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!scanned && (
        <CameraView
          ref={(ref) => { cameraRef.current = ref; }}
          style={styles.camera}
          facing="back"
          ratio="16:9"
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        />
      )}
      <View style={styles.overlay}>
        {scanned ? (
          <>
            <Text style={styles.text}>QR Data: {qrData}</Text>
            <Text style={styles.text} onPress={() => { setScanned(false); setQrData(null); }}>
              Tap to scan again
            </Text>
          </>
        ) : (
          <Text style={styles.text}>Camera Preview</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default ScannerScreen;
