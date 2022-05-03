import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components';

import {
  Calendar as CustomCalendars,
  DateData,
  LocaleConfig

} from 'react-native-calendars';

import { RFValue } from 'react-native-responsive-fontsize';
import { ptBR } from './localeConfig';
import { generateDateInterval } from './generateInterval';

LocaleConfig.locales['pt-br'] = ptBR;

LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    diabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

interface DayDateProps extends DateData {
  diabled?: boolean;
  disableTouchEvent?: boolean;
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (date: DateData) => void;
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  return (

    <CustomCalendars
      renderArrow={(direction) => (
        <Feather
          color={theme.colors.text}
          size={24}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        />

      )
      }
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: RFValue(0.5),
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: RFValue(5),
        marginBottom: RFValue(5)
      }}
      theme={{

        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        },

      }}
      firstDay={1}
      minDate={String(new Date())}
      markingType='period'
      markedDates={markedDates}
      onDayPress={onDayPress}

    />
  );

}

export {
  Calendar,
  CalendarProps,
  DayDateProps,
  MarkedDateProps,
  generateDateInterval
};