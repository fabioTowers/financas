package com.example.financas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.financas.model.Categoria;

@Repository
//									<Entidade (classe), tipo do ID>
public interface CategoriasRepository extends JpaRepository<Categoria, Long> {

}
