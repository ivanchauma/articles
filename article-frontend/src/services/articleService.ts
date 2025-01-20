import axios, { AxiosError} from 'axios';
import API_URL from '../Util/Servers';


export const fetchArticlesService = async (page: number, token: string, titleFilter: string, sourceFilter: string, dateFilter: string, categoryFilter: string) => {
    try {
      //console.log('ArticleService ', titleFilter + ' ' + sourceFilter + ' ' + dateFilter);
    let url = `${API_URL}/articles?page=${page}`;

    //Check if there are any values on the filters
    if (titleFilter) {
      url += `&title=${encodeURIComponent(titleFilter)}`;
    }
    if (sourceFilter) {
      url += `&source=${encodeURIComponent(sourceFilter)}`;
    }
    if (dateFilter) {
      url += `&date=${encodeURIComponent(dateFilter)}`;
    }
    if (categoryFilter) {
      url += `&date=${encodeURIComponent(categoryFilter)}`;
    }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
             throw new Error(error.response.data.error || 'Token not valid');
            } else {
            throw new Error(error.response?.data?.message || 'Error fetching articles');
            }
        }
      }
};

export const fetchUserArticlesService = async (page: number, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/userarticles?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
         throw new Error(error.response.data.error || 'Token not valid');
        } else {
        throw new Error(error.response?.data?.message || 'Error fetching articles');
        }
    }
  }
};
