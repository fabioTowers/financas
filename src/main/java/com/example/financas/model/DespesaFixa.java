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

import com.example.financas.controller.DespesaFixaController;

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
	
	@Column
	private String observacao;
	
	/*Um mesmo mes e ano pode estar em muitas despesas fixas*/
	@ManyToOne
	@JoinColumn(name="mes_ano_id") //O nome da chave estrangeira
	private MesAno mesAno;
	
	public void atualizarRegistro(DespesaFixa novoRegistro) {
		this.setDescricao(novoRegistro.getDescricao());
		this.setCategoria(novoRegistro.getCategoria());
		this.setValor(novoRegistro.getValor());
		this.setStatus(novoRegistro.getStatus());
		this.setDataPagamento(novoRegistro.getDataPagamento());
		this.setObservacao(novoRegistro.getObservacao());
		this.setMesAno(novoRegistro.getMesAno());
	}
}
