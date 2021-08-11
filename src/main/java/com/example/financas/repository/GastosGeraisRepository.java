package com.example.financas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.financas.model.GastoGeral;
import com.example.financas.model.MesAno;

@Repository
public interface GastosGeraisRepository extends JpaRepository<GastoGeral, Long> {
	
	List<GastoGeral> findByMesAno(MesAno mesAno);
}
