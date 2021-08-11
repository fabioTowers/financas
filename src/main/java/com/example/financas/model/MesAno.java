package com.example.financas.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "mesAno")
@Getter
@Setter
public class MesAno {

	public MesAno(String descricao) {
		super();
		this.descricao = descricao;
	}

	public MesAno() {}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idMesAno;
	
	@Column
	private String descricao;
	
}
