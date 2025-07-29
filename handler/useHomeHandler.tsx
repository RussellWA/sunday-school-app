import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../firebaseConfig";

export interface UserInfo {
    email: string;
    fullName: string;
    role: "parent" | "child" | string;
    createdAt: string;
    phone?: string;
}

export interface Child {
    id: string;
    fullName: string;
    dob: string;
};

const useHomeHandler = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [children, setChildren] = useState<Child[]>([]);

    const fetchUser = async () => {
        setLoading(true);
        const user = auth.currentUser;
        try {
            if (!user) return;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) setUserInfo(docSnap.data() as UserInfo);
            
        } catch (e) {
            console.error("Failed to fetch user!");
        } finally {
            setLoading(false);
        }
    };

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
        fetchUser,
        fetchChildren
    }
};

export default useHomeHandler;