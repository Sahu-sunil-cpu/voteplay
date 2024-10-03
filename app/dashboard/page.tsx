"use client"

import StreamView from '@/app/components/StreamView'
import {useSession} from "next-auth/react";
import useRedirect from '@/app/hooks/useRedirect';

export default function dashboard(){
  const session = useSession();
  const redirect = useRedirect();
  console.log(session)
try{
    if(!session.data?.user.id){
        return (
            <h1>Please login.....</h1>
        )
    }


    return(
        <>
         <StreamView creatorId={session.data.user.id}  />
        </>
    )

}catch(e){
    return null;
}


}

export const dynamic = 'auto'