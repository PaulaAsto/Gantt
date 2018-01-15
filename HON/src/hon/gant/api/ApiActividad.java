package hon.gant.api;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;

import hon.gant.dao.ActividadDao;
import hon.gant.dto.ActividadDto;

@Path("/apiActividad") 
@Stateless
@LocalBean
public class ApiActividad extends Application {

	@EJB
	ActividadDao actividadDao;
	
	@POST
	@Path("/cActividad") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void c(ActividadDto filtro) {
		actividadDao.cActividad(filtro);
	}
}
