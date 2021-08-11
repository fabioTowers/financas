package com.example.financas.controller;

import java.util.Collections;
import java.util.List;

import com.example.financas.model.MesAno;

public class ListaPorMes implements Runnable {
	
	private Class<?> classe;
	private Object obj;
	private MesAno mes;
	private List lista;
	
	public ListaPorMes(Class<?> classe, Object obj, MesAno mes) {
		this.classe = classe;
		this.obj = obj;
		this.mes = mes;
	}
	
	public List registrosAgrupadorPorMes() {
		return lista;
	}

	@Override
	public void run() {
		try {
			lista = (List) classe.getDeclaredMethod("findByMesAno", MesAno.class).invoke(obj, mes);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
