const cuid = require('cuid');

class TodosModel {
	constructor() {
		this.todos = [
			{
				id: '1234',
				createdAt: '2019-02-05T00:10:13.828Z',
				updatedAt: '2019-02-05T00:10:13.828Z',
				name: 'Eat Pineapples',
				isComplete: false,
				completionDate: null,
			},
		];
	}

	create({ name, isComplete }) {
		const todo = {
			id: cuid(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			name,
			isComplete,
			completionDate: null,
		};
		this.todos.push(todo);
		console.log(todo);

		return todo;
	}
	findOne(id) {
		const todo = this.todos.find(todo => todo.id === id);
		return todo;
	}
	findAll() {
		console.log(this.todos);
		return this.todos;
	}
}

module.exports = TodosModel;
