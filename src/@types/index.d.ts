declare module "@portal-sistemas/shared" {
  export const storage: any;
  export const modulos: any;
  export const firebaseOAuth: any;
}

// Extiende el tipo global Window para el entorno single-spa
interface Window {
  singleSpaNavigate?: unknown;
}