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
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    try {
      if (
        prevState.page !== this.state.page ||
        prevState.query !== this.state.query
      ) {
        const data = await addImage(this.state.query, this.state.page);
        if (data.hits.length === 0) {
          toast.error(`No results for ${this.state.query}`);
          this.setState({ isLoading: false });
          return;
        }
        this.setState(prevState => ({
          results: [...prevState.results, ...data.hits],
          total: data.totalHits,
        }));
      }
    } catch (error) {
      toast.error('Something went wrong');
      this.setState({ error });
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
