document.addEventListener("DOMContentLoaded", async function () {
    const humanUrl = "https://api.attackontitanapi.com/characters";
    const titanUrl = "https://api.attackontitanapi.com/titans";

    const container = document.getElementById("container");

    async function fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            return [];
        }
    }

    function createHumanCard(character) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${character.img || 'placeholder.jpg'}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p><strong>Apelido:</strong> ${character.alias || "Não informado"}</p>
            <p><strong>Espécie:</strong> ${character.species || "Desconhecida"}</p>
            <p><strong>Gênero:</strong> ${character.gender || "Desconhecido"}</p>
            <p><strong>Idade:</strong> ${character.age || "Desconhecida"}</p>
            <p><strong>Altura:</strong> ${character.height || "Não informada"}</p>
        `;

        return card;
    }

    function createTitanCard(titan) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${titan.img || 'placeholder.jpg'}" alt="${titan.name}">
            <h3>${titan.name}</h3>
            <p><strong>Altura:</strong> ${titan.height || "Não informada"}</p>
            <p><strong>Habilidades:</strong> ${titan.abilities ? titan.abilities.join(", ") : "Nenhuma listada"}</p>
        `;

        return card;
    }

    async function renderData() {
        const humans = await fetchData(humanUrl);
        const titans = await fetchData(titanUrl);

        humans?.forEach((character) => {
            container.appendChild(createHumanCard(character));
        });

        titans?.forEach((titan) => {
            container.appendChild(createTitanCard(titan));
        });
    }

    renderData();
});

