import AppRouter from "components/Router";
import { authService } from "fbase";
import { useState, useEffect } from "react";

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<UserObj | null>(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setUserObj(
        user
          ? {
              displayName: user.displayName,
              uid: user.uid,
              updateProfile: (displayName: string) =>
                user.updateProfile({ displayName }),
            }
          : null
      );
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    if (!user) return;
    setUserObj({
      displayName: user.displayName || null,
      uid: user.uid,
      updateProfile: (displayName: string) =>
        user.updateProfile({ displayName }),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
};

export default App;
