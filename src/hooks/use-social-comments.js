import { useEffect, useState } from "react";
import { firebase } from "../../app/services";
// import { dbRealtime as db } from "../../firebase";
import { onValue, set, ref, push, remove } from "firebase/database";
import { sortByTimestampDesc, paste } from "../util";

//
const { dbRealtime: db } = firebase;
//
const CREATED_AT = "_@";
//@@@
const useSocialComments = (entityId) => {
  //
  const dbPath = `comments/${entityId}`;
  const refComments = ref(db, dbPath);
  //
  const [commentsDB, setCommentsDB] = useState({});
  //
  const handle = paste(() => commentsDB, {
    // { uid: ID, user: string, comment: string }
    add: (comment = {}) => {
      const refNewComment = push(refComments);
      set(refNewComment, {
        key: refNewComment.key,
        [CREATED_AT]: Date.now(),
        ...comment,
      });
    },
    //
    rm: (key) =>
      remove(ref(db, `${dbPath}/${key}`)).then(
        (_) => 1 === Object.keys(commentsDB).length && setCommentsDB({})
      ),
    //
    ls: () =>
      Object.keys(commentsDB)
        .map((key) => commentsDB[key])
        .sort(sortByTimestampDesc(CREATED_AT)),
    //
    len: () => Object.keys(commentsDB).length,
  });
  //
  useEffect(
    () =>
      onValue(refComments, (res) =>
        setCommentsDB((current) => res.val() ?? current)
      ),
    []
  );
  //
  return handle;
  //
};

export default useSocialComments;
