package hon.gant.api;

import java.text.ParseException;
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

import hon.gant.dao.TareaDao;
import hon.gant.dto.TareaDto;
import hon.gant.ent.Tarea;
import hon.gant.util.Funciones;

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
	public void c(TareaDto filtro) throws ParseException {
		tareaDao.cTarea(filtro);
	}

	@POST
	@Path("/allTarea") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Tarea> r(TareaDto filtro) {
		return tareaDao.getAllTasks(filtro);
	}

	@POST
	@Path("/fById") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Tarea fTaskById(TareaDto filtro) {
		return tareaDao.fTareaById(filtro);
	}

	@POST
	@Path("/dTask") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void d(TareaDto filtro) {
		tareaDao.dTask(filtro);
	}

	@POST
	@Path("/uFechaTarea") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void uFecha(TareaDto filtro) {
		tareaDao.uTareaFechas(filtro);
	}

	@POST
	@Path("/daysMinAndMaxByIdProyect")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public List<Date> daysMinAndMaxByIdProyect(TareaDto filtro){
		List<Tarea> ftareas = tareaDao.getFechasTarea(filtro);
		Iterator<Tarea> it = ftareas.iterator();
		List<Date> fechas = new ArrayList<Date>();
		List<Date> fechaMinAndMax = new ArrayList<Date>();
		while (it.hasNext()) {
			Tarea t = it.next();
			fechas.add(t.getFechaInicio());
			fechas.add(t.getFechaFin());
		}
		try {
			fechaMinAndMax = Funciones.MinAndMaxFechas(fechas);
		}
		catch(Exception e) {}
		return fechaMinAndMax;
	}
	
	@POST
	@Path("/uTarea") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void u(TareaDto filtro) {
		tareaDao.uTarea(filtro);
	}
	
	@POST
	@Path("/uColorTarea") 
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void uColor(TareaDto filtro) {
		tareaDao.uColorTarea(filtro);
	}

}
