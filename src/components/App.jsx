import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import ImageGallery from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import Searchbar from './Searchbar/Searchbar';
import { addImage } from 'services/api';
import Loader from './Loader/Loader';

export default class App extends Component {
  state = {
    query: '',
    isLoading: false,
    page: 1,
    total: 0,
    results: [],
    //error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
    
      this.setState({ isLoading: true, error: null });
      try {
        const data = await addImage(query, page);
        if (data.hits.length === 0) {
          toast.error(`No results for ${query}`);
          return;
        }
        this.setState(prevState => ({
          results: [...prevState.results, ...data.hits],
          total: data.totalHits,
        }));
      } catch (error) {
        toast.error('Something went wrong');
        //this.setState({ error: 'Something went wrong' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
    if (prevState.error) {
      toast.error('Something went wrong');
    }
  }
  handleFormSubmit = query => {
    this.setState({
      query,
      isLoading: false,
      page: 1,
      results: [],
      error: null,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isLoading, results, total } = this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery
            items={results}
            onLoadMoreClick={this.loadMore}
            allResults={total}
          />
        )}

        <Toaster />
        <GlobalStyle />
      </Layout>
    );
  }
}
