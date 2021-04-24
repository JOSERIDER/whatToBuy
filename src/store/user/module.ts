import { Module, MutationTree, ActionTree, GetterTree } from "vuex";
import {
  ActionType,
  MutationType,
  RootStateInterface,
  UserStateInterface,
} from "@/models/store";
import { initialState } from "@/store/user/InitialState";
import storageClient from "@/storage-client";
import usersApiClient from "@/api-client/users";
import { User } from "@/models/domain/user";

export const mutations: MutationTree<UserStateInterface> = {
  loadingUser(state: UserStateInterface) {
    state.isLoading = true;
  },
  loadedUser(state: UserStateInterface) {
    state.isLoading = false;
  },
  setUser(state: UserStateInterface, user: User) {
    state.user = user;
  },
  removeUser(state: UserStateInterface) {
    state.user = {};
  },
};

export const actions: ActionTree<UserStateInterface, RootStateInterface> = {
  async setUser({ commit }, user: User) {
    commit(MutationType.user.loadingUser);
    const userStorage = storageClient.user;
    await userStorage.set(user);

    commit(MutationType.user.setUser, user);
    commit(MutationType.user.loadedUser);
  },
  async getUser({ commit }) {
    commit(MutationType.user.loadingUser);
    const userStorage = storageClient.user;
    const user: User = await userStorage.get();

    commit(MutationType.user.setUser, user);
    commit(MutationType.user.loadedUser);
  },
  async removeUser({ commit }) {
    commit(MutationType.user.loadingUser);
    const userStorage = storageClient.user;
    await userStorage.remove();

    commit(MutationType.user.removeUser);
    commit(MutationType.user.loadedUser);
  },
  async createUser({ commit, dispatch }, user: User) {
    commit(MutationType.user.loadingUser);
    await usersApiClient.create(user);
    dispatch(ActionType.user.setUser, user);
    commit(MutationType.user.loadedUser);
  },
};

export const getters: GetterTree<UserStateInterface, RootStateInterface> = {
  //TODO: NOT IMPLEMENTED YET
};

const namespaced = true;
const state: UserStateInterface = initialState;
export const userState: Module<UserStateInterface, RootStateInterface> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};