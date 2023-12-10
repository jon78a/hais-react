import { UnivRepository } from "../../domain/subject/univ.interface";
import { StorageSource } from "../firebase/constants";
import { UnivModel } from "../firebase/models";

const univRepository: UnivRepository = {
  async findByNameLike(keyword) {
    const source = StorageSource.Univ;
    const res = await fetch(source);
    const data: UnivModel[] = await res.json();

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
