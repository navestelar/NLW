import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()

  content.classList.add("placeholder")

  const videoUrl = input.value
  if (!videoUrl.includes("shorts")) {
    return (content.textContent = "Esse vídeo não parece ser um short!")
  }

  const [_, id] = videoUrl.split("/shorts/")
  const [videoId] = id.split("?si")
  console.log(videoId)

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/sumary/" + videoId)

  content.textContent = "Resumindo..."

  const sumary = await server.post("/sumary", {
    text: transcription.data.result,
  })

  content.textContent = sumary.data.result

  content.classList.remove("placeholder")
})
