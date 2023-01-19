function onsubmit(e) {
  e.preventDefault();
  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;
  if (prompt === "") {
    alert("please add some prompt");
    return;
  }
  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  console.log(prompt, size);
  try {
    showspinner();
    const response = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, size }),
    });
    if (!response.ok) {
      removespinner();
      throw new Error("that image could not be generated");
    }
    const data = await response.json();

    const imageUrl = data.data;
    console.log(imageUrl);
    document.querySelector("#image").src = imageUrl;

    removespinner();
    console.log(data);
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

function showspinner() {
  document.querySelector(".spinner").classList.add("show");
}
function removespinner() {
  document.querySelector(".spinner").classList.remove("show");
}

document.querySelector("#image-form").addEventListener("submit", onsubmit);
