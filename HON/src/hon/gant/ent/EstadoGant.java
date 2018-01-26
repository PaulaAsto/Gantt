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
@Table(name = "estadogant")
@NamedQueries({
	@NamedQuery(name="EstadoGant.all", query="SELECT NEW hon.gant.ent.EstadoGant(e.id, e.nombre) FROM EstadoGant e where e.estado = :estado order by e.id")
})
public class EstadoGant implements Serializable{

	private static final long serialVersionUID = 1L;
	public static final String ALL="EstadoGant.all";
	
	@Id
	@SequenceGenerator(name="ESTADO_GANT_GENERATOR", sequenceName="sec_estadogant", allocationSize = 1, initialValue= 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ESTADO_GANT_GENERATOR")
	@Column(name="esta_gant_id")
	private Long id;
	
	@Column(name ="nombre")
	private String nombre;
	
	@Column(name ="color")
	private String color;
	
	@Column(name ="est")
	private Integer estado;
	
	@OneToMany(mappedBy = "estadoGant" , fetch = FetchType.LAZY)
	private List<MiniActividad> miniActividades;
	
	public EstadoGant() {}

	//EstadoGant.all
	public EstadoGant(Long id, String nombre) {
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

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Integer getEstado() {
		return estado;
	}

	public void setEstado(Integer estado) {
		this.estado = estado;
	}

	public List<MiniActividad> getMiniActividades() {
		return miniActividades;
	}

	public void setMiniActividades(List<MiniActividad> miniActividades) {
		this.miniActividades = miniActividades;
	}
	
	
}
