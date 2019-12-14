const divRepos = document.getElementById('repos');

const user = 'rbalves';

function addText(element, classAdd, message) {
	const text = document.createElement(element);
	text.classList.add(classAdd);
	text.appendChild(document.createTextNode(message));
	return text;
}

const getRepos = async () => {
	await axios.get(`https://api.github.com/users/${user}/repos`)
	.then(response => {

		const repos = response.data;

		repos.forEach(repo => {
			
			const {name, description, created_at, language, stargazers_count, html_url} = repo;

			const divCard = document.createElement("div");
			divCard.classList.add('card');
			divCard.style.padding = '2%';

			const divCardBody = document.createElement("div");
			divCardBody.classList.add('card-body');

			divCard.appendChild(addText('h4', 'card-title', name));
			divCard.appendChild(addText('strong', 'card-text', description || 'Nenhuma descrição'));
			divCard.appendChild(addText('p', 'card-text', 'Criado em: ' + created_at.substr(0,10)));
			divCard.appendChild(addText('p', 'card-text', 'Linguagem: ' + language));
			divCard.appendChild(addText('p', 'card-text', 'Estrelas: ' + stargazers_count));

			const link = document.createElement('a');
			link.setAttribute('target', '_blank');
			link.setAttribute('href', html_url);
			link.appendChild(document.createTextNode('Ir para repositório'));
			divCard.appendChild(link);

			divRepos.appendChild(divCard);
		})
	})
	.catch(error => {
		divRepos.appendChild(document.createTextNode('Erro ao consultar a API do Github.'));
	})
}

getRepos();
