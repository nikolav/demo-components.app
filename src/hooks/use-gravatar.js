import { useEffect } from "react";
import { paste, md5 } from "../util";
import { useGravatars } from "../../app/providers/GravatarsProvider";
import { useAuth } from "../../app/store/slice-auth";
import { dbRealtime as db } from "../../firebase";
import { ref, set } from "firebase/database";
import { useWindowDocument } from "./use-window";
//
// https://www.gravatar.com/avatar/6621adb9b4f1ee95b68259a2553ac3ab?d=robohash&size=92
// d=monsterid|wavatar|robohash
//
export const DEFAULT_GRAVATAR_SIZE = 64;
//
export const GRAVATAR_BASEURL = "https://www.gravatar.com/avatar";
//
export default function useGravatar(size = DEFAULT_GRAVATAR_SIZE) {
  const { isMounted } = useWindowDocument();
  const { auth } = useAuth();
  const gravatarsDB = useGravatars();
  //
  const UID = auth?.uid;
  const gravatar = gravatarsDB[UID];
  const refGID = ref(db, `gravatar/${UID}`);
  //
  const generateDefaultGravatar_ = () =>
    UID &&
    set(refGID, {
      enabled: false,
      src: null,
    });
  const enabled_ = () => true === gravatar?.enabled;
  //
  useEffect(() => {
    if (isMounted && UID && !gravatar) {
      generateDefaultGravatar_();
    }
  }, [isMounted]);
  //
  return paste(() => (enabled_() ? gravatar?.src : null), {
    db: { ...gravatarsDB },
    enabled: enabled_,
    enable: (enabled = true) =>
      UID &&
      set(refGID, {
        ...(true === enabled && !gravatar?.src
          ? { src: generateGravatar_(size) }
          : gravatar),
        enabled,
      }),
    generate: () =>
      UID &&
      set(refGID, {
        ...gravatar,
        src: generateGravatar_(size),
      }),
  });
}

function generateGravatar_(size) {
  return `${GRAVATAR_BASEURL}/${md5(emailRand_())}?d=${
    ["monsterid", "wavatar", "robohash"][Math.floor(Math.random() * 3)]
  }&size=${parseInt(size, 10)}`;
}
function emailRand_() {
  return `g${Date.now()}@gravatar.com`;
}
