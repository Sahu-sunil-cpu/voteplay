

import {signIn, useSession, signOut} from "next-auth/react"

import {  Radio } from "lucide-react"
import Link from "next/link"





export function navbar(){
    const session = useSession();


    return(
        <>
         <header className="px-4 lg:px-6 h-16 flex items-center border-b border-white/10 bg-black/20 backdrop-blur-md">
        <Link className="flex items-center justify-center" href="#">
          <Radio className="h-8 w-8 mr-2 text-yellow-400" />
          <span className="font-bold text-2xl text-yellow-400">VotePlay</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-yellow-400 transition-colors" href="#">
            How It Works
          </Link>
          <Link className="text-sm font-medium hover:text-yellow-400 transition-colors" href="#">
            Top Songs
          </Link>
          <Link className="text-sm font-medium hover:text-yellow-400 transition-colors" href="#">
            For Artists
          </Link>
         {session.data?.user &&  <Link className="text-sm font-medium hover:text-yellow-400 transition-colors" href="#"  onClick={() => signOut()}>
            Logout
          </Link>}
        { !session.data?.user && <Link className="text-sm font-medium hover:text-yellow-400 transition-colors" href="#"  onClick={() => signIn()}>
            Login
          </Link>}
          {/* <div >
            {session.data?.user &&  <button className="bg-orange-300 m-3 p-3 rounded-lg" onClick={() => signOut()}>Logout</button>}
            {!session.data?.user &&  <button className="bg-orange-300 m-3 p-3 rounded-lg" onClick={() => signIn()}>Signin</button>}

        </div> */}
        </nav>
      </header>
        </>
    )
}