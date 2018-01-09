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
import javax.ws.rs.core.Response;

import hon.gant.dao.ProyectoDao;
import hon.gant.dto.ProyectoDto;
import hon.gant.ent.Proyecto;

@Path("/apiProyecto") 
@Stateless
@LocalBean
public class ApiProyecto extends Application{

	 @EJB
	 ProyectoDao proyectoDao;

	@POST
	@Path("/allProject") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Proyecto> r(ProyectoDto filtro) {
		return proyectoDao.getAllProjects(filtro);
	}
	
	@POST
	@Path("/cProject") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void c(ProyectoDto filtro) {
		proyectoDao.cProject(filtro);
	}
	
	@POST
	@Path("/uProject") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void u(ProyectoDto filtro) {
		proyectoDao.uProject(filtro);
	}
	
	@POST
	@Path("/dProject") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void d(ProyectoDto filtro) {
		proyectoDao.dProject(filtro);
	}
	
	@POST
	@Path("/prueba")
	public Response imprimirMessage() {
		String salida = "Hola desde un Restful Web Service: Honami ";
		return Response.status(200).entity(salida).build();
	}
	
}
