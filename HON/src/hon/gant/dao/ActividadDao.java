package hon.gant.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import hon.gant.dto.ActividadDto;
import hon.gant.ent.Actividad;
import hon.gant.util.Constantes;

@Stateless
public class ActividadDao {
	@PersistenceContext(unitName="HON")
	protected EntityManager entityManager;

	public void cActividad(ActividadDto filtro) {
		StringBuilder jpaql = new StringBuilder();

		jpaql.append(" INSERT INTO actividad (acti_id, tare_id, nombre, fechainicio, fechafin, color, descripcion, est) ");
		jpaql.append(" VALUES (NEXTVAL('sec_actividad'), ?, ?, ?, ?, ?, ?, ?) ");

		Query query = entityManager.createNativeQuery(jpaql.toString());
		query.setParameter(1, filtro.getIdTarea());
		query.setParameter(2, filtro.getNombre());
		query.setParameter(3, filtro.getFechaInicio());
		query.setParameter(4, filtro.getFechaFin());
		query.setParameter(5, Constantes.COLOR_DEFECTO);
		query.setParameter(6, filtro.getDescripcion());
		query.setParameter(7, Constantes.ESTADO_OK);
		query.executeUpdate();
	}

	public List<Actividad> getAllActividades(ActividadDto filtro) {
		TypedQuery<Actividad> q = entityManager.createNamedQuery(Actividad.ALL, Actividad.class);
		q.setParameter("idTarea", filtro.getIdTarea());
		q.setParameter("estado", Constantes.ESTADO_OK);
		List<Actividad> lista = q.getResultList();
		return lista;
	}

	public Actividad fActividadById(ActividadDto filtro) {
		TypedQuery<Actividad> q = entityManager.createNamedQuery(Actividad.FBYID, Actividad.class);
		q.setParameter("id", filtro.getId());
		q.setParameter("estado", Constantes.ESTADO_OK);
		List<Actividad> lista = q.getResultList();
		return lista.get(Constantes.ELEMENTO_PRIMERO);
	}

	public void uActividad(ActividadDto filtro) {
		StringBuilder jpaql = new StringBuilder();

		jpaql.append(" UPDATE Actividad a SET a.nombre = :nombre, ");
		jpaql.append(" a.descripcion = :descripcion, ");
		jpaql.append(" a.fechaInicio = :fechaInicio, ");
		jpaql.append(" a.fechaFin = :fechaFin ");
		jpaql.append(" WHERE a.id = :id ");

		Query query = entityManager.createQuery(jpaql.toString());
		query.setParameter("id", filtro.getId());
		query.setParameter("nombre", filtro.getNombre());
		query.setParameter("descripcion", filtro.getDescripcion());
		query.setParameter("fechaInicio", filtro.getFechaInicio());
		query.setParameter("fechaFin", filtro.getFechaFin());
		query.executeUpdate();
	}

	public void dActividad(ActividadDto filtro) {
		StringBuilder jpaql = new StringBuilder();

		jpaql.append(" UPDATE Actividad a SET a.estado = :estado ");
		jpaql.append(" WHERE a.id = :id ");

		Query query = entityManager.createQuery(jpaql.toString());
		query.setParameter("id", filtro.getId());
		query.setParameter("estado", Constantes.ESTADO_ANULADO);
		query.executeUpdate();
	}

	public Actividad fActividadWithFechasById(ActividadDto filtro) {
		TypedQuery<Actividad> q = entityManager.createNamedQuery(Actividad.FWITHFECHASBYID, Actividad.class);
		q.setParameter("id", filtro.getId());
		q.setParameter("estado", Constantes.ESTADO_OK);
		List<Actividad> lista = q.getResultList();
		return lista.get(Constantes.ELEMENTO_PRIMERO);
	}
	
	public List<Actividad> getFechasActividad(ActividadDto filtro) {
		TypedQuery<Actividad> q = entityManager.createNamedQuery(Actividad.ALLFECHAS, Actividad.class);
		q.setParameter("idTarea", filtro.getIdTarea());
		q.setParameter("estado", Constantes.ESTADO_OK);
		List<Actividad> lista = q.getResultList();
		return lista;
	}
	
	public void uColorActividad(ActividadDto filtro) {
		StringBuilder jpaql = new StringBuilder();

		jpaql.append(" UPDATE Actividad a SET a.color = :color ");
		jpaql.append(" WHERE a.id = :id ");

		Query query = entityManager.createQuery(jpaql.toString());
		query.setParameter("id", filtro.getId());
		query.setParameter("color", filtro.getColor());
		query.executeUpdate();
	}


}
