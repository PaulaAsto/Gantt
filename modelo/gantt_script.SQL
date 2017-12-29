/*
Created: 26/12/2017
Modified: 29/12/2017
Model: gantt
Database: PostgreSQL 9.5
*/

-- Create sequences section -------------------------------------------------

CREATE SEQUENCE "sec_proyecto"
 INCREMENT BY 1
 START WITH 1
 MAXVALUE 9223372036854775807
 NO MINVALUE
 CACHE 1
;

CREATE SEQUENCE "sec_tarea"
 INCREMENT BY 1
 START WITH 1
 MAXVALUE 9223372036854775807
 NO MINVALUE
 CACHE 1
;

CREATE SEQUENCE "sec_actividad"
 INCREMENT BY 1
 START WITH 1
 MAXVALUE 9223372036854775807
 NO MINVALUE
 CACHE 1
;

CREATE SEQUENCE "sec_miniactividad"
 INCREMENT BY 1
 START WITH 1
 MAXVALUE 9223372036854775807
 NO MINVALUE
 CACHE 1
;

CREATE SEQUENCE "sec_estadogant"
 INCREMENT BY 1
 START WITH 1
 MAXVALUE 9223372036854775807
 NO MINVALUE
 CACHE 1
;

-- Create tables section -------------------------------------------------

-- Table proyecto

CREATE TABLE "proyecto"(
 "proy_id" Bigint NOT NULL,
 "nombre" Character varying(80) NOT NULL,
 "est" Smallint NOT NULL
)
;

-- Add keys for table proyecto

ALTER TABLE "proyecto" ADD CONSTRAINT "Key1" PRIMARY KEY ("proy_id")
;

-- Table tarea

CREATE TABLE "tarea"(
 "tare_id" Bigint NOT NULL,
 "proy_id" Bigint,
 "nombre" Character varying(200) NOT NULL,
 "fechainicio" Timestamp NOT NULL,
 "fechafin" Timestamp NOT NULL,
 "color" Character varying(50) NOT NULL,
 "est" Smallint NOT NULL
)
;

-- Create indexes for table tarea

CREATE INDEX "IX_Relationship1" ON "tarea" ("proy_id")
;

-- Add keys for table tarea

ALTER TABLE "tarea" ADD CONSTRAINT "Key2" PRIMARY KEY ("tare_id")
;

-- Table actividad

CREATE TABLE "actividad"(
 "acti_id" Bigint NOT NULL,
 "tare_id" Bigint,
 "nombre" Character varying(256) NOT NULL,
 "fechainicio" Timestamp NOT NULL,
 "fechafin" Timestamp NOT NULL,
 "color" Character varying(50) NOT NULL,
 "horainicio" Timestamp NOT NULL,
 "horafin" Timestamp NOT NULL,
 "descripcion" Character varying(1000) NOT NULL,
 "est" Smallint NOT NULL
)
;

-- Create indexes for table actividad

CREATE INDEX "IX_Relationship2" ON "actividad" ("tare_id")
;

-- Add keys for table actividad

ALTER TABLE "actividad" ADD CONSTRAINT "Key3" PRIMARY KEY ("acti_id")
;

-- Table miniactividad

CREATE TABLE "miniactividad"(
 "mini_acti_id" Bigint NOT NULL,
 "acti_id" Bigint,
 "esta_id" Bigint,
 "nombre" Character varying(256) NOT NULL,
 "color" Character varying(50) NOT NULL,
 "porcentajeavance" Double precision NOT NULL,
 "est" Bigint NOT NULL
)
;

-- Create indexes for table miniactividad

CREATE INDEX "IX_Relationship3" ON "miniactividad" ("acti_id")
;

CREATE INDEX "IX_Relationship4" ON "miniactividad" ("esta_id")
;

-- Add keys for table miniactividad

ALTER TABLE "miniactividad" ADD CONSTRAINT "Key4" PRIMARY KEY ("mini_acti_id")
;

-- Table estadogant

CREATE TABLE "estadogant"(
 "esta_gant_id" Bigint NOT NULL,
 "nombre" Character varying(20) NOT NULL,
 "color" Character varying(50) NOT NULL,
 "est" Smallint NOT NULL
)
;

-- Add keys for table estadogant

ALTER TABLE "estadogant" ADD CONSTRAINT "Key5" PRIMARY KEY ("esta_gant_id")
;

-- Create relationships section ------------------------------------------------- 

ALTER TABLE "tarea" ADD CONSTRAINT "Relationship1" FOREIGN KEY ("proy_id") REFERENCES "proyecto" ("proy_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "actividad" ADD CONSTRAINT "Relationship2" FOREIGN KEY ("tare_id") REFERENCES "tarea" ("tare_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "miniactividad" ADD CONSTRAINT "Relationship3" FOREIGN KEY ("acti_id") REFERENCES "actividad" ("acti_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;

ALTER TABLE "miniactividad" ADD CONSTRAINT "Relationship4" FOREIGN KEY ("esta_id") REFERENCES "estadogant" ("esta_gant_id") ON DELETE NO ACTION ON UPDATE NO ACTION
;


ALTER SEQUENCE "sec_proyecto" OWNED BY "proyecto"."proy_id"
;
ALTER SEQUENCE "sec_tarea" OWNED BY "tarea"."tare_id"
;
ALTER SEQUENCE "sec_actividad" OWNED BY "actividad"."acti_id"
;
ALTER SEQUENCE "sec_miniactividad" OWNED BY "miniactividad"."mini_acti_id"
;
ALTER SEQUENCE "sec_estadogant" OWNED BY "estadogant"."esta_gant_id"
;


