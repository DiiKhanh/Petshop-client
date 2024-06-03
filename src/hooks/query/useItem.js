import { useQuery } from "@tanstack/react-query";
import commentApi from "~/apis/modules/comment.api";
import itemApi from "~/apis/modules/item.api";


export function useGetAllItem() {
  const getAllPetFn = async () => {
    const { response } = await itemApi.getAllItems();
    return response;
  };

  return useQuery({
    queryKey: petQueryKeys.all,
    queryFn: getAllPetFn
  });
}

export function useGetPet(id) {

  const getPetFn = async () => {
    const { response } = await itemApi.getItemDetail({ id });
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
  all: ["all-item"],
  details: () => [...petQueryKeys.all, "detail"],
  detail: (id) => [...petQueryKeys.details(), id]
};

export const commentQueryKeys = {
  all: ["all-item-comment"],
  details: () => [...commentQueryKeys.all, "detail"],
  detail: (id) => [...commentQueryKeys.details(), id]
};