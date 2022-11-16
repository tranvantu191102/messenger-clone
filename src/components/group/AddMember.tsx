import { FC } from "react";
import { ConversationInfo } from "../../shared/types";
import { useQueryCollection } from "../../hooks/useQueryCollection";
import { db } from "../../firebase/config";
import { query, collection, where } from "firebase/firestore";

interface AddMemberProps {
  conversationInfo: ConversationInfo;
  conversationId: string;
}

const AddMember: FC<AddMemberProps> = ({
  conversationInfo,
  conversationId,
}) => {
  const { loading, data } = useQueryCollection(
    query(
      collection(db, "users"),
      where(
        "uid",
        "not-in",
        conversationInfo?.users?.length > 10
          ? conversationInfo?.users?.slice(0, 10)
          : conversationInfo?.users
      )
    )
  );

  console.log(data);

  return <div className="py-3 px-5 h-[60vh] overflow-y-auto"></div>;
};

export default AddMember;
