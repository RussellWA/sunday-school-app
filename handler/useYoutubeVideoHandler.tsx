import Constants from 'expo-constants';
import { useState } from 'react';

const YOUTUBE_API_KEY = Constants.expoConfig?.extra?.youtubeApiKey;

const useYoutubeVideoHandler = () => {
    const [videoId, setVideoId] = useState<string | null>(null);
    const playlistId = 'PLFt1jShd6QQlbCtJJpcvMHE5p8AXTj1Kb';
    
    const fetchLatestVideo = async () => {
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.items?.length) {
            const videoId = data.items[0].snippet.resourceId.videoId;
            setVideoId(videoId);
        }
        else {
            console.error("No videos found in the playlist");
        }
    };

    return {
        fetchLatestVideo,
        videoId,
    };
}

export default useYoutubeVideoHandler;
