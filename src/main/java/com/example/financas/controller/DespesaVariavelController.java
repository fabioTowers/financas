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

import com.example.financas.model.DespesaVariavel;
import com.example.financas.model.MesAno;
import com.example.financas.repository.DespesasVariaveisRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/despesa-variavel")
public class DespesaVariavelController {
	
	@Autowired
	private DespesasVariaveisRepository dvRepo;

	// Ver todas as despesas variáveis
	@GetMapping("/todas")
	public List<DespesaVariavel> getDespesasVariaveis() {
		return dvRepo.findAll();
	}

	// Adicionar uma nova despesa variável
	@PostMapping("/nova/despesa-variavel")
	public DespesaVariavel adicionarDespesaVariavel(@RequestBody DespesaVariavel despesaVariavel) {
		return dvRepo.save(despesaVariavel);
	}

	// Consultar uma despesa variável pelo id rest api
	@GetMapping("/despesa-variavel/{id}")
	/**
	 * @PathVariable indica que a variável anotada vai aparecer na URL
	 */
	public ResponseEntity<DespesaVariavel> getDespesaVariavelById(@PathVariable Long id) {
		DespesaVariavel despesaVariavel = dvRepo.findById(id).orElseThrow(() -> new ResourceAccessException(
				"[getDespesaVariavelById] Não há depesa variavel com o ID informado: " + id));
		return ResponseEntity.ok(despesaVariavel);
	}

	// Atualizar um registro de uma despesa variavel
	@PutMapping("/despesa-variavel/{id}")
	public ResponseEntity<DespesaVariavel> editarDespesaVariavel(@PathVariable Long id,
			@RequestBody DespesaVariavel despesaVariavelAtualizada) {

		DespesaVariavel despesaVariavel = dvRepo.findById(id).orElseThrow(() -> new ResourceAccessException(
				"[editarDespesaVariavel] Não há despesa variavel com o ID informado: " + id));
		
		despesaVariavel.atualizarRegistro( despesaVariavelAtualizada );

		DespesaVariavel despesaVariavelNova = dvRepo.save(despesaVariavel);
		return ResponseEntity.ok(despesaVariavelNova);
	}

	// Excluir uma despesa variável
	@DeleteMapping("/despesa-variavel/{id}")
	public ResponseEntity<Map<String, Boolean>> deletarDespesaVariavel(@PathVariable Long id) {

		// Verificando se há despesa variável com o ID informado
		DespesaVariavel despesaVariavel = dvRepo.findById(id).orElseThrow(() -> new ResourceAccessException(
				"[Erro deletarDespesaVariavel] Não há despesa variavel com o ID informado: " + id));

		dvRepo.delete(despesaVariavel);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deletado", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	// Recupera despesas variaveis pelo ID mês ano
	@PostMapping("/despesa-variavel-mes")
	/**
	 * @PathVariable indica que a variável anotada vai aparecer na URL
	 */
	public List<DespesaVariavel> getDespesaVariavelByMes(@RequestBody MesAno mesAno) {
		return dvRepo.findByMesAno(mesAno);
	}
}
