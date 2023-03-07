import React from 'react';
import PropTypes from 'prop-types';
import css from './GalleryItem.module.css';

class GalleryItem extends React.Component {
  render() {
    return (
      <li className={css.GalleryItem}>
        <img
          className={css.GalleryItemImage}
          src={this.props.image.webformatURL}
          alt={this.props.image.tags}
          data-largeimg={this.props.image.largeImageURL}
          onClick={event => {
            this.props.onImgClick(event.target.dataset.largeimg);
          }}
        />
      </li>
    );
  }
}

GalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onImgClick: PropTypes.func.isRequired,
};

export default GalleryItem;