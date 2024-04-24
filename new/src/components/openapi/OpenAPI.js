import React, { useState } from "react";
import "./OpenAPI.scss";
function OpenAPI() {
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState("To estimate the weight of Recep's balls, we can use the fact that he can lift up to 200kg. Assuming that Recep can lift his balls with the same strength as he can lift other objects, we can estimate the weight of his balls to be around 200kg or less. New. New"); // "Negative" or "Positive"
  const API_KEY =
    "sk-proj-NM7EApOZLK7KuWBcWEfBT3BlbkFJErnFFbEp22wS15gYTH6X"; // secure -> environment variable

  async function callOpenAIAPI(props) {
    console.log("Calling the OpenAI API");
    let content;
  if (props.type === "client_page") {
    content = "with given data estimate recep's balls weight" + tweet;
  } else if (props.type === "forecast_page") {
    content = "forecast content";
  }
    const APIBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "with given data estimate recep's balls weight" + tweet,
        },
      ],
      temperature: 0,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY,
      },
      body: JSON.stringify(APIBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Assuming the sentiment is returned as the text in the response
        setSentiment(data.choices[0].message.content.trim());
      });
  }

  return (
    <>
    <h1>Powered by OpenAI </h1>
      
      {sentiment !== "" ? sentiment.split('.').map((sentence, index) => (
        <div key={index} className="sentence">
          {sentence.trim()}
        </div>
      )) : null}
     
      <div className="input">
      <textarea value={tweet} onChange={(e) => setTweet(e.target.value)} />
      <button onClick={callOpenAIAPI}>Analyze Tweet</button>
      </div>
    </>
  );
}

export default OpenAPI;
