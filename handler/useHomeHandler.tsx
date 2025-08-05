import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { Child } from "../types/Child";
import { onAuthStateChanged } from "firebase/auth";
import { UserInfo } from "../types/User";

const useHomeHandler = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [children, setChildren] = useState<Child[]>([]);
    const [authChecked, setAuthChecked] = useState(false);
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) setUserInfo(docSnap.data() as UserInfo);
            }
            else setUserInfo(null);
            setAuthChecked(true);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const fetchChildren = async () => {
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) return;
            
            const q = query(collection(db, "children"), where("parentId", "==", user.uid));
            const snapshot = await getDocs(q);

            const result: Child[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as Omit<Child, "id">),
            }));
            setChildren(result);
        } catch (e) {
            console.error("Error fetching children:", e);
        } finally {
            setLoading(false);
        }
    };

    return {
        userInfo,
        loading,
        children,
        authChecked,
        fetchChildren
    }
};

export default useHomeHandler;