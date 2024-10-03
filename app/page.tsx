"use client"

import Image from "next/image";
import { Appbar } from "./components/Redirect";
import { useState } from "react";
import { VoteMusicStreamLanding } from "./components/Landing";
import useRedirect from "./hooks/useRedirect";
export default function Home() {
  const [cordinates, setCordinates] = useState({});
  return (
   <>
   {/* <Appbar  /> */}

  <VoteMusicStreamLanding/>
   </>
  );
}
