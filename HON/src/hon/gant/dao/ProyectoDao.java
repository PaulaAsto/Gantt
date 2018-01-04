package hon.gant.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import hon.gant.dto.ProyectoDto;
import hon.gant.ent.Proyecto;

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
}
