import { doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import {
  AttachFileButton,
  AttachFileInput,
  Form,
  SubmitBtn,
  TextArea,
} from "./styled/tweet-form-styled";

export default function EditTweetForm(props: any) {
  const [isLoading, setLoading] = useState(false);
  const [editTweet, setEditTweet] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e?.target;
    if (files && files.length === 1) {
      setEditFile(files[0]);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || editTweet === "" || editTweet.length > 180)
      return;

    try {
      setLoading(true);
      const tweetRef = doc(db, "tweets", props.id);
      await updateDoc(tweetRef, {
        tweet: editTweet,
      });

      if (editFile) {
        if (props.photo) {
          const originRef = ref(storage, `tweets/${user.uid}/${props.id}`);
          await deleteObject(originRef);
        }

        const locationRef = ref(storage, `tweets/${user.uid}/${props.id}`);
        const result = await uploadBytes(locationRef, editFile);
        const url = await getDownloadURL(result.ref);

        await updateDoc(tweetRef, {
          photo: url,
        });
      }

      setEditTweet("");
      setEditFile(null);
      props.setIsEditing(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        onChange={onChange}
        value={editTweet}
        maxLength={180}
        rows={5}
        required
        defaultValue={props.tweet}
      />
      <AttachFileButton htmlFor={`editFile${props.id}`}>
        {editFile
          ? "Photo Edited ✅"
          : props.photo
          ? "Change Photo? ♻️"
          : "Add Photo"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id={`editFile${props.id}`}
        accept="image/*"
      />
      <SubmitBtn
        type="submit"
        value={isLoading ? "Editing..." : "Edit Tweet"}
      />
    </Form>
  );
}
