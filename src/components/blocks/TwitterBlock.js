import React from "react";
import {TwitterTweetEmbed} from "react-twitter-embed";

export const TwitterBlock = ({data}) => (
    <div className="twitter-embed">
        <TwitterTweetEmbed tweetId={data.tweetId}/>
    </div>
);
