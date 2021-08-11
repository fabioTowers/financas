package com.example.financas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.financas.model.DespesaVariavel;
import com.example.financas.model.MesAno;

@Repository
public interface DespesasVariaveisRepository extends JpaRepository<DespesaVariavel, Long> {
	
	List<DespesaVariavel> findByMesAno(MesAno mesAno);
	
}
