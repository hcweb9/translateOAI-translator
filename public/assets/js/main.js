let translateButton = document.querySelector("#translateButton");


translateButton.addEventListener("click", async () => {
  //Value that will be translated
  let inputText = document.querySelector("#inputText");

  const text = inputText.value.trim();

  //Language select

  const targetLang = document.querySelector("#targetLang").value;

  if (!text) return false;

  //Add user message to the text box

  const userMessage = document.createElement("div");

  userMessage.className = "chat__message chat__message--user";
  userMessage.textContent = text;

  const messagesContainer = document.querySelector(".chat__messages");
  messagesContainer.appendChild(userMessage);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  //Ajax request to the back-end

  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        targetLang,
      }),
    });

    const data = await response.json();

    //Add AI message to chat

    const botMessage = document.createElement("div");
    botMessage.className = "chat__message chat__message--bot";
    botMessage.textContent = data.translatedText;

    messagesContainer.appendChild(botMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  } catch (error) {
    console.log("Error:", error);
  }

  //Empty the input 'type text'

  inputText.value = "";


});



  //send message with enter key
  inputText.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
     translateButton.click();
    }
  });