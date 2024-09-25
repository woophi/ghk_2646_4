import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Input, InputProps } from '@alfalab/core-components/input';
import { Typography } from '@alfalab/core-components/typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import { carOptions, carTypes, imgCars, years } from './constants';
import { appSt } from './style.css';
import { getYearString } from './utils/years';

export const FirstStepCar = ({
  carState,
  selectedOptionCar,
  setCarState,
  setOptionCar,
}: {
  setOptionCar: (v: string) => void;
  selectedOptionCar: string;
  carState: 'Подержанный' | 'Новый';
  setCarState: (v: 'Подержанный' | 'Новый') => void;
}) => {
  return (
    <>
      <div className={appSt.container}>
        <Typography.Title style={{ textAlign: 'center', zIndex: 2 }} tag="h1" view="medium" font="system" weight="bold">
          Автокредит
        </Typography.Title>
      </div>

      <Swiper spaceBetween={8} style={{ marginLeft: '1rem' }} slidesPerView="auto">
        {carOptions.map(o => (
          <SwiperSlide
            onClick={() => setOptionCar(o)}
            className={appSt.swSlide({ selected: selectedOptionCar === o })}
            key={o}
          >
            {o}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={appSt.imgCenter}>
        <img height={392} style={{ objectFit: 'cover' }} width="100%" src={imgCars[carOptions.indexOf(selectedOptionCar)]} />
      </div>
      <div className={`${appSt.container} ${appSt.bottomFix}`}>
        <Typography.Text style={{ textAlign: 'center' }} view="component-secondary" color="secondary">
          Новые авто могут иметь партнерскую программу
        </Typography.Text>

        <div className={appSt.btnsRadio}>
          <div
            className={appSt.btnRadio({ selected: carState === 'Подержанный' })}
            onClick={() => setCarState('Подержанный')}
          >
            <Typography.Text style={{ fontWeight: 'inherit' }} view="primary-medium">
              Подержанный
            </Typography.Text>
          </div>
          <div className={appSt.btnRadio({ selected: carState === 'Новый' })} onClick={() => setCarState('Новый')}>
            <Typography.Text style={{ fontWeight: 'inherit' }} view="primary-medium">
              Новый
            </Typography.Text>
          </div>
        </div>
      </div>
    </>
  );
};

export const SecondStepCarType = ({ carType, setCarType }: { setCarType: (v: string) => void; carType: string }) => {
  return (
    <div className={appSt.container}>
      <Typography.Title style={{ textAlign: 'center' }} tag="h1" view="medium" font="system" weight="bold">
        Выберите марку
      </Typography.Title>

      {carTypes.map(ct => (
        <div key={ct} onClick={() => setCarType(ct)} className={appSt.depositRow({ selected: carType === ct })}>
          <Typography.Text view="primary-medium">{ct}</Typography.Text>
          {carType === ct && <CDNIcon name="glyph_checkmark-circle_m" color="#fff" />}
        </div>
      ))}
    </div>
  );
};

export const SecondStepCar = ({
  handleSumChange,
  selectedOptionCar,
  selectedYear,
  setYear,
  sum,
  setSum,
}: {
  selectedYear: number;
  sum: number;
  setYear: (v: number) => void;
  setSum: (v: number) => void;
  selectedOptionCar: string;
  handleSumChange: InputProps['onChange'];
}) => {
  const min = 300_000;
  const max = 800_000;

  const handleBlur = () => {
    setSum(Math.max(min, Math.min(max, sum)));
  };
  return (
    <>
      <div className={appSt.container}>
        <Typography.Title style={{ textAlign: 'center', zIndex: 2 }} tag="h1" view="medium" font="system" weight="bold">
          Срок и сумма
        </Typography.Title>
      </div>

      <Swiper spaceBetween={8} style={{ marginLeft: '1rem' }} slidesPerView="auto">
        {years.map(year => (
          <SwiperSlide
            onClick={() => setYear(year)}
            className={appSt.swSlide({ selected: selectedYear === year })}
            key={year}
          >
            {getYearString(year)}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={appSt.imgCenter}>
        <img height={392} width="100%" style={{ objectFit: 'cover' }} src={imgCars[carOptions.indexOf(selectedOptionCar)]} />
      </div>
      <div className={`${appSt.container} ${appSt.bottomFix}`}>
        <Typography.Text style={{ textAlign: 'center' }} view="component-secondary" color="secondary">
          от {min.toLocaleString('ru')} ₽ до {max.toLocaleString('ru')} ₽
        </Typography.Text>

        <Input
          block
          size={48}
          value={sum.toLocaleString('ru')}
          onChange={handleSumChange}
          onBlur={handleBlur}
          pattern="[0-9]*"
          inputMode="numeric"
          rightAddons={
            <Typography.Text view="component-secondary" color="secondary">
              ₽
            </Typography.Text>
          }
        />
      </div>
    </>
  );
};

export const ThirdStepCar = ({
  carState,
  selectedOptionCar,
  selectedYear,
  sum,
  monthPayment,
}: {
  selectedYear: number;
  sum: number;
  selectedOptionCar: string;
  carState: 'Подержанный' | 'Новый';
  monthPayment: number;
}) => {
  return (
    <>
      <div className={appSt.container}>
        <Typography.Title style={{ textAlign: 'center', zIndex: 2 }} tag="h1" view="medium" font="system" weight="bold">
          Кредит наличными
        </Typography.Title>
      </div>
      <div className={appSt.imgCenter}>
        <img height={392} width="100%" style={{ objectFit: 'cover' }} src={imgCars[carOptions.indexOf(selectedOptionCar)]} />
      </div>
      <div className={`${appSt.container} ${appSt.bottomFix}`}>
        <div className={appSt.tags}>
          <div className={appSt.tag}>{selectedOptionCar}</div>
          <div className={appSt.tag}>{carState}</div>
          <div className={appSt.tag}>На {getYearString(selectedYear)}</div>
          <div className={appSt.tag}>{sum.toLocaleString('ru')} ₽</div>
        </div>
        <div className={appSt.moneyBox}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography.Text style={{ fontWeight: 600 }} view="primary-medium">
              {monthPayment.toLocaleString('ru')} ₽
            </Typography.Text>
            <Typography.Text style={{ textAlign: 'center' }} view="component-secondary" color="secondary">
              Без доп. услуг
            </Typography.Text>
          </div>
          <Typography.Text view="primary-medium">платеж в месяц</Typography.Text>
        </div>
      </div>
    </>
  );
};
