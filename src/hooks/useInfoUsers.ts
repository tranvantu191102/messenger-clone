import { useEffect, useState } from "react";
import {
  getDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const useInfoUsers = (usersId: string[]) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<DocumentSnapshot<DocumentData>[] | null>();

  useEffect(() => {
    try {
      const getInfoUsers = async () => {
        setLoading(true);
        const response = await Promise.all(
          usersId?.map(async (userId) => {
            const res = await getDoc(doc(db, "users", userId));
            return res;
          })
        );
        setData(response);
        setLoading(false);
      };

      getInfoUsers();
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  }, [JSON.stringify(usersId)]);

  return { loading, data, error };
};
