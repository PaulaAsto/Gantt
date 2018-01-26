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

import hon.gant.dao.MiniActividadDao;
import hon.gant.dto.MiniActividadDto;
import hon.gant.ent.MiniActividad;

@Path("/apiMiniActividad") 
@Stateless
@LocalBean
public class ApiMiniActividad extends Application {

	@EJB
	 MiniActividadDao miniActividadDao;
	
	@POST
	@Path("/cMiniActividad") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void c(MiniActividadDto filtro) {
		miniActividadDao.cMiniActividad(filtro);
	}
	
	@POST
	@Path("/allMiniActividad") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<MiniActividad> r(MiniActividadDto filtro) {
		return miniActividadDao.getAllMiniActividad(filtro);
	}
	
	@POST
	@Path("/dMiniActividad") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void d(MiniActividadDto filtro) {
		miniActividadDao.dMiniActividad(filtro);
	}
	
	@POST
	@Path("/uEstadoOfMiniActividad") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void uEstado(MiniActividadDto filtro) {
		miniActividadDao.uEstadoOfMiniActividad(filtro);
	}
}
