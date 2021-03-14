import Jweet from "components/Jweet";
import JweetFactory from "components/JweetFactory";
import { dbService } from "fbase";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface IProps {
  userObj: UserObj;
}
const Container = styled.div`
  margin-top: 20px;
  height: 100%;
`;

const Home = ({ userObj }: IProps) => {
  const [jweets, setJweets] = useState<JweetObj[]>([]);

  useEffect(() => {
    dbService
      .collection("jweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const jweetArray: JweetObj[] = [];
        snapshot.docs.forEach((doc) => {
          const jweetData = {
            id: doc.id,
            ...doc.data(),
          } as JweetObj;
          jweetArray.push(jweetData);
        });
        setJweets(jweetArray);
      });
  }, []);

  return (
    <Container>
      <JweetFactory userObj={userObj} />
      {jweets.map((jweet) => (
        <Jweet
          key={jweet.id}
          jweetObj={jweet}
          isOwner={jweet.creatorId === userObj.uid}
        />
      ))}
    </Container>
  );
};

export default Home;
