export class Pregunta{
	private id: number;
	private enunciado: string;
	private nivel: string;
	private opciones: any;
	public constructor(elId: number, elEnunciado: string, elNivel:string, lasOpciones: any){
		this.id=elId;
		this.enunciado=elEnunciado;
		this.nivel=elNivel;
		this.opciones=lasOpciones;
	}

	getId():number{
		return this.id;
	}
	getEnunciado():string{
		return this.enunciado;
	}
	getNivel():string{
		return this.nivel;
	}
	getOpciones():any{
		return this.opciones;
	}

}