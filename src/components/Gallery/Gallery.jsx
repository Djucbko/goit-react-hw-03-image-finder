import React from 'react';
import PropTypes from 'prop-types';

import css from './Gallery.module.css';
import GalleryItem from '../GalleryItem/GalleryItem';

class Gallery extends React.Component {
  render() {
    return (
      <ul className={css.Gallery}>
        {this.props.images.map(image => (
          <GalleryItem
            key={image.id}
            onImgClick={this.props.onModalOpen}
            image={image}
          />
        ))}
      </ul>
    );
  }
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onModalOpen: PropTypes.func.isRequired,
};

export default Gallery;