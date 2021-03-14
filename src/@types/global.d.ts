declare global {
  interface UserObj {
    displayName: string | null;
    uid: string;
    updateProfile: (name: string) => Promise<void>;
  }
  interface JweetObj {
    id?: string;
    text: string;
    createdAt: number;
    creatorId: string;
    creatorName: string;
    attachmentUrl?: string;
  }
}

export {};
