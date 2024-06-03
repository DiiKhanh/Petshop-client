import dogApi from "~/apis/modules/dog.api";
import { useQuery } from "@tanstack/react-query";


export function useGetAllPet({ type }) {
  const getAllPetFn = async () => {
    const { response } = await dogApi.getAll({ type });
    return response;
  };

  return useQuery({
    queryKey: petQueryKeys.all,
    queryFn: getAllPetFn
  });
}

export function useGetPet(id) {

  const getPetFn = async () => {
    const { response } = await dogApi.getDogDetail({ id });
    return response;
  };

  return useQuery({
    queryKey: petQueryKeys.detail(id),
    queryFn: getPetFn,
    retry: 1
  });
}

export const petQueryKeys = {
  all: ["all-cat"],
  details: () => [...petQueryKeys.all, "detail"],
  detail: (id) => [...petQueryKeys.details(), id],
  pagination: (page) => [...petQueryKeys.all, "pagination", page],
  infinite: () => [...petQueryKeys.all, "infinite"]
};