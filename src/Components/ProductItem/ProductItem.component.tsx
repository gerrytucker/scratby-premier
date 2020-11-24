import React from 'react';
import { Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Card, Rating, Button } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
// @ts-ignore
import HTML from 'react-native-render-html';

import styles from './ProductItem.component.styles';
import { Product } from '../../Models';
import { toAmount } from '../../Utils';

interface Props {
    product: Product;
    handleProductPress: (id: number) => void;
    isInCart?: boolean;
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    addQuantity: (id: number) => void;
    subQuantity: (id: number) => void;
    quantity?: number;
}

const { width: screenWidth } = Dimensions.get('window');

const _renderCartDetail = ({
  product,
  quantity = 0,
  subQuantity,
  addQuantity,
  removeFromCart
}: Props): JSX.Element => (
  <>
    <View style={styles.actionView}>
      <FontAwesome5.Button
        name="minus"
        color="black"
        size={18}
        backgroundColor="transparent"
        iconStyle={{ marginRight: 0 }}
        onPress={(): void => subQuantity(product.id)}
      />
      <Text style={styles.textQuantity}>Quantity: {quantity}</Text>
      <FontAwesome5.Button
        name="plus"
        color="black"
        backgroundColor="transparent"
        size={18}
        iconStyle={{ marginRight: 0 }}
        onPress={(): void => addQuantity(product.id)}
      />
    </View>
    <Button
      title="Remove"
      onPress={(): void => removeFromCart(product.id)}
    />
  </>
);


const _renderBrowseDetail = ({ product, addToCart }: Props): JSX.Element => (
  <>
    <HTML
      html={product.description}
      textSelectable
      renderers={{
        p: (_: never, children: Array<string>): JSX.Element =>
          <Text numberOfLines={2}>{children}</Text>
      }}
    />
    <View style={styles.actionView}>
      <Rating
        readonly
        imageSize={20}
        startingValue={Number(product.average_rating)}
        // @ts-ignore
        style={styles.rating}
      />
      <FontAwesome5.Button
        name="plus"
        color="white"
        size={18}
        iconStyle={{ marginRight: 0 }}
        onPress={(): void => addToCart(product)}
      />
    </View>
  </>
);

const ProductItem = (props: Props): JSX.Element => {
  const {
    product: {
      id,
      name,
      images: [image],
      price
    },
    handleProductPress,
    isInCart = false
  } = props;


  return (
    <TouchableOpacity onPress={(): void => handleProductPress(id)}>
      <Card containerStyle={{ width: screenWidth / 2 - 20, margin: 10 }}>
        <Card.Title numberOfLines={2}>{name}</Card.Title>
        <Card.Image
          source={{ uri: image.src }}
        />
        <Text>{toAmount(price)}</Text>
        {isInCart ?
          _renderCartDetail(props) :
          _renderBrowseDetail(props)
        }
      </Card>
    </TouchableOpacity>
  );
};

export default ProductItem;
