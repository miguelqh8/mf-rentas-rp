export type TipoDocumento = "DNI" | "CE";
export type Sexo = "MASCULINO" | "FEMENINO";
export type EstadoCivil = "SOLTERO" | "CASADO" | "DIVORCIADO" | "VIUDO";
export type Categoria = "JUB. LEGAL" | "ACTIVO" | "PENSIONISTA";

export interface Afiliado {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  sexo: Sexo;
  estadoCivil: EstadoCivil;
  edad: number;
  categoria: Categoria;
  consentimientosAceptados: string;
}

export interface Persona {
  id: string;
  nombres: string;
  apellidos: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  email?: string;
  telefono?: string;
}

export interface BuscarPersonaRequest {
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
}

export interface BuscarPersonaResponse {
  afiliado: Afiliado | null;
  encontrada: boolean;
  mensaje?: string;
}

export interface Beneficiario {
  id: number;
  numero: number;
  apellidosNombres: string;
  parentesco: string;
  sexo: Sexo;
  fechaNacimiento: string;
  dni: string;
  porcentajeRenta: number;
}

export interface NuevoBeneficiario {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  parentesco: string;
  sexo: Sexo;
  fechaNacimiento: string;
  nacionalidad: string;
  residencia: string;
  esPep: 'si' | 'no';
  esSujetoObligado: 'si' | 'no';
  profesion: string;
}
