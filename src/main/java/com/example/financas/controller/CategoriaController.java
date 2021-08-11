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

import com.example.financas.model.Categoria;
import com.example.financas.repository.CategoriasRepository;

@CrossOrigin(origins= "http://localhost:3000")
@RestController
@RequestMapping("/categorias")
public class CategoriaController {

	@Autowired
	private CategoriasRepository catRepo;

	// Ver todas as categorias
	@GetMapping("/todas")
	public List<Categoria> getCategorias() {
		return catRepo.findAll();
	}

	// Adicionar uma nova categoria de gastos
	@PostMapping("/nova/categoria")
	public Categoria adicionarCategoria(@RequestBody Categoria categoria) {
		return catRepo.save(categoria);
	}
	
	// Consultar uma categoria pelo id rest api
	@GetMapping("/categoria/{id}")
	/**@PathVariable indica que a variável anotada vai aparecer 
	* na URL*/
	public ResponseEntity<Categoria> getCategoriaById(@PathVariable Long id) {
		Categoria categoria = catRepo.findById(id)
				.orElseThrow(() -> new ResourceAccessException("[getCategoriaById] Não há categoria com o ID informado: " + id));
		return ResponseEntity.ok(categoria);
	}

	// Atualizar um registro de uma categoria
	@PutMapping("/categoria/{id}")
	public ResponseEntity<Categoria> editarCategoria(@PathVariable Long id, @RequestBody Categoria categoriaAtualizada) {

		Categoria categoria = catRepo.findById(id)
				.orElseThrow(() -> new ResourceAccessException("[editarCategoria] Não há categoria com o ID informado: " + id));

		categoria.setDescricao(categoriaAtualizada.getDescricao());

		Categoria categoriaNova = catRepo.save(categoria);
		return ResponseEntity.ok(categoriaNova);
	}

	// Excluir uma categoria
	@DeleteMapping("/categoria/{id}")
	public ResponseEntity<Map<String, Boolean>> deletarCategoria(@PathVariable Long id) {

		// Verificando se há categoria com o ID informado
		Categoria categoria = catRepo.findById(id)
				.orElseThrow(() -> new ResourceAccessException("[Erro deletarCategoria] Não há categoria com o ID informado: " + id));

		catRepo.delete(categoria);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deletado", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
