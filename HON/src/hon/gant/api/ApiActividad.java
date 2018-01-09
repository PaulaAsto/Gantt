package hon.gant.api;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.Path;
import javax.ws.rs.core.Application;

@Path("/apiActividad") 
@Stateless
@LocalBean
public class ApiActividad extends Application {

}
