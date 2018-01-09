package hon.gant.api;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.Path;
import javax.ws.rs.core.Application;

@Path("/apiMiniActividad") 
@Stateless
@LocalBean
public class ApiMiniActividad extends Application {

}
