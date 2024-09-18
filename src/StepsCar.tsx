import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Input, InputProps } from '@alfalab/core-components/input';
import { Switch } from '@alfalab/core-components/switch';
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
        <Typography.Title style={{ textAlign: 'center' }} tag="h1" view="medium" font="system" weight="bold">
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
}: {
  selectedYear: number;
  sum: number;
  setYear: (v: number) => void;
  selectedOptionCar: string;
  handleSumChange: InputProps['onChange'];
}) => {
  return (
    <>
      <div className={appSt.container}>
        <Typography.Title style={{ textAlign: 'center' }} tag="h1" view="medium" font="system" weight="bold">
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
          от 100 000 ₽ до 12 000 000 ₽
        </Typography.Text>

        <Input
          block
          size={48}
          value={sum.toLocaleString('ru')}
          onChange={handleSumChange}
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
  checked,
  setChecked,
  checked2,
  setChecked2,
}: {
  checked: boolean;
  setChecked: (c: boolean) => void;
  checked2: boolean;
  setChecked2: (c: boolean) => void;
}) => {
  return (
    <>
      <div className={appSt.container}>
        <Typography.Title style={{ textAlign: 'center' }} tag="h1" view="medium" font="system" weight="bold">
          Доп. услуги
        </Typography.Title>
        <div style={{ height: '294px' }} />
      </div>
      <div className={`${appSt.container} ${appSt.bottomFix}`}>
        <Typography.Text style={{ textAlign: 'center' }} view="component-secondary" color="secondary">
          Дополнительные услуги уменьшат платеж
        </Typography.Text>
        <div className={appSt.row}>
          <Switch
            block
            reversed
            checked={checked}
            label="Страховка"
            className={appSt.switchItem}
            onChange={() => setChecked(!checked)}
          />
        </div>
        <div className={appSt.row}>
          <Switch
            block
            reversed
            checked={checked2}
            label="Выгодная ставка"
            className={appSt.switchItem}
            onChange={() => setChecked2(!checked2)}
          />
        </div>
        <div className={appSt.moneyBox}>
          {checked2 ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography.Text style={{ fontWeight: 600 }} view="primary-medium">
                25 000 ₽
              </Typography.Text>
              <s>
                <Typography.Text style={{ textAlign: 'center' }} view="component-secondary" color="secondary">
                  27 000 ₽
                </Typography.Text>
              </s>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography.Text style={{ fontWeight: 600 }} view="primary-medium">
                27 000 ₽
              </Typography.Text>
              <Typography.Text style={{ textAlign: 'center' }} view="component-secondary" color="secondary">
                Без доп. услуг
              </Typography.Text>
            </div>
          )}
          <Typography.Text view="primary-medium">платеж в месяц</Typography.Text>
        </div>
      </div>
    </>
  );
};

export const FourthStepCar = ({
  carState,
  selectedOptionCar,
  checked,
  checked2,
  selectedYear,
  sum,
}: {
  selectedYear: number;
  sum: number;
  checked: boolean;
  checked2: boolean;
  selectedOptionCar: string;
  carState: 'Подержанный' | 'Новый';
}) => {
  return (
    <>
      <div className={appSt.container}>
        <Typography.Title style={{ textAlign: 'center' }} tag="h1" view="medium" font="system" weight="bold">
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
          {checked && <div className={appSt.tag}>Страховка</div>}
          {checked2 && <div className={appSt.tag}>Выгодная ставка</div>}
        </div>
        <div className={appSt.moneyBox}>
          {checked2 ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography.Text style={{ fontWeight: 600 }} view="primary-medium">
                25 000 ₽
              </Typography.Text>
              <s>
                <Typography.Text style={{ textAlign: 'center' }} view="component-secondary" color="secondary">
                  27 000 ₽
                </Typography.Text>
              </s>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography.Text style={{ fontWeight: 600 }} view="primary-medium">
                27 000 ₽
              </Typography.Text>
              <Typography.Text style={{ textAlign: 'center' }} view="component-secondary" color="secondary">
                Без доп. услуг
              </Typography.Text>
            </div>
          )}
          <Typography.Text view="primary-medium">платеж в месяц</Typography.Text>
        </div>
      </div>
    </>
  );
};
