import { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { ImgItem, ImgItemImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { image } = this.props;
    const { isModalOpen } = this.state;
    return (
      <>
        <ImgItem onClick={this.openModal}>
          <ImgItemImage src={image.webformatURL} alt="picture" />
        </ImgItem>
        {isModalOpen && <Modal onClose={this.closeModal} image={image} />}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
