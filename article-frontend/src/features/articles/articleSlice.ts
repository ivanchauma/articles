import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticlesService, fetchUserArticlesService } from '../../services/articleService';
import { AppDispatch } from '../../store';
import { RootState } from '../../store';

interface Article {
    title: string;
    description: string;
    image_url: string;
    source: string;
    published_at: string;
  }

export interface ArticleState {
  articles: Article[]; 
  userArticles: Article[];
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: ArticleState = {
  articles: [],
  userArticles: [],
  error: null,
  currentPage: 1,
  totalPages: 1,
};

// Define the slice
const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<{ articles: Article[]; totalPages: number }>) {
      state.articles = action.payload.articles;
      state.totalPages = action.payload.totalPages;
    },
    setUserArticles(state, action: PayloadAction<{ articles: Article[]; totalPages: number }>) {
      state.userArticles = action.payload.articles;
      state.totalPages = action.payload.totalPages;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setArticles, setUserArticles, setError, setCurrentPage } = articleSlice.actions;
export default articleSlice.reducer;


export const fetchArticles = (page: number, titleFilter : string, sourceFilter : string, dateFilter: string, categoryFilter: string ) => async (dispatch: AppDispatch, getState:  () => RootState) => {
  const currentState = getState();
  //const token =  currentState.auth.token || localStorage.getItem('token');
  const token = currentState.auth.token ?? localStorage.getItem('token') ?? '';
  try {
    const { data, last_page } = await fetchArticlesService(page, token, titleFilter, sourceFilter, dateFilter, categoryFilter);
    //console.log('User articles ', data);
    dispatch(setArticles({ articles: data, totalPages: last_page }));
    dispatch(setCurrentPage(page));
    dispatch(setError('')); // Reset error message
  } catch (error: unknown) {
    if (error instanceof Error) {
      //console.log(error.message); 
      dispatch(setError(error.message));
    } else {
      console.log('An unknown error occurred');
    }
  }
};

export const fetchUserArticles = (page: number) => async (dispatch: AppDispatch, getState:  () => RootState) => {
    const currentState = getState();
    const token = currentState.auth.token ?? localStorage.getItem('token') ?? '';
  try {

    const { data, last_page } = await fetchUserArticlesService(page, token);

    dispatch(setUserArticles({ articles: data, totalPages: last_page }));
    dispatch(setCurrentPage(page));
    dispatch(setError('')); // Reset error message
  } catch (error: unknown) {
    //dispatch(setError(error.message));
    if (error instanceof Error) {
      console.log(error.message); 
      dispatch(setError(error.message));
    } else {
      console.log('An unknown error occurred');
    }
  }
};