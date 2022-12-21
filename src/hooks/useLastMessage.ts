import {
  QuerySnapshot,
  DocumentData,
  onSnapshot,
  query,
  orderBy,
  where,
  limitToLast,
  limit,
  collection,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";

export const useLastMessage = (conversationId: string) => {
  const [data, setData] = useState<QuerySnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "conversations", conversationId, "messages"),
        // where("users", "array-contains", currentUser?.uid),
        orderBy("createdAt", "desc"),
        limit(1)
      ),
      (snapshot) => {
        setData(snapshot);
        setLoading(false);
        setError(false);
      },
      (error) => {
        console.log(error);
        setLoading(false);
        setData(null);
        setError(true);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [conversationId]);

  return { data, loading, error };
};
