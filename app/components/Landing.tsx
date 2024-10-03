"use client"

import {signIn, useSession, signOut} from "next-auth/react"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Music, Play, ThumbsUp, Users, BarChart, Radio, Headphones } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import{ Redirect, Appbar} from "./Redirect"
import useRedirect from "@/app/hooks/useRedirect"




const MusicVisualization = () => {
  return (
    <div className="flex justify-center items-end h-20 space-x-1">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-yellow-400 opacity-75"
          style={{
            height: `${Math.random() * 100}%`,
            animation: `musicBars 0.5s ease infinite alternate ${i * 0.1}s`
          }}
        />
      ))}
    </div>
  )
}

export  function VoteMusicStreamLanding() {

  useRedirect();
  const [email, setEmail] = useState('')
  const [voteCount, setVoteCount] = useState(0)
  const session = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      setVoteCount(prevCount => prevCount + Math.floor(Math.random() * 10))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted email:', email)
    setEmail('')
  }

  const topSongs = [
    { id: 1, title: "Groovy Tunes", artist: "The Melodics", votes: 1234, genre: "Pop" },
    { id: 2, title: "Sunset Serenade", artist: "Ocean Waves", votes: 1156, genre: "Chill" },
    { id: 3, title: "Electric Dreams", artist: "Neon Nights", votes: 987, genre: "Electronic" },
  ]

  return (
      <>

          {/*<Redirect/>*/}
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 text-white">

     <Appbar/>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <MusicVisualization />
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-yellow-400 drop-shadow-lg">
                  You Vote, We Play
                </h1>
                <p className="mx-auto max-w-[700px] text-xl md:text-2xl text-pink-100 drop-shadow">
                  Join the revolution in music streaming. Vote for your favorite songs and shape the playlist in real-time.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1  text-white placeholder-pink-200 border-pink-300 backdrop-blur-sm"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold">Join Now</Button>
                </form>
                <p className="text-sm text-pink-200">
                  Start voting and listening instantly. No credit card required.
                </p>
              </div>
              <div className="mt-6 animate-pulse">
                <p className="text-2xl font-bold text-yellow-400">{voteCount.toLocaleString()} Votes Cast</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black/30 backdrop-blur-md">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-yellow-400">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: ThumbsUp, title: "Vote", description: "Cast your vote for the songs you want to hear next." },
                { icon: BarChart, title: "Rank", description: "Songs with the most votes rise to the top of the playlist." },
                { icon: Headphones, title: "Listen", description: "Enjoy a constantly updating stream of crowd-favorite music." }
              ].map((step, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-pink-300 transition-all duration-300 hover:scale-105">
                  <CardContent className="flex flex-col items-center p-6 text-center space-y-4">
                    <step.icon className="h-12 w-12 text-yellow-400" />
                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    <p className="text-pink-100">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-yellow-400">Top Voted Songs Right Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topSongs.map((song) => (
                <Card key={song.id} className="bg-white/10 backdrop-blur-sm border border-pink-300 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{song.title}</h3>
                    <p className="text-pink-200 mb-2">{song.artist}</p>
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-purple-900 mb-4">
                      {song.genre}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-pink-100">{song.votes} votes</span>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold transition-all duration-300 hover:scale-110">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Vote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black/30 backdrop-blur-md">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-yellow-400">For Artists</h2>
                <p className="text-pink-100 mb-4 md:text-lg">
                  Get your music in front of an engaged audience. Our voting system ensures that popular tracks get the airtime they deserve.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-yellow-400" />
                    <span className="text-white">Reach new listeners</span>
                  </li>
                  <li className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-yellow-400" />
                    <span className="text-white">Track your song's performance</span>
                  </li>
                  <li className="flex items-center">
                    <Music className="h-5 w-5 mr-2 text-yellow-400" />
                    <span className="text-white">Fair compensation based on plays</span>
                  </li>
                </ul>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold transition-all duration-300 hover:scale-110">Submit Your Music</Button>
              </div>
              <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Artist performing"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-600 to-pink-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-400">
                  Ready to Shape the Playlist?
                </h2>
                <p className="mx-auto max-w-[600px] text-pink-100 md:text-xl">
                  Join thousands of music lovers who are already voting and listening on VotePlay.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white/10 text-white placeholder-pink-200 border-pink-300 backdrop-blur-sm"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold transition-all duration-300 hover:scale-110">Get Started</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-pink-300 bg-black/20 backdrop-blur-md">
        <p className="text-xs text-pink-200">© 2023 VotePlay Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-pink-100" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-pink-100" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-pink-100" href="#">
            Cookie Policy
          </Link>
        </nav>
      </footer>
    </div>
      </>
  )
}