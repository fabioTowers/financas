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
import com.example.financas.model.Receita;
import com.example.financas.repository.ReceitasRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/receitas")
public class ReceitaController {
	
	@Autowired
	private ReceitasRepository recRepo;
	
	// Ver todas as receitas
	@GetMapping("/todas")
	public List<Receita> getReceitas(){
		return recRepo.findAll();
	}
	
	// Adicionar um novo registro às receitas
	@PostMapping("/nova/receita")
	public Receita adicionarReceita(@RequestBody Receita receita) {
		return recRepo.save(receita);
	}
	
	// Consultar uma receita pelo ID
	@GetMapping("/receita/{id}")
	public ResponseEntity<Receita> getReceitaById(@PathVariable Long id){
		Receita receita = recRepo.findById(id).orElseThrow(() -> new ResourceAccessException(
				"[getReceitaById] Não registro de receita com o id informado: " + id));
		return ResponseEntity.ok(receita);
	}
	
	// Atualizar um registro de receita
	@PutMapping("/receita/{id}")
	public ResponseEntity<Receita> editarReceita(@PathVariable Long id,
			@RequestBody Receita receitaAtualizada) {
		
		Receita receita = recRepo.findById(id).orElseThrow(() -> new ResourceAccessException(
				"[editarReceita] Não há registro de receita com o id:" + id));
		
		receita.setDescricao( receitaAtualizada.getDescricao() );
		receita.setFonte( receitaAtualizada.getFonte() );
		receita.setDataRecebimento( receitaAtualizada.getDataRecebimento() );
		receita.setValor( receitaAtualizada.getValor() );
		receita.setMesAno( receitaAtualizada.getMesAno() );
		receita.setObservacao( receitaAtualizada.getObservacao() );
		
		Receita receitaNova = recRepo.save(receita);
		return ResponseEntity.ok(receitaNova);
	}
	
	// Excluir um registro de receita
	@DeleteMapping("/receita/{id}")
	public ResponseEntity<Map<String, Boolean>> deletarReceita(@PathVariable Long id) {
		
		// Há registro com o id recebido?
		Receita receita = recRepo.findById(id).orElseThrow(() -> new ResourceAccessException(
				"[deletarReceita] Não há registro em receitas com o id: " + id));
		
		recRepo.delete(receita);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deletado", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	// Recupera registros de receita com determinado ID
	@PostMapping("/receitas-mes")
	public List<Receita> getReceitaByMes(@RequestBody MesAno mesAno){
		return recRepo.findByMesAno(mesAno);
	}
}
