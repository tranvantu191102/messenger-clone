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
