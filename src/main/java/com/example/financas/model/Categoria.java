package com.example.financas.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "categorias")
@Getter
@Setter
public class Categoria {
	
	public Categoria() {
		
	}
	
	public Categoria(String descricao, LocalDate dataCriacao) {
		this.descricao = descricao;
		this.dataCriacao = dataCriacao;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idCategoria;
	
	@Column
	private String descricao;
	
	@Column(name="data_criacao")
	private LocalDate dataCriacao;
}
