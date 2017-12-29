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

	 public List<Proyecto> retrieveParentWithChildren(ProyectoDto filtro) {
		 TypedQuery<Proyecto> q = entityManager.createNamedQuery(Proyecto.ALL, Proyecto.class);
				 //.createQuery("SELECT p FROM " + "Proyecto " + "p ");
		 q.setParameter("id", filtro.getId());
		 List<Proyecto> lista = q.getResultList();
		 return lista;
	 }
}
