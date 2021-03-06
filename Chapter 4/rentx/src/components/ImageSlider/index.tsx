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
  imagesUrl: {
    id: string;
    photo: string;
  }[];
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
        {imagesUrl.map((item, index) => (
          <ImageIndex
            key={!!item.id ? String(item.id) : index}
            active={index === imageIndex} />
        ))
        }
      </ImageIndexes>

      <FlatList

        onViewableItemsChanged={indexChanged.current}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={imagesUrl}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => (
          <CarImageWrapper>
            <CarImage
              key={!!item.id ? String(item.id) : index + Math.random()}
              source={{ uri: item.photo }}
              resizeMode='contain'
            />
          </CarImageWrapper>
        )}
      />
    </Container>
  );
}