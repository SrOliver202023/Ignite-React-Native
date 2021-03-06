import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage
} from './styles';

interface ImagesProps {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: ImagesProps) {
  // FlatList -> useRef 

  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, index) => (
          <ImageIndex
            key={String(index)}
            active={index === imageIndex} />
        ))

        }
      </ImageIndexes>

      <FlatList

        onViewableItemsChanged={indexChanged.current}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage
              source={{ uri: item }}
              resizeMode='contain'
            />
          </CarImageWrapper>
        )}
      />
    </Container>
  );
}