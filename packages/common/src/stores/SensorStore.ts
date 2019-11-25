import { observable } from "mobx"
import { createContext } from "react";

class SensorStore {
  @observable name = "";
  @observable timestamp = "";
  @observable value = 0;
}

export const SensorStoreContext = createContext(new SensorStore());
