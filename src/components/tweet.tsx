import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import EditTweetForm from "./edit-tweet-form";
import { ITweet } from "./timeline";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const Column = styled.div`
  &:last-child {
    place-self: end;
  }
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: #ffffff;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 400;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled.label`
  color: #1d9bf0;
  font-weight: 400;
  border: 1px solid #1d9bf0;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const TweetWrapper = styled.div`
  display: grid;
  /* grid-template-columns: 4fr 1fr; */
  padding: 10px 0px;
  border-radius: 15px;
`;

export default function Tweet({ userName, photo, tweet, userId, id }: ITweet) {
  const [isEditing, setIsEditing] = useState(false);
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("이 트윗을 삭제하시겠습니까?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <Column>
        <Username>{userName}</Username>
        {isEditing ? (
          <TweetWrapper>
            <EditTweetForm
              tweet={tweet}
              photo={photo}
              id={id}
              setIsEditing={setIsEditing}
            />
          </TweetWrapper>
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId ? (
          <BtnWrapper>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
          </BtnWrapper>
        ) : null}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
