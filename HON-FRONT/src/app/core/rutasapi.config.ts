export class RutasApiConfig {
    /* Rutas */
    public static ROOT = 'http://localhost:8080/HON';
    /** Project */
    public static ALL_PROJECTS = '/rest/apiProyecto/allProject';
    public static C_PROJECT = '/rest/apiProyecto/cProject';
    public static U_PROJECT = '/rest/apiProyecto/uProject';
    public static D_PROJECT = '/rest/apiProyecto/dProject';
    public static FBYNOMBRE_PROJECT = '/rest/apiProyecto/fByNombre';
    public static FBYID_PROJECT = '/rest/apiProyecto/fById';

    /** Task */
    public static C_TASK = '/rest/apiTarea/cTarea';
    public static ALL_TASKS = '/rest/apiTarea/allTarea';
    public static FBYID_TASK = '/rest/apiTarea/fById';
    public static D_TASK = '/rest/apiTarea/dTask';
    public static U_FECHA_TASK = '/rest/apiTarea/uFechaTarea';
    public static DAYS_MIN_MAX_PROY = '/rest/apiTarea/daysMinAndMaxByIdProyect';
    public static U_TASK = '/rest/apiTarea/uTarea';
    
    /** Acivity */
    public static C_ACTIVITY = '/rest/apiActividad/cActividad';
    public static ALL_ACTIVITIES = '/rest/apiActividad/allActividad';
    public static FBYID_ACTIVITY = '/rest/apiActividad/fById';
    public static U_ACTIVITY = '/rest/apiActividad/uActividad';
    public static D_ACTIVITY = '/rest/apiActividad/dActividad';
    public static FWITHFECHASBYID_ACTIVITY = '/rest/apiActividad/fWithFechasById';
    public static DAYS_MIN_MAX_TASK = '/rest/apiActividad/daysMinAndMaxByIdTarea';
    
    
    /** MiniAcivity */
    public static C_MINIACTIVITY = '/rest/apiMiniActividad/cMiniActividad';
    public static ALL_MINIACTIVITY = '/rest/apiMiniActividad/allMiniActividad';
    public static D_MINIACTIVITY = '/rest/apiMiniActividad/dMiniActividad';
    public static U_ESTADO_MINIACTIVITY = '/rest/apiMiniActividad/uEstadoOfMiniActividad';
    
    
    /** EstadoGant */
    public static ALL_ESTADOGANT = '/rest/apiEstadoGant/allEstadoGant';
  }