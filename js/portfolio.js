const divRepos = document.getElementById('repos');

const user = 'rbalves';

const getRepos = () => {
	axios.get(`https://api.github.com/users/${user}/repos`)
	.then(response => {

		const repos = response.data;
		
		const strongReposLength = document.getElementById('repos_length');
		strongReposLength.innerHTML = '(' + repos.length + ')';

		orderReposByStars(repos);

		const allTecnologies = repos.map(repo => {
			const {language} = repo;
			return language;
		});

		const duplicatedTecnologiesRemoved = allTecnologies.filter((a, b) => allTecnologies.indexOf(a) === b);

		const tecnologies = [];

		duplicatedTecnologiesRemoved.forEach(item => {
			const countTecnologie = allTecnologies.filter(tecnologie => item == tecnologie).length;
			
			const tecnologieInfo = {
				description: item || 'Outros',
				qty: countTecnologie
			}

			tecnologies.push(tecnologieInfo);
		});

		const ul = document.createElement('ul');
		
		ul.style.listStyleType = 'none';
		ul.style.margin = '0';
		ul.style.padding = '0';

		tecnologies.forEach(tecnologie => {
			const li = document.createElement('li');
			li.innerHTML = `${tecnologie.description} (${tecnologie.qty})`;
			li.style.display = 'inline';
			li.style.background = '#222d32';
			li.style.color = '#fff';
			li.style.margin = '5px'
			li.style.padding = '3px';
			li.style.borderRadius = '4px';
			ul.appendChild(li);
		});

		const divBadges = document.getElementById('badges-tecnologies');
		divBadges.appendChild(ul);

		repos.forEach(repo => {

			const {name, description, created_at, language, stargazers_count, html_url} = repo;

			const divCard = document.createElement("div");
			divCard.classList.add('card');
			divCard.style.padding = '2%';
			divCard.style.marginTop = '1%';

			const divCardBody = document.createElement("div");
			divCardBody.classList.add('card-body');

			divCard.appendChild(addText('h4', 'card-title', name || 'Sem nome'));
			divCard.appendChild(addText('strong', 'card-text', description || 'Nenhuma descrição'));
			divCard.appendChild(addText('p', 'card-text', 'Criado em: ' + (created_at.substr(0,10)) || 'Data não identificada' ));
			divCard.appendChild(addText('p', 'card-text', 'Linguagem: ' + (language || 'Não identificada')));
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
		divRepos.appendChild(document.createTextNode('Desculpe! Ocorreu um erro.'));
	})
}

function addText(element, classAdd, message) {
	const text = document.createElement(element);
	text.classList.add(classAdd);
	text.appendChild(document.createTextNode(message));
	return text;
}

function orderReposByStars(repos) {
	repos.sort(function (a, b) {
	  if (a.stargazers_count < b.stargazers_count) {
	    return 1;
	  }
	  if (a.stargazers_count > b.stargazers_count) {
	    return -1;
	  }
	  // a must be equal to b
	  return 0;
	});
}

getRepos();
