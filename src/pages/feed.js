import Navbar from "../components/Navbar";
import MusicPlayer from "../components/MusicPlayer"


export default function Feed() {
    return (
        <div>
            <Navbar />
            <div>
                <p className="m-10 text-lg ml-48 text-gray-400">Hear the latest posts from the people you’re following:</p>
            </div>
            <div className="text-lg text-gray-500 flex items-center flex-col">
                <p>Your feed is currently empty.</p>
                <p> Go to search or home to find creators to follow.</p>
                <p>  Come back to the feed to see tracks they are posting.</p>
            </div>
            <MusicPlayer />
        </div>
    )
}