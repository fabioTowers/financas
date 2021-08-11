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
@Table(name = "receitas")
@Getter
@Setter
public class Receita {

	public Receita(String descricao, String fonte, LocalDate dataRecebimento, Float valor, MesAno mesAno) {
		super();
		this.descricao = descricao;
		this.fonte = fonte;
		this.dataRecebimento = dataRecebimento;
		this.valor = valor;
		this.mesAno = mesAno;
	}
	
	public Receita() {
		super();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String descricao;
	
	@Column
	private String fonte;
	
	@Column(name="data_recebimento")
	private LocalDate dataRecebimento;
	
	@Column
	private Float valor;
	
	/*Um mesmo mes e ano pode estar em muitas receitas*/
	@ManyToOne
	@JoinColumn(name="mes_ano_id") //O nome da chave estrangeira
	private MesAno mesAno;
	
	@Column
	private String observacao;
}
