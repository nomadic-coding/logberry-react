import { observable } from "mobx"
import { createContext } from "react";
// @ts-ignore
import useSocket from 'use-socket.io-client';

class SocketStore {
}

export const SocketStoreContext = createContext(new SocketStore());
