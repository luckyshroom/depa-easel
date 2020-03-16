import React from "react";
import {TwitterTweetEmbed} from "react-twitter-embed";

export const TwitterBlock = ({data}) => (
    <div className="twitter-embed">
        <TwitterTweetEmbed tweetId={data.tweetId} onLoad={e => e.style = null}/>
    </div>
);
