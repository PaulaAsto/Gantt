package hon.gant.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import hon.gant.dto.TareaDto;
import hon.gant.ent.Tarea;
import hon.gant.util.Constantes;

@Stateless
public class TareaDao {

	@PersistenceContext(unitName="HON")
	protected EntityManager entityManager;

	public void cTarea(TareaDto filtro) {
		StringBuilder jpaql = new StringBuilder();

		jpaql.append(" INSERT INTO tarea (tare_id, proy_id, nombre, fechainicio, fechafin, color, descripcion, est) ");
		jpaql.append(" VALUES (NEXTVAL('sec_tarea'),?,?, NOW(), NOW(), ?, ?, ?) ");

		Query query = entityManager.createNativeQuery(jpaql.toString());
		query.setParameter(1, filtro.getIdProyecto());
		query.setParameter(2, filtro.getNombre());
		query.setParameter(3, Constantes.COLOR_DEFECTO);
		query.setParameter(4, filtro.getDescripcion());
		query.setParameter(5, Constantes.ESTADO_OK);
		query.executeUpdate();
	}
	
	public List<Tarea> getAllTasks(TareaDto filtro) {
		 TypedQuery<Tarea> q = entityManager.createNamedQuery(Tarea.ALL, Tarea.class);
		 q.setParameter("idProyecto", filtro.getIdProyecto());
		 q.setParameter("estado", filtro.getEstado());
		 List<Tarea> lista = q.getResultList();
		 return lista;
	 }
}
