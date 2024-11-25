import { create } from "zustand";
import { StoreApi, UseBoundStore } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";

//   Add a selector function to the store
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

//   Create a selector function for each property of the store (simplifying the use of the store)
const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

// Define the interface of the store
interface AppState {
  email: string;
  timer: number;
  updateEmail: (email: string) => void;
}

// Create a store who contains email, timer and updateEmail
export const useAppStore = createSelectors(
  create<AppState>()(
    devtools(
      persist(
        (set) => ({
          email: "john@doe.com",
          timer: 0,
          updateEmail(email: string) {
            set({ email: email });
          },
        }),
        { name: "app-storage" }
      )
    )
  )
);

// Add a function to update email
export const globalUpdateEmail = (email: string) => {
  useAppStore.setState({ email: email });
};

// Add a function to update timer
// window.setInterval(() => {
//   useAppStore.setState((state) => ({ timer: state.timer + 1 }));
// }, 1000);

const useAppStoreWithCombine = create(combine({
    timer: 0,
    email: "john@doe.com",
    user: null as null | {username: string}
}, (set) => ({
    updateEmail(email: string) {
        set({email: email});
    },
})))

const App = () => {
    const user = useAppStoreWithCombine(state => state.user)
}