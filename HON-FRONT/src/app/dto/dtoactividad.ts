export class DtoActividad {
    private id: number;
	private nombre: string;
	private fechaini: Date;
	private fechafin: Date;
	private dias: number;

    constructor(id: number, nombre: string, fechaini: Date, fechafin: Date, dias: number){
        this.id = id;
		this.nombre = nombre;
		this.fechaini = fechaini;
		this.fechafin = fechafin;
		this.dias = dias;
    }
    public get $id(): number {
		return this.id;
	}

	public set $id(value: number) {
		this.id = value;
	}

	public get $nombre(): string {
		return this.nombre;
	}

	public set $nombre(value: string) {
		this.nombre = value;
	}

	public get $fechaini(): Date {
		return this.fechaini;
	}

	public set $fechaini(value: Date) {
		this.fechaini = value;
	}
	
	public get $fechafin(): Date {
		return this.fechafin;
	}

	public set $fechafin(value: Date) {
		this.fechafin = value;
	}
	
	public get $dias(): number {
		return this.id;
	}

	public set $dias(value: number) {
		this.id = value;
	}

}