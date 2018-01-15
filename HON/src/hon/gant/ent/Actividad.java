package hon.gant.ent;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "actividad")
public class Actividad implements Serializable {

private static final long serialVersionUID = 1L;
	
	@Id
	@SequenceGenerator(name="ACTIVIDAD_GENERATOR", sequenceName="sec_actividad", allocationSize = 1, initialValue= 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ACTIVIDAD_GENERATOR")
	@Column(name="acti_id")
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "tare_id")
	private Tarea tarea;
	
	@Column(name = "nombre")
	private String nombre; 
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "fechainicio")
	private Date fechaInicio; 
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "fechafin")
	private Date fechaFin; 
	
	@Column(name = "color")
	private String color; 
	
	@Column(name = "descripcion")
	private String descripcion; 
	
	@Column(name = "est")
	private String estado;
	
	@OneToMany(mappedBy = "actividad" , fetch = FetchType.LAZY)
	private List<MiniActividad> miniActividades;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Tarea getTarea() {
		return tarea;
	}

	public void setTarea(Tarea tarea) {
		this.tarea = tarea;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Date getFechaInicio() {
		return fechaInicio;
	}

	public void setFechaInicio(Date fechaInicio) {
		this.fechaInicio = fechaInicio;
	}

	public Date getFechaFin() {
		return fechaFin;
	}

	public void setFechaFin(Date fechaFin) {
		this.fechaFin = fechaFin;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public List<MiniActividad> getMiniActividades() {
		return miniActividades;
	}

	public void setMiniActividades(List<MiniActividad> miniActividades) {
		this.miniActividades = miniActividades;
	} 
	
	
	
	
}
