package com.example.financas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.financas.model.DespesaFixa;
import com.example.financas.model.MesAno;

@Repository
public interface DespesasFixasRepository extends JpaRepository<DespesaFixa, Long> {

	List<DespesaFixa> findByMesAno(MesAno mesAno);
}
