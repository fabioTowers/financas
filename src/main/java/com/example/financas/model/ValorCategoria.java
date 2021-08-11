package com.example.financas.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValorCategoria {

	public ValorCategoria(String descricao, Float valor) {
		super();
		this.descricao = descricao;
		this.valor = valor;
	}

	private String descricao;
	
	private Float valor;
}
