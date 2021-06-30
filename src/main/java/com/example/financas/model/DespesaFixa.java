package com.example.financas.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "despesas_fixas")
@Getter
@Setter
public class DespesaFixa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String descricao;
	
	/*Uma categorias pode estar em muitas despesas fixas*/
	@ManyToOne
	@JoinColumn(name="categoria_id") //O nome da chave estrangeira
	private Categoria categoria;
	
	@Column
	private Float valor;
	
	@Column
	private String status;
	
	@Column(name="data_pagamento")
	private LocalDate dataPagamento;
	
	/*Um mesmo mes e ano pode estar em muitas despesas fixas*/
	@ManyToOne
	@JoinColumn(name="mes_ano_id") //O nome da chave estrangeira
	private MesAno mesAno;
}
