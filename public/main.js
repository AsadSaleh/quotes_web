const update = document.querySelector("#update-button");

update.addEventListener("click", () => {
  fetch("/quotes", {
    method: "put",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: "Darth Father",
      quote: "I find your lack of faith disturbing",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then(() => window.location.reload(true))
    .catch(console.error);
});

const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector("#message");

deleteButton.addEventListener("click", () => {
  fetch("/quotes", {
    method: "delete",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: "Darth Father",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((res) => {
      if (res === "No quote to delete") {
        messageDiv.textContent = "No Darth Father quote to delete";
      } else {
        window.location.reload();
      }
    })
    .catch(console.error);
});
