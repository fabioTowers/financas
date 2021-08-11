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

import com.example.financas.model.DespesaFixa;
import com.example.financas.model.MesAno;
import com.example.financas.repository.DespesasFixasRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/despesa-fixa")
public class DespesaFixaController {

	@Autowired
	private DespesasFixasRepository dfRepo;
	
	// Ver todas as despesas fixas
	@GetMapping("/todas")
	public List<DespesaFixa> getDespesasFixas(){
		return dfRepo.findAll();
	}
	
	//Adicionar uma nova despesa fixa
	@PostMapping("/nova/despesa-fixa")
	public DespesaFixa adicionarDespesaFixa(@RequestBody DespesaFixa despesaFixa) {
		return dfRepo.save(despesaFixa);
	}
	
	// Consultar uma despesa fixa pelo ID
	@GetMapping("/despesa-fixa/{id}")
	public ResponseEntity<DespesaFixa> getDepesaFixaById(@PathVariable Long id) {
		DespesaFixa despesaFixa = dfRepo.findById(id).orElseThrow(() -> new ResourceAccessException(
				"[getDespesaFixaById] Não há despesa variável com o ID informado: " + id));
		return ResponseEntity.ok(despesaFixa);
	}
	
	// Atualizar um registro de despesa fixa
	@PutMapping("/despesa-fixa/{id}")
	public ResponseEntity<DespesaFixa> editarDespesaFixa(@PathVariable Long id, 
			@RequestBody DespesaFixa despesaFixaAtualizada) {
		
		DespesaFixa despesaFixa = dfRepo.findById(id).orElseThrow(() -> new ResourceAccessException(
				"[editarDespesaFixa] Não há despesa variável com o ID informado: " + id));
		
		despesaFixa.setCategoria( despesaFixaAtualizada.getCategoria() );
		despesaFixa.setDataPagamento( despesaFixaAtualizada.getDataPagamento() );
		despesaFixa.setDescricao( despesaFixaAtualizada.getDescricao() );
		despesaFixa.setMesAno( despesaFixaAtualizada.getMesAno() );
		despesaFixa.setStatus( despesaFixaAtualizada.getStatus() );
		despesaFixa.setValor( despesaFixaAtualizada.getValor() );
		despesaFixa.setObservacao( despesaFixaAtualizada.getObservacao() );
		
		DespesaFixa despesaFixaNova = dfRepo.save(despesaFixa);
		return ResponseEntity.ok(despesaFixaNova);
	}
	
	// Excluir um registro de despesa vraiável
	@DeleteMapping("/despesa-fixa/{id}")
	public ResponseEntity<Map<String, Boolean>> deletarDespesaFixa(@PathVariable Long id) {
		
		// Verificando se há despesa fixa com o id informado
		DespesaFixa despesaFixa = dfRepo.findById(id).orElseThrow(() -> new ResourceAccessException(
				"[deletarDespesaFixa] Não há despesa fixa com o ID informado: " + id));
		
		dfRepo.delete(despesaFixa);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deletado", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	// Recupera registros de despesa fixas com mesmo ID de mês e ano
	@PostMapping("/despesa-fixa-mes")
	public List<DespesaFixa> getDespesaFixaByMes(@RequestBody MesAno mesAno){
		return dfRepo.findByMesAno(mesAno);
	}
}
