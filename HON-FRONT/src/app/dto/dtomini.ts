export class DtoMini {
    private id: number;
    private nombre: string;

    constructor(id: number, nombre: string){
        this.id = id;
        this.nombre = nombre;
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
}