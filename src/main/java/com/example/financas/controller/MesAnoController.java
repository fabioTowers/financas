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

import com.example.financas.model.MesAno;
import com.example.financas.repository.MesAnoRepository;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping("/meses")
public class MesAnoController {

	@Autowired
	private MesAnoRepository mesAnoRepo;
	
	// Ver todos os meses salvos no histórico
	@GetMapping("/todos")
	public List<MesAno> getMeses(){
		return mesAnoRepo.findAll();
	}
	
	// Adicionar novo mês no histórico
	@PostMapping("/novo/mes")
	public MesAno adicionarMesAno(@RequestBody MesAno mes) {
		return mesAnoRepo.save(mes);
	}
	
	// Consultar um mes pelo id rest api
	@GetMapping("/mes/{id}")
	/**@PathVariable indica que a variável anotada vai aparecer 
	* na URL*/
	public ResponseEntity<MesAno> getMesAnoById(@PathVariable Long id) {
		MesAno mes = mesAnoRepo.findById(id)
				.orElseThrow(() -> new ResourceAccessException("Não há mês com o ID informado: " + id));
		return ResponseEntity.ok(mes);
	}
	
	// Atualizar um registro de um mês
	@PutMapping("/mes/{id}")
	public ResponseEntity<MesAno> editarMes(@PathVariable Long id,
			@RequestBody MesAno mesAtualizado) {

		MesAno mes = mesAnoRepo.findById(id)
				.orElseThrow(() -> new ResourceAccessException("Não há mês com o ID informado: " + id));

		mes.setDescricao(mesAtualizado.getDescricao());

		MesAno mesNovo = mesAnoRepo.save(mes);
		return ResponseEntity.ok(mesNovo);
	}
	
	// Excluir o registro de um mês
	@DeleteMapping("/mes/{id}")
	public ResponseEntity<Map<String, Boolean>> deletarMesAno(@PathVariable Long id) {

		// Verificando se há mês com o ID informado
		MesAno mes = mesAnoRepo.findById(id)
				.orElseThrow(() -> new ResourceAccessException("Não há mês com o ID informado: " + id));

		mesAnoRepo.delete(mes);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deletado", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
