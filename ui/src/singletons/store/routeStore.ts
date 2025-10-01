import { create } from "zustand"

type RouteData = {
  name: String;
  namespace: String;
  xml: String;
};

// type RouteStore = {
//   routes: [];
//   createRoute: (RouteData) => {},
//   getRoutes: () => routes;
//   isClusterReachable: () => bool;
// };

// export const useRouteStore = create<RouteStore>((set) => ({
//   routes: [],
//   addRoute:  () => set((state) => ({routes: })),
// }));
