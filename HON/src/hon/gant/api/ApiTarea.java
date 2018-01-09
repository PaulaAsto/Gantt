package hon.gant.api;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.Path;
import javax.ws.rs.core.Application;

@Path("/apiTarea") 
@Stateless
@LocalBean
public class ApiTarea extends Application{

}
