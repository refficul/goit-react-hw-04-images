import { useState, useEffect  } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/Button';
import { Loader } from './Loader/Loader';
import { SearchBar } from './Searchbar/Searchbar';
import { getImages } from 'api';

export const App = () => {

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [totalHits, setTotalHits] = useState(0)

  useEffect(() => {
    if (!query) {
      return
    }
    setLoading(true);

    async function ImagesFetch() {
      try {
        const {totalHits, hits} = await getImages(query,page);

        if (totalHits === 0) {
          alert('Nothing was found by your request. Please try again');
          setLoading(false);
        }

        setImages(prevState => (page === 1 ? hits : [...prevState, ...hits]))
        setTotalHits(prevState => {
          const allHits = page === 1 ? totalHits - hits.length : prevState - hits.length;

          return allHits;
        });

        setLoading(false);
      } catch (error) {
        alert('Oops! Something went wrong')
      }
    }

    ImagesFetch()
  }, [query, page])

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

    return (
      <div>
        <SearchBar onSubmit={handleSubmit} />
        {images.length > 0 && <ImageGallery images={images}/>}
        {loading && <Loader />}
        {!!totalHits && <LoadMore  onClick={handleLoadMore} />}
      </div>
    );
  }