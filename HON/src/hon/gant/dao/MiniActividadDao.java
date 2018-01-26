package hon.gant.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import hon.gant.dto.MiniActividadDto;
import hon.gant.ent.MiniActividad;
import hon.gant.util.Constantes;

@Stateless
public class MiniActividadDao {

	@PersistenceContext(unitName="HON")
	protected EntityManager entityManager;

	public void cMiniActividad(MiniActividadDto filtro) {
		StringBuilder jpaql = new StringBuilder();

		jpaql.append(" INSERT INTO miniactividad (mini_acti_id, acti_id, esta_id, nombre, color, est) ");
		jpaql.append(" VALUES (NEXTVAL('sec_miniactividad'),?, ?, ?, ?, ?) ");

		Query query = entityManager.createNativeQuery(jpaql.toString());
		query.setParameter(1, filtro.getIdActividad());
		query.setParameter(2, filtro.getIdEstado());
		query.setParameter(3, filtro.getNombre());
		query.setParameter(4, Constantes.COLOR_DEFECTO);
		query.setParameter(5, Constantes.ESTADO_OK);
		query.executeUpdate();
	}

	public List<MiniActividad> getAllMiniActividad(MiniActividadDto filtro) {
		TypedQuery<MiniActividad> q = entityManager.createNamedQuery(MiniActividad.ALL, MiniActividad.class);
		q.setParameter("idActividad", filtro.getIdActividad());
		q.setParameter("idEstado", filtro.getIdEstado());
		q.setParameter("estado", Constantes.ESTADO_OK);
		List<MiniActividad> lista = q.getResultList();
		return lista;
	}

	public void dMiniActividad(MiniActividadDto filtro) {
		StringBuilder jpaql = new StringBuilder();

		jpaql.append(" UPDATE MiniActividad m SET m.estado = :estado ");
		jpaql.append(" WHERE m.id = :id ");

		Query query = entityManager.createQuery(jpaql.toString());
		query.setParameter("id", filtro.getId());
		query.setParameter("estado", Constantes.ESTADO_ANULADO);
		query.executeUpdate();
	}
	
	public void uEstadoOfMiniActividad(MiniActividadDto filtro) {
		 StringBuilder jpaql = new StringBuilder();
		 
		 jpaql.append(" UPDATE MiniActividad m SET m.estadoGant.id = :idEstado ");
		 jpaql.append(" WHERE m.id = :id ");

		 Query query = entityManager.createQuery(jpaql.toString());
		 query.setParameter("idEstado", filtro.getIdEstado());
		 query.setParameter("id", filtro.getId());
		 query.executeUpdate();
	 }
}
