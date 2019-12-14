axios.get('https://api.github.com/users/rbalves/repos')
	.then(response => {

		const divRepos = document.getElementById('repos');

		const repos = response.data;

		repos.forEach(repo => {
			console.log(repo);
			const {name, description, created_at, language, stargazers_count, html_url} = repo;

			const divCard = document.createElement("div");
			divCard.classList.add('card');
			divCard.style.padding = '2%';

			const divCardBody = document.createElement("div");
			divCardBody.classList.add('card-body');

			const h4 = document.createElement('h4');
			h4.classList.add('card-title');
			h4.appendChild(document.createTextNode(name));
			divCard.appendChild(h4);

			const textDescription = document.createElement('strong');
			textDescription.classList.add('card-text');
			textDescription.appendChild(document.createTextNode(description || 'Nenhuma descrição'));
			divCard.appendChild(textDescription);

			const create_date = document.createElement('p');
			create_date.classList.add('card-text');
			create_date.appendChild(document.createTextNode('Criado em: ' + created_at.substr(0,10)));
			divCard.appendChild(create_date);

			const linguagem = document.createElement('p');
			linguagem.classList.add('card-text');
			linguagem.appendChild(document.createTextNode('Linguagem: ' + language));
			divCard.appendChild(linguagem);

			const estrelas = document.createElement('p');
			estrelas.classList.add('card-text');
			estrelas.appendChild(document.createTextNode('Estrelas: ' + stargazers_count));
			divCard.appendChild(estrelas);

			const link = document.createElement('a');
			link.setAttribute('target', '_blank');
			link.setAttribute('href', html_url);
			link.appendChild(document.createTextNode('Go to repo'));
			divCard.appendChild(link);

			divRepos.appendChild(divCard);
		})
	})
	.catch(error => {
		console.log(error);
	})
