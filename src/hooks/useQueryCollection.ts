import {
  CollectionReference,
  QuerySnapshot,
  DocumentData,
  Query,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export const useQueryCollection = (
  collection: CollectionReference | Query<DocumentData>
) => {
  const [data, setData] = useState<QuerySnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection,
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
  }, []);

  return { data, loading, error };
};
