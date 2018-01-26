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
	@NamedQuery(name="Tarea.all", query="SELECT NEW hon.gant.ent.Tarea(t.id, t.nombre, t.fechaInicio, t.fechaFin, t.color) FROM Tarea t INNER JOIN t.proyecto p where p.id = :idProyecto and t.estado= :estado and p.estado = :estado order by t.id"),
	@NamedQuery(name="Tarea.fById", query="SELECT NEW hon.gant.ent.Tarea(t.id, t.nombre, t.descripcion, t.fechaInicio, t.fechaFin) FROM Tarea t where t.id= :id and t.estado =:estado"),
	@NamedQuery(name="Tarea.allFechas", query="SELECT NEW hon.gant.ent.Tarea(t.id, t.fechaInicio, t.fechaFin) FROM Tarea t INNER JOIN t.proyecto p where p.id = :idProyecto and t.estado= :estado and p.estado = :estado order by t.id")
})
public class Tarea implements Serializable{

	private static final long serialVersionUID = 1L;
	public static final String ALL="Tarea.all";
	public static final String FBYID="Tarea.fById";
	public static final String ALLFECHAS="Tarea.allFechas";

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
	private String descripcion;

	@Column(name="est")
	private Integer estado;

	@OneToMany(mappedBy = "tarea" , fetch = FetchType.LAZY)
	private List<Actividad> actividades;

	public Tarea() {}

	//Tarea.all
	public Tarea(Long id, String nombre, Date fechaInicio, Date fechaFin, String color) {
		this.id = id;
		this.nombre = nombre;
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
		this.color = color;
	}
	
	//Tarea.fById
	public Tarea(Long id, String nombre, String descripcion, Date fechaInicio, Date fechaFin) {
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
	}
	
	//Tarea.allFechas
	public Tarea(Long id, Date fechaInicio, Date fechaFin) {
		this.id = id;
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
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

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
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
