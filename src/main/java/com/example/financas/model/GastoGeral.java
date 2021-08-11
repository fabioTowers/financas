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
@Table(name = "gastosGerais")
@Getter
@Setter
public class GastoGeral {
	

	public GastoGeral(LocalDate dataCompra, String descricao, Categoria categoria, Float valor, MesAno mesAno) {
		super();
		this.dataCompra = dataCompra;
		this.descricao = descricao;
		this.categoria = categoria;
		this.valor = valor;
		this.mesAno = mesAno;
	}
	
	public GastoGeral() {
		super();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="data_compra")
	private LocalDate dataCompra;
	
	@Column
	private String descricao;
	
	/*Uma categorias pode estar em muitos gastos gerais*/
	@ManyToOne
	@JoinColumn(name="categoria_id") //O nome da chave estrangeira
	private Categoria categoria;
	
	@Column
	private Float valor;
	
	/*Um mesmo mes e ano pode estar em muitos gastos gerais*/
	@ManyToOne
	@JoinColumn(name="mes_ano_id") //O nome da chave estrangeira
	private MesAno mesAno;
}
