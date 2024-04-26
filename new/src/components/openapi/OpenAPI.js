import React, { useState } from "react";
import "./OpenAPI.scss";
import openai from "./openai.png";
function OpenAPI(props) {
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState(
    "Welcome to our AI-powered store data analysis! We use OpenAI to transform complex data into clear insights. Our algorithms extract trends from sales, inventory, and feedback. The goal? Empower you with actionable info. Understand popular products, predict demand, and enhance satisfaction. Explore our intuitive dashboard for valuable insights"
  ); // "Negative" or "Positive"
  const API_KEY ="sk-proj-NM7EApOZLK7KuWBcWEfBT3BlbkFJErnFFbEp22wS15gYTH6X"; // secure -> environment variable
  //const API_KEY = "";
  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API");
    let content;
    if (props.type === "client_page") {
      content = "Analyze the stores data with 6 sentences total of 100 tokens" + props;
    } else if (props.type === "forecast_page") {
      content = "Analyze the stores data with 6 sentences total of 100 tokens"+props;
    }
    const APIBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
      temperature: 0,
      max_tokens: 100,
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
      <div className="header">
    
    <img alt="" src={openai}></img>
    <button className="analyze" onClick={callOpenAIAPI}>Analyze</button>
  </div>

      {sentiment !== ""
        ? sentiment.split(".").map((sentence, index) => (
            <div key={index} className="sentence">
              {sentence.trim()}
            </div>
          ))
        : null}

      
    </>
  );
}

export default OpenAPI;
