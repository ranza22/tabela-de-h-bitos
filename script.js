// LISTA
let habitos = []

// PEGAR ELEMENTOS
let botao = document.getElementById("btnAdicionar")
let input = document.getElementById("inputHabito")
let lista = document.getElementById("listaHabitos")

// CARREGAR
let dados = localStorage.getItem("habitos")
if (dados) {
  habitos = JSON.parse(dados)
}

// FUNÇÃO PRA PEGAR HOJE
function hoje() {
  return new Date().toLocaleDateString()
}

// BOTÃO ADICIONAR
botao.addEventListener("click", function () {
  let texto = input.value
  if (texto === "") return

  habitos.push({
    nome: texto,
    streak: 0,
    ultimaData: null
  })

  localStorage.setItem("habitos", JSON.stringify(habitos))
  mostrarHabitos()
  input.value = ""
})

// MOSTRAR NA TELA
function mostrarHabitos() {
  lista.innerHTML = ""

  for (let i = 0; i < habitos.length; i++) {

    let item = document.createElement("div")
    item.classList.add("habito")

    // NOME
    let nome = document.createElement("span")
    nome.innerText = habitos[i].nome

    // STREAK
    let streak = document.createElement("span")
    streak.innerText = "🔥 " + habitos[i].streak

    // BOTÃO ✔️
    let btn = document.createElement("button")
    btn.innerText = "✔️"

    btn.addEventListener("click", function () {

      let hojeData = hoje()

      // se já fez hoje, não faz nada
      if (habitos[i].ultimaData === hojeData) return

      // pega ontem
      let ontem = new Date()
      ontem.setDate(ontem.getDate() - 1)
      let ontemData = ontem.toLocaleDateString()

      if (habitos[i].ultimaData === ontemData) {
        habitos[i].streak++
      } else {
        habitos[i].streak = 1
      }

      habitos[i].ultimaData = hojeData

      localStorage.setItem("habitos", JSON.stringify(habitos))
      mostrarHabitos()
    })

    // BOTÃO EDITAR
    let editar = document.createElement("button")
    editar.innerText = "✏️"

    editar.addEventListener("click", function () {
      let novo = prompt("Novo nome:", habitos[i].nome)

      if (novo) {
        habitos[i].nome = novo
        localStorage.setItem("habitos", JSON.stringify(habitos))
        mostrarHabitos()
      }
    })

    item.appendChild(nome)
    item.appendChild(streak)
    item.appendChild(btn)
    item.appendChild(editar)

    lista.appendChild(item)
  }
}

// MOSTRAR QUANDO ABRIR
mostrarHabitos()