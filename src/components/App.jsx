import { Searchbar } from './Searchbar/Searchbar';
import { getPhotos } from '../Service/PhotoService';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    const fetchHits = async () => {
      await getPhotos(query, page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            setIsEmpty(true);
            return;
          }
          setHits(prevState => [...prevState, ...hits]);
          setShowBtn(page < Math.ceil(totalHits / 12));
        })
        .catch(error => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchHits();
  }, [query, page]);

  const onSubmit = Newquery => {
    if (query === Newquery) {
      return alert('Already shown');
    }

    setQuery(Newquery);
    setPage(1);
    setHits([]);
    setShowBtn(false);
    setIsEmpty(false);
    setError('');
  };

  const handleClick = () => {
    setPage(prevState => prevState + 1);
  };

  const showModal = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {hits.length > 0 && <ImageGallery photos={hits} openModal={showModal} />}
      {showBtn && <Button handleClick={handleClick} />}
      {isLoading && <Loader />}
      {largeImageURL && (
        <Modal
          largeImageURL={largeImageURL}
          tags={hits.tags}
          closeModal={showModal}
        />
      )}
      {isEmpty && <p>Sorry. There are no images ... 😭</p>}
      {error && <p>Sorry. {error} ... 😭</p>}
    </>
  );
};
