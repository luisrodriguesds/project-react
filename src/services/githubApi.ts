import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});

interface ISearchRepository {
  repository: string;
  page?: number;
  perPage?: number;
}
interface ISearchRepositoryResponse {
  items: {
    id: number;
    full_name: string;
    description: string;
    owner: {
      avatar_url: string;
    };
  }[];
  total_count: number;
}
export const searchRepositories = async ({
  repository,
  page = 1,
  perPage = 10,
}: ISearchRepository): Promise<ISearchRepositoryResponse> => {
  const res = await githubApi.get(`/search/repositories`, {
    params: {
      q: repository,
      per_page: perPage,
      page,
    },
  });

  return res.data;
};
