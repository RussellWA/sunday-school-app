import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ScannerScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);
  const [scanTime, setScanTime] = useState<string | null>(null); 
  const [qrTime, setQrTime] = useState<string | null>(null); //time of the qr scanned / class
  const [timingStatus, setTimingStatus] = useState<string | null>(null); //status of class
  const [childID, setChildID] = useState<string | null>(null); //id of child scanned
  const [fullName, setFullName] = useState<string | null>(null); //name of child scanned


  const sampleDate = new Date();
  sampleDate.setHours(5, 0, 0, 0); // Set to 5:00 AM local time


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  type ChildData = {
    id: string;
    points?: number;
    [key: string]: any;
  };

  const fetchChildByID = async (id: string): Promise<ChildData | null> => {
    try {
      const docRef = doc(db, "children", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docRef.id, ...docSnap.data() } as ChildData; // include doc id for update
      } else {
        return null; // No such document
      }
    } catch (error) {
      console.error("Error fetching child:", error);
      return null;
    }
  };

const handleBarcodeScanned = async (event: { data: string; type: string }) => {
  if (!scanned) {
    setScanned(true);
    setQrData(event.data);

    let parsedTime: string | null = null;
    let parsedChildID: string | null = null;
    let parsedFullName: string | null = null;
    try {
      const parsed = JSON.parse(event.data);
      parsedTime = parsed.time ?? null;
      parsedChildID = parsed.childId ?? null;
      parsedFullName = parsed.fullName ?? null;
      setQrTime(parsedTime);
      setChildID(parsedChildID);
      setFullName(parsedFullName);

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
        let qrDate, scanDate;
        try {
          const today = now.toISOString().split('T')[0];
          if (/^\d{2}:\d{2}$/.test(parsedTime)) {
            qrDate = new Date(`${today}T${parsedTime}:00`);
          } else {
            qrDate = new Date(`${today} ${parsedTime}`);
          }
          scanDate = now;
          if (qrDate < scanDate) {
            setTimingStatus("early");
            if (parsedChildID) {
              const childData = await fetchChildByID(parsedChildID);
              if (childData) {
                const newPoints = (childData.points ?? 0) + 5;
                await updateDoc(doc(db, "children", parsedChildID), { points: newPoints });
                console.log("Added 5 points for being early.");
              }
            }
          } else {
            setTimingStatus("late");
            // If late, add 5 points
          }
        } catch {
          setTimingStatus(null);
        }
      }
    } catch {
      setQrTime(null);
      setChildID(null);
      setFullName(null);
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
            <Text style={styles.text}>Waktu Scan: {scanTime}</Text>
            <Text style={styles.text}>Time from QR: {qrTime ?? "N/A"}</Text>
            <Text style={styles.text}>Child ID: {childID ?? "N/A"}</Text>
            <Text style={styles.text}>Full Name: {fullName ?? "N/A"}</Text>
            <Text style={styles.text}>
              {timingStatus === "early" && "early"}
              {timingStatus === "late" && "late"}
            </Text>
            <Text style={styles.text} onPress={() => { setScanned(false); setQrData(null); setScanTime(null); setQrTime(null); setTimingStatus(null); setChildID(null); setFullName(null); }}>
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
