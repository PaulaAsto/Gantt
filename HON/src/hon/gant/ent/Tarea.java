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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "tarea")
@NamedQueries({
	@NamedQuery(name="Tarea.all", query="SELECT NEW hon.gant.ent.Tarea(t.id, t.nombre) FROM Tarea t INNER JOIN t.proyecto p where p.id = :idProyecto and t.estado= :estado and p.estado = :estado order by t.id")
})
public class Tarea implements Serializable{

	private static final long serialVersionUID = 1L;
	public static final String ALL="Tarea.all";

	@Id
	@SequenceGenerator(name="TAREA_GENERATOR", sequenceName="sec_tarea", allocationSize = 1, initialValue= 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="TAREA_GENERATOR")
	@Column(name="tare_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "proy_id")
	private Proyecto proyecto;

	@Column(name="nombre")
	private String nombre;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="fechainicio")
	private Date fechaInicio;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="fechafin")
	private Date fechaFin;

	@Column(name="color")
	private String color;

	@Column(name="descripcion")
	private Integer descripcion;

	@Column(name="est")
	private Integer estado;

	@OneToMany(mappedBy = "tarea" , fetch = FetchType.LAZY)
	private List<Actividad> actividades;

	public Tarea() {}

	public Tarea(Long id, String nombre) {
		this.id = id;
		this.nombre = nombre;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Proyecto getProyecto() {
		return proyecto;
	}

	public void setProyecto(Proyecto proyecto) {
		this.proyecto = proyecto;
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
	

	public Integer getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(Integer descripcion) {
		this.descripcion = descripcion;
	}

	public Integer getEstado() {
		return estado;
	}

	public void setEstado(Integer estado) {
		this.estado = estado;
	}

	public List<Actividad> getActividades() {
		return actividades;
	}

	public void setActividades(List<Actividad> actividades) {
		this.actividades = actividades;
	}



}
