package hon.gant.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import hon.gant.dto.ProyectoDto;
import hon.gant.ent.Proyecto;
import hon.gant.util.Constantes;
import hon.gant.util.Funciones;

@Stateless
public class ProyectoDao {

	 @PersistenceContext(unitName="HON")
	 protected EntityManager entityManager;

	 public List<Proyecto> getAllProjects(ProyectoDto filtro) {
		 TypedQuery<Proyecto> q = entityManager.createNamedQuery(Proyecto.ALL, Proyecto.class);
		 q.setParameter("estado", filtro.getEstado());
		 List<Proyecto> lista = q.getResultList();
		 return lista;
	 }
	 
	 public void cProject(ProyectoDto filtro) {
		 StringBuilder jpaql = new StringBuilder();
		 
		 jpaql.append(" INSERT INTO proyecto (proy_id, nombre, est) VALUES (NEXTVAL('sec_proyecto'),?, ?) ");

		 Query query = entityManager.createNativeQuery(jpaql.toString());
		 query.setParameter(1, filtro.getNombre());
		 query.setParameter(2, Constantes.ESTADO_OK);
		 query.executeUpdate();
	 }
	 
	 public void uProject(ProyectoDto filtro) {
		 StringBuilder jpaql = new StringBuilder();
		 
		 jpaql.append(" UPDATE Proyecto p SET p.nombre = :nombre ");
		 jpaql.append(" WHERE p.id = :id ");

		 Query query = entityManager.createQuery(jpaql.toString());
		 query.setParameter("id", filtro.getId());
		 query.setParameter("nombre", filtro.getNombre());
		 query.executeUpdate();
	 }
	 
	 public void dProject(ProyectoDto filtro) {
		 StringBuilder jpaql = new StringBuilder();
		 
		 jpaql.append(" UPDATE Proyecto p SET p.estado = :estado ");
		 jpaql.append(" WHERE p.id = :id ");

		 Query query = entityManager.createQuery(jpaql.toString());
		 query.setParameter("id", filtro.getId());
		 query.setParameter("estado", Constantes.ESTADO_ANULADO);
		 query.executeUpdate();
	 }
	 
	 public Proyecto fProjectByName(ProyectoDto filtro) {
		 TypedQuery<Proyecto> q = entityManager.createNamedQuery(Proyecto.FBYNOMBRE, Proyecto.class);
		 q.setParameter("nombre", filtro.getNombre());
		 q.setParameter("estado", Constantes.ESTADO_OK);
		 List<Proyecto> lista = q.getResultList();
		 return !Funciones.esListaVacia(lista) ? lista.get(Constantes.ELEMENTO_PRIMERO) : null;
	 }
	 
	 public Proyecto fProjectById(ProyectoDto filtro) {
		 TypedQuery<Proyecto> q = entityManager.createNamedQuery(Proyecto.FBYID, Proyecto.class);
		 q.setParameter("id", filtro.getId());
		 q.setParameter("estado", Constantes.ESTADO_OK);
		 List<Proyecto> lista = q.getResultList();
		 return lista.get(Constantes.ELEMENTO_PRIMERO);
	 }
}
