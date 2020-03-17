(() => {

	const divRepos = document.getElementById('repos');
	divRepos.classList.add('row')

	const user = 'rbalves';

	axios.get(`https://api.github.com/users/${user}/repos?per_page=100`)
	.then(response => {

		const repos = response.data;

		orderReposByCreatedAt(repos);

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

		// const ul = document.createElement('ul');
		// ul.classList.add('ul-badges');

		// const li = document.createElement('li');
		// li.innerHTML = `Todos (${repos.length})`;
		// li.classList.add('li-badge-active');
		// ul.appendChild(li);

		// tecnologies.forEach(tecnologie => {
		// 	const li = document.createElement('li');
		// 	li.innerHTML = `${tecnologie.description} (${tecnologie.qty})`;
		// 	li.classList.add('li-badge-no-active');
		// 	ul.appendChild(li);
		// });

		// const divBadges = document.getElementById('badges-tecnologies');
		// divBadges.classList.add('div-badges');
		// divBadges.appendChild(ul);

		repos.forEach(repo => {

			const {name, description, created_at, language, stargazers_count, html_url} = repo;

			const divCard = document.createElement("div");
			divCard.classList.add('col-md-3');
			divCard.classList.add('col-sm-12');
			divCard.classList.add('card-project');

			const divCardBody = document.createElement("div");
			divCardBody.classList.add('card-body');

			const elements = [
				{
					element: 'h4',
					classAdd: 'card-title',
					message: name || 'Sem nome'
				},
				{
					element: 'strong',
					classAdd: 'card-text',
					message: description || 'Nenhuma descrição'
				},
				{
					element: 'p',
					classAdd: 'card-text',
					message: 'Criado em: ' + ((created_at.substr(0,10)) || 'Data não identificada')
				},
				{
					element: 'p',
					classAdd: 'card-text',
					message: 'Linguagem: ' + (language || 'Não identificada')
				},
				{
					element: 'p',
					classAdd: 'card-text',
					message: 'Estrelas: ' + stargazers_count
				},
			];

			elements.forEach(item => {
				const {element, classAdd, message} = item;
				divCard.appendChild(addText(element, classAdd, message));
			});

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
})();

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
	  return 0;
	});
}

function orderReposByCreatedAt(repos) {
	repos.sort(function (a, b) {
	  if (a.created_at < b.created_at) {
	    return 1;
	  }
	  if (a.created_at > b.created_at) {
	    return -1;
	  }
	  return 0;
	});
}
