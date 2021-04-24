import { UserMutationType } from "@/models/store/user/UserMutationType";
import { ListsMutationType } from "@/models/store/lists/ListsMutationType";
import { AuthMutationTypes } from "@/models/store/autn/AuthMutationTypes";

/**
 * Is the main namespace that export and group the mutation type specific for each domain.
 */
export namespace MutationType {
  export const user = UserMutationType;
  export const lists = ListsMutationType;
  export const auth = AuthMutationTypes;
}