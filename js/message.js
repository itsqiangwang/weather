var chatboxContainer = document.getElementById("chatbox-container");

function leftMsg() {
  var createLeftSpeechBubble = document.createElement("div");
  var leftMessageContainer = document.createElement("span");

  var weatherForecast = [
    `I was just checking the weather in CITY_NAME, STATE_NAME, where you live...`,
    `It's MONTH YEAR. I can't believe it. I seem to have fallen out of time... How is the weather in your city?`,
    `It's WEATHER degrees in your city...`,
    "It's TIME where "
  ];

  createLeftSpeechBubble.className = "left-speech-bubble";
  createLeftSpeechBubble.appendChild(leftMessageContainer);
  chatboxContainer.appendChild(createLeftSpeechBubble);

  var randomIndex = Math.floor(Math.random() * weatherForecast.length);

  leftMessageContainer.innerText = weatherForecast[[randomIndex]];

  chatboxContainer.scrollTop = chatboxContainer.scrollHeight;
}

const setRandomInterval = (intervalFunction, minDelay, maxDelay) => {
  let timeout;

  const runInterval = () => {
    const timeoutFunction = () => {
      intervalFunction();
      runInterval();
    };

    const delay =
      Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    timeout = setTimeout(timeoutFunction, delay);
  };

  runInterval();

  return {
    clear() {
      clearTimeout(timeout);
    },
  };
};

setRandomInterval(leftMsg, 1000, 5000);
