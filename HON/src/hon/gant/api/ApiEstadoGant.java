package hon.gant.api;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import hon.gant.dao.EstadoGantDao;
import hon.gant.ent.EstadoGant;

@Path("/apiEstadoGant") 
@Stateless
@LocalBean
public class ApiEstadoGant extends Application {

	@EJB
	EstadoGantDao estadoGantDao;
	
	@POST
	@Path("/allEstadoGant") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<EstadoGant> r() {
		return estadoGantDao.getAllEstadoGant();
	}
}
