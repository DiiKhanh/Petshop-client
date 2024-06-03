import dogApi from "~/apis/modules/dog.api";
import { useQuery } from "@tanstack/react-query";
import commentApi from "~/apis/modules/comment.api";


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

export function useGetDogComment(id) {

  const getCommentFn = async () => {
    const { response } = await commentApi.getComment({ product_id: +id, type: "animal" });
    return response;
  };

  return useQuery({
    queryKey: commentQueryKeys.detail(id),
    queryFn: getCommentFn,
    retry: 1
  });
}

export const petQueryKeys = {
  all: ["all-dog"],
  details: () => [...petQueryKeys.all, "detail"],
  detail: (id) => [...petQueryKeys.details(), id],
  pagination: (page) => [...petQueryKeys.all, "pagination", page],
  infinite: () => [...petQueryKeys.all, "infinite"]
};

export const commentQueryKeys = {
  all: ["all-comment"],
  details: () => [...commentQueryKeys.all, "detail"],
  detail: (id) => [...commentQueryKeys.details(), id]
};