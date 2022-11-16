import {
  DocumentData,
  DocumentSnapshot,
  DocumentReference,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export const useQueryDocument = (
  document: DocumentReference<DocumentData>,
  key: string
) => {
  const [data, setData] = useState<DocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      document,
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
  }, [key]);

  return { data, loading, error };
};
