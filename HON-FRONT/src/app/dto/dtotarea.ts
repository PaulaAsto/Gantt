export class DtoTarea {
    private id: number;
    private nombre: string;
    private descripcion: string;
    constructor(id: number, nombre: string, descripcion: string){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
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
    
    public get $descripcion(): string {
		return this.descripcion;
	}

	public set $descripcion(value: string) {
		this.descripcion = value;
	}
}