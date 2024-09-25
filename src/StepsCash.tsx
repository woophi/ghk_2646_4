import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Input, InputProps } from '@alfalab/core-components/input';
import { Typography } from '@alfalab/core-components/typography';
import { Swiper, SwiperSlide } from 'swiper/react';
import { imgs, options, years } from './constants';
import { appSt } from './style.css';
import { getYearString } from './utils/years';

export const FirstStepCash = ({
  selectedOption,
  setOption,
  deposit,
  setDeposit,
}: {
  setOption: (v: string) => void;
  selectedOption: string;
  deposit: 'Без залога' | 'Под залог';
  setDeposit: (v: 'Без залога' | 'Под залог') => void;
}) => {
  return (
    <>
      <div className={appSt.container}>
        <Typography.Title style={{ textAlign: 'center', zIndex: 2 }} tag="h1" view="medium" font="system" weight="bold">
          Кредит наличными
        </Typography.Title>
      </div>

      <Swiper spaceBetween={8} style={{ marginLeft: '1rem' }} slidesPerView="auto">
        {options.map(o => (
          <SwiperSlide onClick={() => setOption(o)} className={appSt.swSlide({ selected: selectedOption === o })} key={o}>
            {o}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={appSt.imgCenter}>
        <img height={392} width="100%" style={{ objectFit: 'cover' }} src={imgs[options.indexOf(selectedOption)]} />
      </div>
      <div className={`${appSt.container} ${appSt.bottomFix}`}>
        <Typography.Text style={{ textAlign: 'center' }} view="component-secondary" color="secondary">
          Под залог ниже ставка, меньше платеж
        </Typography.Text>

        <div className={appSt.btnsRadio}>
          <div className={appSt.btnRadio({ selected: deposit === 'Без залога' })} onClick={() => setDeposit('Без залога')}>
            <Typography.Text style={{ fontWeight: 'inherit' }} view="primary-medium">
              Без залога
            </Typography.Text>
          </div>
          <div className={appSt.btnRadio({ selected: deposit === 'Под залог' })} onClick={() => setDeposit('Под залог')}>
            <Typography.Text style={{ fontWeight: 'inherit' }} view="primary-medium">
              Под залог
            </Typography.Text>
          </div>
        </div>
      </div>
    </>
  );
};

export const SecondStepCashDeposit = ({
  depositOption,
  setDepositOption,
}: {
  setDepositOption: (v: 'Автомобиль' | 'Квартира' | '') => void;
  depositOption: 'Автомобиль' | 'Квартира' | '';
}) => {
  return (
    <div className={appSt.container}>
      <Typography.Title style={{ textAlign: 'center' }} tag="h1" view="medium" font="system" weight="bold">
        Залог
      </Typography.Title>

      <div
        onClick={() => setDepositOption('Автомобиль')}
        className={appSt.depositRow({ selected: depositOption === 'Автомобиль' })}
      >
        <Typography.Text view="primary-medium">Автомобиль</Typography.Text>
        {depositOption === 'Автомобиль' && <CDNIcon name="glyph_checkmark-circle_m" color="#fff" />}
      </div>
      <div
        onClick={() => setDepositOption('Квартира')}
        className={appSt.depositRow({ selected: depositOption === 'Квартира' })}
      >
        <Typography.Text view="primary-medium">Квартира</Typography.Text>
        {depositOption === 'Квартира' && <CDNIcon name="glyph_checkmark-circle_m" color="#fff" />}
      </div>
    </div>
  );
};

export const ThridStepCash = ({
  handleSumChange,
  selectedOption,
  selectedYear,
  setYear,
  setSum,
  sum,
  max,
  min,
}: {
  selectedYear: number;
  sum: number;
  setYear: (v: number) => void;
  setSum: (v: number) => void;
  selectedOption: string;
  min: number;
  max: number;
  handleSumChange: InputProps['onChange'];
}) => {
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
        <img height={392} width="100%" style={{ objectFit: 'cover' }} src={imgs[options.indexOf(selectedOption)]} />
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

export const FourthStepCash = ({
  deposit,
  depositOption,
  selectedOption,
  selectedYear,
  sum,
  monthPayment,
}: {
  selectedYear: number;
  sum: number;
  selectedOption: string;
  deposit: 'Без залога' | 'Под залог';
  depositOption: 'Автомобиль' | 'Квартира' | '';
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
        <img height={392} width="100%" style={{ objectFit: 'cover' }} src={imgs[options.indexOf(selectedOption)]} />
      </div>
      <div className={`${appSt.container} ${appSt.bottomFix}`}>
        <div className={appSt.tags}>
          <div className={appSt.tag}>На {selectedOption === 'Техника' ? 'технику' : selectedOption.toLowerCase()}</div>
          <div className={appSt.tag}>
            {deposit}
            {depositOption ? (depositOption === 'Автомобиль' ? ' автомобиля' : ' квартиры') : ''}
          </div>
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
