package hon.gant.dao;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import hon.gant.ent.EstadoGant;
import hon.gant.util.Constantes;

@Stateless
public class EstadoGantDao {

	@PersistenceContext(unitName="HON")
	protected EntityManager entityManager;
	
	public List<EstadoGant> getAllEstadoGant() {
		TypedQuery<EstadoGant> q = entityManager.createNamedQuery(EstadoGant.ALL, EstadoGant.class);
		q.setParameter("estado", Constantes.ESTADO_OK);
		List<EstadoGant> lista = q.getResultList();
		return lista;
	}
}
