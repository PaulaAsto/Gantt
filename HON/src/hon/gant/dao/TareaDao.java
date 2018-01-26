package hon.gant.dao;

import java.text.ParseException;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import hon.gant.dto.TareaDto;
import hon.gant.ent.Tarea;
import hon.gant.util.Constantes;
import hon.gant.util.Funciones;

@Stateless
public class TareaDao {

	@PersistenceContext(unitName="HON")
	protected EntityManager entityManager;

	public void cTarea(TareaDto filtro) throws ParseException {
		StringBuilder jpaql = new StringBuilder();

		jpaql.append(" INSERT INTO tarea (tare_id, proy_id, nombre, fechainicio, fechafin, color, descripcion, est) ");
		jpaql.append(" VALUES (NEXTVAL('sec_tarea'), ?, ?, ?, ?, ?, ?, ?) ");

		Query query = entityManager.createNativeQuery(jpaql.toString());
		query.setParameter(1, filtro.getIdProyecto());
		query.setParameter(2, filtro.getNombre());
		query.setParameter(3, Funciones.fechaInicio());
		query.setParameter(4, Funciones.fechaFin());
		query.setParameter(5, Constantes.COLOR_DEFECTO);
		query.setParameter(6, filtro.getDescripcion());
		query.setParameter(7, Constantes.ESTADO_OK);
		query.executeUpdate();
	}

	public List<Tarea> getAllTasks(TareaDto filtro) {
		TypedQuery<Tarea> q = entityManager.createNamedQuery(Tarea.ALL, Tarea.class);
		q.setParameter("idProyecto", filtro.getIdProyecto());
		q.setParameter("estado", filtro.getEstado());
		List<Tarea> lista = q.getResultList();
		return lista;
	}

	public Tarea fTareaById(TareaDto filtro) {
		TypedQuery<Tarea> q = entityManager.createNamedQuery(Tarea.FBYID, Tarea.class);
		q.setParameter("id", filtro.getId());
		q.setParameter("estado", Constantes.ESTADO_OK);
		List<Tarea> lista = q.getResultList();
		return lista.get(Constantes.ELEMENTO_PRIMERO);
	}

	public void dTask(TareaDto filtro) {
		StringBuilder jpaql = new StringBuilder();

		jpaql.append(" UPDATE Tarea t SET t.estado = :estado ");
		jpaql.append(" WHERE t.id = :id ");

		Query query = entityManager.createQuery(jpaql.toString());
		query.setParameter("id", filtro.getId());
		query.setParameter("estado", Constantes.ESTADO_ANULADO);
		query.executeUpdate();
	}

	public void uTareaFechas(TareaDto filtro) {
		StringBuilder jpaql = new StringBuilder();

		jpaql.append(" UPDATE Tarea t SET t.fechaInicio = :fechaini , ");
		jpaql.append(" t.fechaFin = :fechafin ");	
		jpaql.append(" WHERE t.id = :id ");

		Query query = entityManager.createQuery(jpaql.toString());
		query.setParameter("id", filtro.getId());
		query.setParameter("fechaini", filtro.getFechaInicio());
		query.setParameter("fechafin", filtro.getFechaFin());
		query.executeUpdate();
	}

	public List<Tarea> getFechasTarea(TareaDto filtro) {
		TypedQuery<Tarea> q = entityManager.createNamedQuery(Tarea.ALLFECHAS, Tarea.class);
		q.setParameter("idProyecto", filtro.getIdProyecto());
		q.setParameter("estado", Constantes.ESTADO_OK);
		List<Tarea> lista = q.getResultList();
		return lista;
	}
	
	public void uTarea(TareaDto filtro) {
		StringBuilder jpaql = new StringBuilder();

		jpaql.append(" UPDATE Tarea t SET t.nombre = :nombre, t.descripcion = :descripcion ");
		jpaql.append(" WHERE t.id = :id ");

		Query query = entityManager.createQuery(jpaql.toString());
		query.setParameter("id", filtro.getId());
		query.setParameter("nombre", filtro.getNombre());
		query.setParameter("descripcion", filtro.getDescripcion());
		query.executeUpdate();
	}
}
