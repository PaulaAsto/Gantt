package hon.gant.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class Funciones {
	public static boolean esListaVacia(List<?> lista) {
		if(lista.isEmpty())return true;
		else return false;
	}

	public static Date fechaInicio() throws ParseException {
		String string ="3000-01-01 12:00:00.705";
		Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").parse(string);
		return date;
	}

	public static Date fechaFin() throws ParseException {
		String string ="1999-01-01 01:00:00.705";
		Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").parse(string);
		return date;
	}

	public static List<Date> MinAndMaxFechas(List<Date> fechas) throws ParseException {
		Date fechaMinTemp = fechaInicio();
		Date fechaMaxTemp = fechaFin();
		List<Date> listMinAndMax = new ArrayList<Date>();
		Iterator<Date> it = fechas.iterator();
		while (it.hasNext()) {
			Date t = it.next();
			if(t.before(fechaMinTemp)) fechaMinTemp = t; 
			if(t.after(fechaMaxTemp)) fechaMaxTemp = t;
		}
		listMinAndMax.add(fechaMinTemp);
		listMinAndMax.add(fechaMaxTemp);
		return listMinAndMax;
		
	}

	public static Integer diferenciaEnDias(Date fechaMayor, Date fechaMenor) {
		int dias=(int) ((fechaMayor.getTime()-fechaMenor.getTime())/(1000 * 60 * 60 * 24));
		return  dias;
	}
}
