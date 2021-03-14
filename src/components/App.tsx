import { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import styled from "styled-components";
import GlobalStyles from "components/GlobalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;
const Loader = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 200px 0px;
  color: #289ae2;
`;
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
      <Container>
        {init ? (
          <AppRouter
            isLoggedIn={Boolean(userObj)}
            userObj={userObj}
            refreshUser={refreshUser}
          />
        ) : (
          <Loader>
            <FontAwesomeIcon icon={faTwitter} spin={true} size="4x" />
          </Loader>
        )}
        <Footer>&copy; {new Date().getFullYear()} Jwitter</Footer>
      </Container>
      <GlobalStyles />
    </>
  );
};

export default App;
