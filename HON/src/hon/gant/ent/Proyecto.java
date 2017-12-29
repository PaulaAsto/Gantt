package hon.gant.ent;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "proyecto")
@NamedQueries({
@NamedQuery(name="Proyecto.all", query="SELECT NEW hon.gant.ent.Proyecto(p.id, p.nombre) FROM Proyecto p where p.id= :id")
})
public class Proyecto implements Serializable{

	private static final long serialVersionUID = 1L;
	public static final String ALL="Proyecto.all";
	
	@Id
	@SequenceGenerator(name="PROYECTO_GENERATOR", sequenceName="sec_proyecto", allocationSize = 1, initialValue= 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="PROYECTO_GENERATOR")
	@Column(name="proy_id")
	private Long id;
	
	@Column(name="nombre")
	private String nombre;
	
	@Column(name="est")
	private Integer estado;
	
	@OneToMany(mappedBy = "proyecto" , fetch = FetchType.LAZY)
	private List<Tarea> tareas;

	public Proyecto() {}
	
	public Proyecto(Long id, String nombre) {
		this.id = id;
		this.nombre = nombre;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Integer getEstado() {
		return estado;
	}

	public void setEstado(Integer estado) {
		this.estado = estado;
	}

	public List<Tarea> getTareas() {
		return tareas;
	}

	public void setTareas(List<Tarea> tareas) {
		this.tareas = tareas;
	}	
	
	
	
}
