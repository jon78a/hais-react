import { UnivRepository } from "../../domain/subject/univ.interface";
import { StorageSource } from "../firebase/constants";
import { UnivType } from "../firebase/types";

const univRepository: UnivRepository = {
  async findByNameLike(keyword) {
    const source = StorageSource.Univ;
    const res = await fetch(source);
    const data: UnivType[] = await res.json();

    return data
      .filter((v) => v["name"].startsWith(keyword))
      .map((v) => {
        return {
          id: v["id"],
          name: v["name"],
          sidoCode: v["sido_code"]
        }
      })
  },
}

export default univRepository;
