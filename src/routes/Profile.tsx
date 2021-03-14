import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "fbase";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
`;
const Form = styled.form`
  border: 1px solid rgb(255, 255, 255);
  padding: 10px 5px;
  border-radius: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
const InputText = styled.input`
  width: 105px;
  cursor: text;
  color: rgb(100, 100, 100);
  padding: 10px;
  font-size: 16px;
`;
const Submit = styled.input`
  border-radius: 20px;
  background-color: #289ae2;
  text-align: center;
  padding: 10px;
  margin-right: 10px;
`;
const Button = styled.button`
  padding: 10px;
  border-radius: 20px;
  background-color: tomato;
  text-align: center;
  padding: 10px;
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;
const Item = styled.li`
  border: 1px solid rgb(255, 255, 255);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

interface IProps {
  userObj: UserObj;
  refreshUser: () => void;
}

const Profile = ({ userObj, refreshUser }: IProps) => {
  const [newDisplayName, setNewDisplayName] = useState<string>(
    userObj.displayName || ""
  );
  const [jweetList, setJweetList] = useState<JweetObj[]>([]);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userObj.displayName === newDisplayName) return;
    await userObj.updateProfile(newDisplayName);
    alert(`Your name has been changed to ${newDisplayName} :)`);
    refreshUser();
  };

  const getMyJweets = async () => {
    const jweets = await dbService
      .collection("jweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();
    const jweetArray: JweetObj[] = [];
    jweets.docs.forEach((doc) => {
      jweetArray.push({ id: userObj.uid, ...doc.data() } as JweetObj);
    });
    setJweetList(jweetArray);
  };
  useEffect(() => {
    getMyJweets();
  }, []);
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <InputText
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <Submit type="submit" value="Update Profile" />
        <Button onClick={onLogOutClick}>Log Out</Button>
        {/* <Button onClick={onDeleteClick}>Delete My Count</Button> */}
      </Form>
      <List>
        {jweetList &&
          jweetList.length > 0 &&
          jweetList.map((jweet, index) => (
            <Item key={index}>{jweet.text}</Item>
          ))}
      </List>
    </Container>
  );
};

export default Profile;
