import { useQuery } from "@tanstack/react-query";
import checkoutApi from "~/apis/modules/checkout.api";


export function useGetPurchased(id) {

  const getPetFn = async () => {
    const { response } = await checkoutApi.getDetail({ id });
    return response;
  };

  return useQuery({
    queryKey: purchasedQueryKeys.detail(id),
    queryFn: getPetFn,
    retry: 1
  });
}

export function useGetList(user) {
  const getAllPetFn = async () => {
    const { response } = await checkoutApi.getList({ user_id:user.id });
    return response;
  };

  return useQuery({
    queryKey: purchasedQueryKeys.all,
    queryFn: getAllPetFn
  });
}

export const purchasedQueryKeys = {
  all: ["all-purchased"],
  details: () => [...purchasedQueryKeys.all, "detail"],
  detail: (id) => [...purchasedQueryKeys.details(), id]
};