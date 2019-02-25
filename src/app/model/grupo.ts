export class Grupo{
	private id: number;
	private listaPreguntas: any;
	public constructor(elId: number, laListaPreguntas: any){
		this.id=elId;
		this.listaPreguntas=laListaPreguntas;
	}
	getId(): number{
		return this.id;
	}
	getListaPreguntas(): any{
		return this.listaPreguntas;
	}
}