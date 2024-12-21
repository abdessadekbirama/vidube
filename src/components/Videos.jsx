import axios from "axios";
import { useState,useEffect } from "react";
import VideoCard from "./VideoCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import srchIcon from '@iconify-icons/bi/search';
function Videos(){
    const [videos,setVideos] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);
    const [query,setQuery] = useState("sport");
    const [queryInput,setQueryInput] = useState("");
    const search = ()=>{
        setQuery(queryInput);
    }
    const inputQuery = (e)=>{
        setQueryInput(e.target.value);
    }
    useEffect(()=>{
        const fetchVideos = async ()=>{
            try{
                const response = await axios.get(`https://node-server2.vercel.app/vimeo?query=${query}`);
                setVideos(response.data.data);
            }
            catch(err){
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        };
        fetchVideos();
    },[query])
    
    if (loading) return(
        <div className="flex flex-col gap-3 items-center w-fit m-auto mt-20">
            <div className="size-10 border-4 rounded-full border-gray-200 border-t-blue-500 animate-spin"></div>
            <h1 className="text-2xl">Loading...</h1>
        </div>
    )
    if (error) return <p className="text-3xl mt-20 text-center">error:{error}</p>
    return(
        <div>
            <h1 className="text-2xl text-center mt-20">Welcome to <span className="bg-gradient-to-br from-[#0059ff] to-[#f204ff] bg-clip-text text-transparent font-semibold">Vidube</span></h1>
            <div className="flex gap-2 justify-center my-10">
                <input onChange={inputQuery} type="text" placeholder="search" className="p-2 rounded-full border-2 border-gray-400 focus:border-blue-500 bg-[#bfeeed9a] focus:bg-[#dad8d8]  transition-all outline-none"/>
                <button onClick={search} className="bg-blue-300 size-10 flex justify-center items-center rounded-full hover:shadow-[0_0_10px_1px_blue] transition-all active:scale-95"><Icon icon={srchIcon}/></button>
            </div>
            <div className="flex gap-y-5 sm:flex-row flex-wrap gap-x-5 justify-center">
                {videos.map((v,i)=>(
                <VideoCard link={v.link} title={v.name} date={v.created_time} key={i}/>
            ))}
            </div>
        </div>
    )
}
export default Videos;
