package com.example.financas.model;

import java.time.LocalDate;

import javax.persistence.CascadeType;
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
@Table(name = "despesas_variaveis")
@Getter
@Setter
public class DespesaVariavel {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String descricao;
	
	/*Uma categorias pode estar em muitas despesas variaveis*/
	@ManyToOne
	@JoinColumn(name="categoria_id") //O nome da chave estrangeira
	private Categoria categoria;
	
	@Column(name="valor_planejado")
	private Float valorPlanejado;
	
	@Column(name="valor_pago")
	private Float valorPago;
	
	@Column
	private String status;
	
	@Column(name="data_pagamento")
	private LocalDate dataPagamento;
	
	@Column
	private String observacao;
	
	/*Um mesmo mes e ano pode estar em muitas despesas variaveis*/
	@ManyToOne(cascade=CascadeType.PERSIST)
	@JoinColumn(name="mes_ano_id") //O nome da chave estrangeira
	private MesAno mesAno;
	
	public void atualizarRegistro(DespesaVariavel novoRegistro) {
		this.setCategoria(novoRegistro.getCategoria());
		this.setDataPagamento(novoRegistro.getDataPagamento());
		this.setDescricao(novoRegistro.getDescricao());
		this.setMesAno(novoRegistro.getMesAno());
		this.setObservacao(novoRegistro.getObservacao());
		this.setStatus(novoRegistro.getStatus());
		this.setValorPago(novoRegistro.getValorPago());
		this.setValorPlanejado(novoRegistro.getValorPlanejado());
	}
}
