import React, { PureComponent } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
// @ts-ignore
import HTML from 'react-native-render-html';
import { Rating } from 'react-native-elements';

import { Product } from '../../Models';
import styles from './Product.component.styles';
import { toAmount } from '../../Utils';

interface Props {
    product: Product;
}

const { width: screenWidth } = Dimensions.get('window');

class ProductComponent extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    const {
      product: { name, images: [image], description, price, average_rating: rating },
    } = this.props;

    return (
      <View style={styles.wrapper}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image.src }}
            style={styles.image}
            width={ screenWidth }
            height={screenWidth }
          />
        </View>
        <View style={styles.detail}>
          <Text style={styles.textTitle}>{name}</Text>
          <Text style={styles.textPrice}>{toAmount(price)}</Text>
          <HTML
            html={description}
            textSelectable
          />
          <View style={styles.rating}>
            <Text style={styles.textSubHeading}>Rating:</Text>
            <Text style={styles.textRating}>{rating}</Text>
            <Rating
              ratingBackgroundColor="transparent"
              readonly
              imageSize={24}
              startingValue={Number(rating)}
            />
          </View>
        </View>
      </View>
    );
  };
}

export default ProductComponent;
