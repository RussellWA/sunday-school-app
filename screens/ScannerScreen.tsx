import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraView, Camera } from 'expo-camera';

const ScannerScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const [scanTime, setScanTime] = useState<string | null>(null); 
  const [qrTime, setQrTime] = useState<string | null>(null); //time of the qr scanned / class
  const [timingStatus, setTimingStatus] = useState<string | null>(null); //status of class


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

      let parsedTime: string | null = null;
      try {
        const parsed = JSON.parse(event.data);
        parsedTime = parsed.time ?? null;
        setQrTime(parsedTime);
      } catch {
        setQrTime(null);
      }

      const now = new Date();
      const indoTime = now.toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      setScanTime(indoTime);

      // Compare times if both are available
      if (parsedTime) {
        // Convert both times to Date objects for comparison
        // Assume parsedTime is "HH:mm" or "HH AM/PM"
        let qrDate, scanDate;
        try {
          // Use today's date for both
          const today = now.toISOString().split('T')[0];
          // Try to parse "HH:mm" or "HH AM/PM"
          // If "HH:mm"
          if (/^\d{2}:\d{2}$/.test(parsedTime)) {
            qrDate = new Date(`${today}T${parsedTime}:00`);
          } else {
            // If "HH AM/PM"
            qrDate = new Date(`${today} ${parsedTime}`);
          }
          // For scanDate, use the current time
          scanDate = now;
          if (qrDate < scanDate) {
            setTimingStatus("early");
          } else {
            setTimingStatus("late");
          }
        } catch {
          setTimingStatus(null);
        }
      }
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
            <Text style={styles.text}>Waktu Scan: {scanTime}</Text>
            <Text style={styles.text}>Time from QR: {qrTime ?? "N/A"}</Text>
            <Text style={styles.text}>
              {timingStatus === "early" && "early"}
              {timingStatus === "late" && "late"}
            </Text>
            <Text style={styles.text} onPress={() => { setScanned(false); setQrData(null); setScanTime(null); setQrTime(null); setTimingStatus(null); }}>
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
