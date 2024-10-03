

"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Play, Volume2, Music, SkipForward } from "lucide-react"
import { Appbar } from '../components/Redirect'


// something like desturcturing the streams table
interface Video {
    "id": string,
    "type": string,
    "url": string,
    "extractedId": string,
    "title": string,
    "smallImg": string,
    "bigImg": string,
    "active": boolean,
    "userId": string,
    "upvotes": [],
    "haveUpvoted": boolean
}


const getYouTubeVideoId = (url: string) => {
    const videoId = url.split('v=')[1]
    const ampersandPosition = videoId.indexOf('&')
    if (ampersandPosition !== -1) {
        return videoId.substring(0, ampersandPosition)
    }
    return videoId
}

export default function StreamView({creatorId} : {creatorId : String}) {
    const [url, setUrl] = useState('');
    const [songs, setSongs] = useState<Video[]>([])
    const [currentlyPlaying, setCurrentlyPlaying] = useState<Video[]>([])
    const [nextUp, setNextUp] = useState(songs[1])
    const videoRef = useRef<HTMLIFrameElement>(null)



     useEffect(() => {
     //  const sortedSongs = [...songs].sort((a, b) => b.upvotes <  a.upvotes ? -1 : 1);
     //  const currentIndex = sortedSongs.findIndex(song => song.id === currentlyPlaying.id)
       setCurrentlyPlaying([songs[0]])
        // setNextUp(sortedSongs[currentIndex + 1] || sortedSongs[0])
      
     //  console.log(currentlyPlaying)

     }, [songs])


    async function refreshStreams(){
        const res = await fetch(`/api/?creatorId=${creatorId}`, {
            credentials: "include"
        });
        const json = await res.json();
        console.log(json.streams)
       setSongs(json.streams);
       songs.map((song) => console.log(song))
      
      // setCurrentlyPlaying([...currentlyPlaying, songs[1]])
      
       
    }

    useEffect(() => {
        refreshStreams();
        setInterval(() => {
            refreshStreams()
        }, 10000)
    }, [])













    const handleUrlSubmit = async () => {
        const res = await fetch("/api/", {
            method: "POST",
            body: JSON.stringify({
                creatorId,
                url: url
            })
        })
      //  console.log(await res.json())
     //   console.log("your response is --------->" + json)
        console.log(songs)
        console.log(currentlyPlaying)
        
       // setSongs([...songs, r])
        setUrl('');
    }



    const handleVote = async (id: string, isUpvote: boolean) => {
        // setSongs(songs.map(song =>
        //     song.id === id ? { ...song, upvotes: song.upvotes. } : song
        // ))

       const res = await  fetch(`/api/Streams/${isUpvote ? "upvote" : "downvote"}`, {
            method: "POST",
            body: JSON.stringify({
                streamId: id
            })
        })

        console.log(await res.json())
    }











    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-500 to-purple-600">
            {/* <Appbar/> */}

            <main className="container mx-auto px-32 py-8 bg-black/20 backdrop-blur-md">
                {/* <h1 className="text-4xl font-bold text-center text-white mb-8 mt-2">
                    Discover Your Next Favorite Song!
                </h1>
                <p className="text-xl text-center text-white mb-8">
                    Vote, play, and share the music that moves you. Let's create the ultimate playlist together!
                   
                </p> */}
                <Card className="bg-white/90 backdrop-blur-sm mb-8">
                    <CardContent className="p-4">
                        <div className="flex space-x-4">
                            <Input
                                placeholder="Paste YouTube URL here"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="flex-grow"
                            />
                            <Button onClick={handleUrlSubmit} className="bg-purple-600 hover:bg-purple-700">Add Song</Button>
                        </div>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <Card className="md:col-span-2 bg-white/90 backdrop-blur-sm">
                        <CardContent className="p-4">
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <Play className="mr-2" /> Currently Playing
                            </h2>
                            
                            <div className="aspect-video mb-4">
                                <iframe
                                    ref={videoRef}
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${currentlyPlaying[0] ? currentlyPlaying[0].extractedId : "DxCfhmYe-Cw"}?autoplay=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer;  autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    {/* <p className="text-lg">{currentlyPlaying[0].artist}</p> */}
                                </div>
                            </div>
                        </CardContent>

                         
                    </Card>






























                      
                    <div className="bg-white/20 backdrop-blur-sm md:col-span-2 md:row-span-10 p-4  focus:scroll-auto  overflow-y-auto  max-h-screen	">
                       
                    <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {songs.sort((a, b) => b.upvotes <  a.upvotes ? -1 : 1).map((song) => (
                        <Card key={song.id} className="bg-white/90 backdrop-blur-sm md:col-span-3">
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-4 mb-4">
                                    <img src={`${song.smallImg}`} alt={song.title} className="w-20 h-20 object-cover rounded-lg" />
                                    <div>
                                        <p className="font-semibold">{song.title}</p>
                                        {/* <p className="text-sm text-gray-600">{song.artist}</p> */}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Button size="sm" variant="outline" onClick={() => handleVote(song.id, true)}>
                                            <ThumbsUp className="h-4 w-4" />
                                        </Button>
                                        <span className="font-bold">{song.upvotes.length}</span>
                                        <Button size="sm" variant="outline" onClick={() => handleVote(song.id, false)}>
                                            <ThumbsDown className="h-4 w-4" />
                                        </Button>

                                        <Button size="sm" variant="outline" className='ml-5'>
                                           Pay and play now
                                        </Button>
                                    </div>
                                    {/* {song.id === currentlyPlaying.id && (
                                        <Play className="h-4 w-4 text-green-500" />
                                    )}
                                    {song.id === nextUp.id && (
                                        <SkipForward className="h-4 w-4 text-blue-500" />
                                    )} */}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                        

                    </div>








































                    <Card className="bg-white/90 backdrop-blur-sm md:col-span-2 md:row-span-2">
                    <CardContent className="p-4">
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <Music className="mr-2" /> Next Up
                            </h2>
                            <div className="flex items-center space-x-4">
                                <img src={songs[1]?songs[1].smallImg : ""} alt={songs[1] ? songs[1].title : ""} className="w-20 h-20 object-cover rounded-lg" />
                                <div>
                                    <p className="text-xl font-semibold">{songs[1] ? songs[1].title : ""}</p>
                                    {/* <p className="text-lg">{nextUp.artist}</p> */}
                                    {/* <p className="text-md">Votes: {nextUp.upvotes}</p> */}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                 


                </div>
               
            </main>
        </div>
    )
}