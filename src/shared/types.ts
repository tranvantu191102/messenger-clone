export interface UserInfo {
  email: string;
  phoneNumber: string | null;
  uid: string;
  photoURL: string | null;
  displayName: string;
}

export interface ConversationInfo {
  users: string[];
  group?: {
    admin: string[];
    groupName: null | string;
    groupImage: null | string;
  };
  updateAt: {
    seconds: number;
    nanaseconds: number;
  };
  theme: string;
}

export interface MessageInfo {
  id?: string;
  sender: string;
  type: "text" | "image" | "file" | "sticker" | "removed";
  content: string;
  replyTo?: string;
  file?: {
    name: string;
    size: number;
  };
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  reactions: {
    [key: string]: number;
  };
}
