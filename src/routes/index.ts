import { createRouter, createWebHistory } from "vue-router";
import BaseLayout from "@/layouts/BaseLayout.vue";

const routes = [
  {
    path: "/",
    component: BaseLayout,
    children: [
      {
        path: "",
        name: "BuscarPersona",
        component: () => import("@/views/BuscarPersonaView.vue"),
      },
                  {
              path: "/detalle-afiliado",
              name: "DetalleAfiliado",
              component: () => import("@/views/DetalleAfiliadoView.vue"),
            },
            {
              path: "/cotizacion/:id?",
              name: "Cotizacion",
              component: () => import("@/views/CotizacionView.vue"),
            },
            {
              path: "/cotizacion/:id/paso-2",
              name: "CotizacionPaso2",
              component: () => import("@/views/CotizacionPaso2View.vue"),
            },
      // Aquí se agregarán más rutas futuras
      // {
      //   path: "/buscar-nombre",
      //   name: "BuscarPorNombre", 
      //   component: () => import("@/views/BuscarPorNombreView.vue"),
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;