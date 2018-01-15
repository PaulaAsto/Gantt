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

import hon.gant.dao.TareaDao;
import hon.gant.dto.TareaDto;
import hon.gant.ent.Tarea;

@Path("/apiTarea") 
@Stateless
@LocalBean
public class ApiTarea extends Application{

	@EJB
	TareaDao tareaDao;
	
	@POST
	@Path("/cTarea") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void c(TareaDto filtro) {
		tareaDao.cTarea(filtro);
	}
	
	@POST
	@Path("/allTarea") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Tarea> r(TareaDto filtro) {
		return tareaDao.getAllTasks(filtro);
	}
}
