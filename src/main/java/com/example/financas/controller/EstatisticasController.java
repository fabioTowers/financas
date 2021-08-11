package com.example.financas.controller;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.financas.model.DespesaFixa;
import com.example.financas.model.DespesaVariavel;
import com.example.financas.model.GastoGeral;
import com.example.financas.model.MesAno;
import com.example.financas.model.ValorCategoria;
import com.example.financas.repository.CategoriasRepository;
import com.example.financas.repository.DespesasFixasRepository;
import com.example.financas.repository.DespesasVariaveisRepository;
import com.example.financas.repository.GastosGeraisRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/totais")
public class EstatisticasController {

	@Autowired
	private CategoriasRepository catRepo;

	@Autowired
	private DespesasFixasRepository dfRepo;

	@Autowired
	private DespesasVariaveisRepository dvRepo;

	@Autowired
	private GastosGeraisRepository ggRepo;

	// Recuperar o valor gasto para cada categoria
	@PostMapping("/by-categoria")
	public List<ValorCategoria> getValorCategoria(@RequestBody MesAno mesAno) {
		
		ListaPorMes gastos = new ListaPorMes(GastosGeraisRepository.class, ggRepo, mesAno);
		ListaPorMes despFixa = new ListaPorMes(DespesasFixasRepository.class, dfRepo, mesAno);
		ListaPorMes despVar = new ListaPorMes(DespesasVariaveisRepository.class, dvRepo, mesAno);
		
		Thread gastosThread = new Thread(gastos);
		Thread despFixaThread = new Thread(despFixa);
		Thread despVarThread = new Thread(despVar);
		
		gastosThread.start();
		despFixaThread.start();
		despVarThread.start();
		
		try {
			despFixaThread.join();
			gastosThread.join();
			despVarThread.join();
		} catch (InterruptedException e1) {
			e1.printStackTrace();
		}
		
		List<GastoGeral> gastosNoMes = gastos.registrosAgrupadorPorMes();
		List<DespesaFixa> despesasFixasNoMes = despFixa.registrosAgrupadorPorMes();
		List<DespesaVariavel> despesasVariaveisNoMes = despVar.registrosAgrupadorPorMes();

		List<ValorCategoria> totaisPorCategoria = catRepo.findAll().stream()
				.map(e -> new ValorCategoria(e.getDescricao(), (float) 0)).collect(Collectors.toList());

		Float total = (float) 0;

		for (ValorCategoria c : totaisPorCategoria) {

			total += gastosNoMes.stream()
								.filter(e -> e.getCategoria().getDescricao().contentEquals(c.getDescricao()))
								.map(e -> e.getValor())
								.reduce((float) 0, Float::sum);

			total += despesasVariaveisNoMes.stream()
										   .filter(e -> e.getCategoria().getDescricao().contentEquals(c.getDescricao()))
										   .filter(e -> e.getStatus().contentEquals("PAGO"))
										   .map(e -> e.getValorPago())
										   .reduce((float) 0, Float::sum);
			
			c.setValor(c.getValor() + total);

			despesasFixasNoMes.stream()
							  .filter(e -> e.getCategoria().getDescricao().contentEquals(c.getDescricao()))
							  .filter(e -> e.getStatus().contentEquals("PAGO"))
							  .forEach(e -> c.setValor(c.getValor() + e.getValor()));

			total = (float) 0;
		}

		return totaisPorCategoria;
	}
	
}
