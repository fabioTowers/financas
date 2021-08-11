package com.example.financas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.financas.model.MesAno;
import com.example.financas.model.Receita;

@Repository
public interface ReceitasRepository extends JpaRepository<Receita, Long> {

	List<Receita> findByMesAno(MesAno mesAno);
}
