package com.example.financas.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;

import com.example.financas.model.GastoGeral;
import com.example.financas.model.MesAno;
import com.example.financas.repository.GastosGeraisRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/gastos")
public class GastoGeralController {

	@Autowired
	private GastosGeraisRepository ggRepo;
	
	// Ver todos os gastos
	@GetMapping("/todos")
	public List<GastoGeral> getGasto(){
		return ggRepo.findAll();
	}
	
	// Adicionar um novo registro a tabela gastos gerais
	@PostMapping("/novo/gasto")
	public GastoGeral adicionarGasto(@RequestBody GastoGeral gasto) {
		return ggRepo.save(gasto);
	}
	
	// Consultar um registro de gastos gerais pelo ID
	@GetMapping("/gasto/{id}")
	public ResponseEntity<GastoGeral> getGastoById(@PathVariable Long id){
		GastoGeral gasto = ggRepo.findById(id).orElseThrow(() -> new ResourceAccessException(
				"[getGastoById] Não há registro com o ID " + id));
		return ResponseEntity.ok(gasto);
	}
	
	// Atualizar um registro da tabela gastos gerais
	@PutMapping("/gasto/{id}")
	public ResponseEntity<GastoGeral> editarGasto(@PathVariable Long id,
			@RequestBody GastoGeral novoGasto){
		
		GastoGeral gasto = ggRepo.findById(id).orElseThrow(() -> new ResourceAccessException(
				"[editarGasto] Não há registro em gastos gerais com o ID " + id));
		
		gasto.atualizarRegistro(novoGasto);
		
		GastoGeral gg = ggRepo.save(gasto);
		return ResponseEntity.ok( gg );
	}
	
	// Excluir um registro da tabela de gastos gerais
	@DeleteMapping("/gasto/{id}")
	public ResponseEntity<Map<String, Boolean>> deletarGasto(@PathVariable Long id){
		
		// Verificar se há registro com o ID recebido
		GastoGeral gasto = ggRepo.findById(id).orElseThrow(() -> new ResourceAccessException(
				"[deletarGasto] Não há registro na tabela de gastos com o id " + id));
		
		ggRepo.delete(gasto);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deletado", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	// Recuperar todos os registros de gastos gerais com mesmo ID de mês
	@PostMapping("/gastos-mes")
	public List<GastoGeral> getGastoByMes(@RequestBody MesAno mesAno){
		return ggRepo.findByMesAno(mesAno);
	}
}
