import React, { useEffect } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { WebView } from 'react-native-webview';

type Props = {
    videoId: string | null;
};

const YouTubeEmbed: React.FC<Props> = ({ videoId }) => {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?playsinline=1`;
    const videoHeight = (Dimensions.get('window').width * 9) / 16;

    return (
        videoId ? (
            <View
                style={{
                    height: videoHeight,
                    width: '100%',
                    borderRadius: 12,
                    overflow: 'hidden',
                }}
            >
                <WebView
                    style={{ width: '100%', height: videoHeight, borderRadius: 8 }}
                    javaScriptEnabled
                    domStorageEnabled
                    allowsInlineMediaPlayback
                    source={{ uri: embedUrl }}
                />
            </View>
        ) : (
            <View
                style={{
                    height: 200,
                    width: '100%',
                    backgroundColor: '#f0f0f0',
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: '#888', fontSize: 16 }}>
                    Oops! No video available.
                </Text>
            </View>
        )
    );
}

export default YouTubeEmbed;