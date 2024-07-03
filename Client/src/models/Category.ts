class Category {
	id: string;
	name: string;
	image: string;
	color: string;
	questionsCount: number;

	constructor(params: { id: string; name: string; image: string; color: string; questionsCount: number }) {
		this.id = params.id;
		this.name = params.name;
		this.image = params.image;
		this.color = params.color;
		this.questionsCount = params.questionsCount;
	}

	public static FactoryGetList(data: any): Category[] {
		const catList: Category[] = [];
		data.results.map((cat: any) => {
			catList.push(
				new Category({
					id: cat.id,
					name: cat.name,
					image: cat.image,
					color: cat.color,
					questionsCount: cat.questionsCount,
				})
			);
		});
		return catList;
	}
}

export default Category;
