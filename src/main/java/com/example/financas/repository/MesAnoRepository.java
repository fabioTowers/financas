package com.example.financas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.financas.model.MesAno;

@Repository
public interface MesAnoRepository extends JpaRepository<MesAno, Long> {

}
