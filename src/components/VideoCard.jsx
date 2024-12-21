import { useState } from "react";

function VideoCard({title,date,link}){
    const [more,setMore] = useState(false);
    const toggleMore = ()=>{
        setMore(!more);
    }
    return(
        <div className="flex flex-col items-center rounded shadow-[0_0_20px_1px_grey] bg-[#ffffff68]">
            <h1 onClick={toggleMore} className={`text-lg m-2 max-w-[300px] hover:cursor-pointer break-words text-ellipsis ${!more?"line-clamp-1":""}`}>{title}</h1>  
            <iframe className="sm:w-[400px] sm:h-[200px] w-[300px] h-[200px]" src={`https://player.vimeo.com/video/${link.split('/')[3]}`}></iframe>
            <p>{date.slice(0,10)} {date.slice(11,16)}</p>
        </div>
    )
}
export default VideoCard;