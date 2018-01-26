import { DtoMini } from "./dtomini";

export class DtoEstadoGant {
    private id: number;
	private nombre: string;
	
	private mini: DtoMini[];

    constructor(id: number, nombre: string, mini: DtoMini[]){
        this.id = id;
		this.nombre = nombre;
		this.mini = mini;
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
	
	public get $mini(): DtoMini[] {
		return this.mini;
	}

	public set $mini(value: DtoMini[]) {
		this.mini = value;
    }
}