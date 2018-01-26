package hon.gant.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
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

import hon.gant.dao.ActividadDao;
import hon.gant.dto.ActividadDto;
import hon.gant.ent.Actividad;
import hon.gant.util.Funciones;

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
	
	@POST
	@Path("/allActividad") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Actividad> r(ActividadDto filtro) {
		return actividadDao.getAllActividades(filtro);
	}
	
	@POST
	@Path("/fById") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Actividad fActividadById(ActividadDto filtro) {
		return actividadDao.fActividadById(filtro);
	}
	
	@POST
	@Path("/uActividad") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void u(ActividadDto filtro) {
		actividadDao.uActividad(filtro);
	}
	
	@POST
	@Path("/dActividad") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void d(ActividadDto filtro) {
		actividadDao.dActividad(filtro);
	}
	
	@POST
	@Path("/fWithFechasById") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Actividad fActividadWithFechasById(ActividadDto filtro) {
		return actividadDao.fActividadWithFechasById(filtro);
	}
	
	@POST
	@Path("/daysMinAndMaxByIdTarea")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Date> daysMinAndMaxByIdTarea(ActividadDto filtro){
		List<Actividad> factividad = actividadDao.getFechasActividad(filtro);
		Iterator<Actividad> it = factividad.iterator();
		List<Date> fechas = new ArrayList<Date>();
		List<Date> fechaMinAndMax = new ArrayList<Date>();
		while (it.hasNext()) {
			Actividad t = it.next();
			fechas.add(t.getFechaInicio());
			fechas.add(t.getFechaFin());
		}
		try {
			fechaMinAndMax = Funciones.MinAndMaxFechas(fechas);
		}
		catch(Exception e) {}
		return fechaMinAndMax;
	}
}
