export class Opcion{
	private id: number;
	private texto: string;
	private esCorrecta: boolean;
	private probabilidadCorrecta: number;

	public constructor(elId: number, elTexto: string, siEsCorrecta, laProbabilidadCorrecta){
		this.id=elId;
		this.texto=elTexto;
		this.esCorrecta=siEsCorrecta;
		this.probabilidadCorrecta=laProbabilidadCorrecta;
	}

	getId():number{
		return this.id;
	}
	getTexto():string{
		return this.texto;
	}
	getEsCorrecta():boolean{
		return this.esCorrecta;
	}
	getProbabilidadCorrecta():number{
		return this.probabilidadCorrecta;
	}
}