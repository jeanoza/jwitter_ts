declare global {
  interface UserObj {
    displayName: string | null;
    uid: string;
    updateProfile: (name: string) => Promise<void>;
  }
}

export {};
