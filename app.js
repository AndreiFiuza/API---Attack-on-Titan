document.addEventListener("DOMContentLoaded", async function () {
    const humanUrl = "https://api.attackontitanapi.com/characters";
    const titanUrl = "https://api.attackontitanapi.com/titans";

    const humanosContainer = document.getElementById("humanos");
    const titansContainer = document.getElementById("titans");
    const detalheContainer = document.getElementById("detalhe");
    const mainContainer = document.getElementById("main");

    async function fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }

    function createCard(personagem) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${personagem.image}" alt="${personagem.name}">
            <h3>${personagem.name}</h3>
            <button onclick="mostrarDetalhes('${personagem.image}', '${personagem.name}', '${personagem.age}', '${personagem.height}', '${personagem.gender}')">Ver mais</button>
        `;

        return card;
    }

    window.mostrarDetalhes = function (imagem, nome, idade, altura, genero) {
        mainContainer.style.display = "none"; // Esconde a lista principal
        detalheContainer.innerHTML = `
            <div class="detalhe-card">
                <img src="${imagem}" alt="${nome}">
                <div>
                    <h2>${nome}</h2>
                    <p><strong>Idade:</strong> ${idade || "Desconhecida"}</p>
                    <p><strong>Altura:</strong> ${altura || "Desconhecida"}</p>
                    <p><strong>Gênero:</strong> ${genero || "Desconhecido"}</p>
                    <button onclick="voltarInicio()">Voltar ao início</button>
                </div>
            </div>
        `;
        detalheContainer.style.display = "block"; // Exibe os detalhes
    };

    window.voltarInicio = function () {
        detalheContainer.innerHTML = "";
        detalheContainer.style.display = "none";
        mainContainer.style.display = "block"; // Mostra a lista principal de novo
    };

    async function renderData() {
        const humanos = await fetchData(humanUrl);
        const titans = await fetchData(titanUrl);

        humanos?.forEach((personagem) => {
            humanosContainer.appendChild(createCard(personagem));
        });

        titans?.forEach((personagem) => {
            titansContainer.appendChild(createCard(personagem));
        });
    }

    renderData();
});
