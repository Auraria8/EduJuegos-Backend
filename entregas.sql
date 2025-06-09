CREATE TABLE entregas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_estudiante INT NOT NULL,
  id_actividad INT NOT NULL,
  contenido TEXT,
  fecha_entrega DATE,
  FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id),
  FOREIGN KEY (id_actividad) REFERENCES actividades(id)
);
