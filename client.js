const PORT = 4000;
const sendMessage = async (message) => {
  await fetch(`http://localhost:${PORT}/send?name=${Math.random()}`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      message,
    }),
  }).then((res) => console.log(res));
};

const messages = document.querySelector("#messages");
const subscribe = async () => {
  const newMessage = document.createElement("div");
  await fetch(`http://localhost:${PORT}/subscribe`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      newMessage.innerText = res.message;
      messages.append(newMessage);
    })
    .then(() => subscribe());
};

document.querySelector("#send").addEventListener("click", (e) => {
  const input = document.querySelector("#input");
  sendMessage(input.value);
});

subscribe();
