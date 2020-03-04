function groupLevel() {
	const levels = getLevels();	
	const groups = [];
	levels.forEach(level => {
		groups.push(formatGroupInfo(level));
	});
	return groups;
}

function formatGroupInfo(level) {
	return {
		level: level.description,
		skills: filterGroup(level)
	};
}

function filterGroup(level) {
	const skills = getSkills();
	return skills
			.filter(skill => skill.level === level.id)
			.map(skill => skill.description);
}

console.log(groupLevel());

function getSkills() {
	return [
		{
			description : 'Javascript',
			level: '1'
		},
		{
			description : 'Node.js',
			level: '2'
		},
		{
			description : 'React',
			level: '3'
		}
	];
}

function getLevels() {
	return [
		{
			id: '1',
			description: 'Júnior'
		},
		{
			id: '2',
			description : 'Pleno'
		},
		{
			id: '3',
			description : 'Sênior'
		}
	];
}
