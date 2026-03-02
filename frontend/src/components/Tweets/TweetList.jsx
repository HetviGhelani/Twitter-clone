import React from "react";
import TweetCard from "./TweetCard";

const TweetList = ({ tweets }) => {
  if (!tweets || tweets.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No tweets to display</p>
      </div>
    );
  }

  return (
    <div>
      {tweets.map((tweet) => (
        <TweetCard key={tweet._id} tweet={tweet} />
      ))}
    </div>
  );
};

export default TweetList;
