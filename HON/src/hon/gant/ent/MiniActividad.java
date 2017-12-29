package hon.gant.ent;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "miniactividad")
public class MiniActividad implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	@Id
	@SequenceGenerator(name="MINI_ACTIVIDAD_GENERATOR", sequenceName="sec_miniactividad", allocationSize = 1, initialValue= 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="MINI_ACTIVIDAD_GENERATOR")
	@Column(name="mini_acti_id")
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "acti_id")
	private Actividad actividad;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "esta_id")
	private EstadoGant estadoGant;
	
	@Column(name = "nombre")
	private String nombre; 
	
	@Column(name = "color")
	private String color; 
	
	@Column(name = "porcentajeavance")
	private Double porcentajeAvance; 
	
	@Column(name = "est")
	private Integer estado;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Actividad getActividad() {
		return actividad;
	}

	public void setActividad(Actividad actividad) {
		this.actividad = actividad;
	}

	public EstadoGant getEstadoGant() {
		return estadoGant;
	}

	public void setEstadoGant(EstadoGant estadoGant) {
		this.estadoGant = estadoGant;
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

	public Double getPorcentajeAvance() {
		return porcentajeAvance;
	}

	public void setPorcentajeAvance(Double porcentajeAvance) {
		this.porcentajeAvance = porcentajeAvance;
	}

	public Integer getEstado() {
		return estado;
	}

	public void setEstado(Integer estado) {
		this.estado = estado;
	} 
	
	

}
