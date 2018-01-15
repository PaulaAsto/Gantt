package hon.gant.dao;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import hon.gant.dto.ActividadDto;
import hon.gant.util.Constantes;

@Stateless
public class ActividadDao {
	 @PersistenceContext(unitName="HON")
	 protected EntityManager entityManager;
	 
	 public void cActividad(ActividadDto filtro) {
		 StringBuilder jpaql = new StringBuilder();
		 
		 jpaql.append(" INSERT INTO actividad (acti_id, tare_id, nombre, fechainicio, fechafin, color, descripcion, est) ");
		 jpaql.append(" VALUES (NEXTVAL('sec_actividad'),?,?, NOW(), NOW(), ?, ?, ?) ");

		 Query query = entityManager.createNativeQuery(jpaql.toString());
		 query.setParameter(1, filtro.getNombre());
		 query.setParameter(2, filtro.getNombre());
		 query.setParameter(3, Constantes.COLOR_DEFECTO);
		 query.setParameter(4, filtro.getDescripcion());
		 query.setParameter(5, Constantes.ESTADO_OK);
		 query.executeUpdate();
	 }
}
