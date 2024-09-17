import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Gap } from '@alfalab/core-components/gap';
import { Input, InputProps } from '@alfalab/core-components/input';
import { Switch } from '@alfalab/core-components/switch';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import mebel from './assets/mebel.svg';
import remont from './assets/remont.svg';
import technika from './assets/technika.svg';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { getYearString } from './utils/years';
import { ZeroStep } from './ZeroStep';

const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const options = ['Ремонт', 'Мебель', 'Техника', 'Наличные'];
const imgs = [remont, mebel, technika, 'Наличные'];

export const App = () => {
  const [steps, setStep] = useState(0);
  const [flow, setFlow] = useState<'car_credit' | 'cash_credit'>('car_credit');
  const [selectedOption, setOption] = useState<string>('Ремонт');
  const [deposit, setDeposit] = useState<'Без залога' | 'Под залог'>('Без залога');
  const [depositOption, setDepositOption] = useState<'Автомобиль' | 'Квартира' | ''>('');
  const [sum, setSum] = useState(2_500_000);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [selectedYear, setYear] = useState(1);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));

  const handleSumChange: InputProps['onChange'] = (_, { value }) => {
    setSum(typeof value === 'string' ? Number(value.replace(/\s+/g, '')) : value);
  };

  const goBack = () => {
    setStep(v => v - 1);
  };
  const goNext = () => {
    if ((steps === 4 && deposit === 'Без залога') || (steps === 5 && deposit === 'Под залог')) {
      submit();
      return;
    }
    setStep(v => v + 1);
  };

  const submit = useCallback(() => {
    // if (!accountNumber) {
    //   setError('Укажите номер лицевого счёта');
    //   return;
    // }
    setLoading(true);
    setThx(true);
    setLoading(false);

    // sendDataToGA({
    //   autopayments: Number(checked) as 1 | 0,
    //   limit: Number(checked2) as 1 | 0,
    //   limit_sum: limit ?? 0,
    //   insurance: Number(checked3) as 1 | 0,
    //   email: email ? 1 : 0,
    // }).then(() => {
    //   LS.setItem(LSKeys.ShowThx, true);
    // });
  }, []);

  const content = () => {
    if (flow === 'car_credit') {
      switch (steps) {
        default:
          return null;
      }
    }
    if (flow === 'cash_credit') {
      switch (steps) {
        case 1:
          return (
            <FirstStepCash deposit={deposit} selectedOption={selectedOption} setDeposit={setDeposit} setOption={setOption} />
          );

        case 2: {
          if (deposit === 'Под залог') {
            return <SecondStepCashDeposit depositOption={depositOption} setDepositOption={setDepositOption} />;
          }

          return (
            <ThridStepCash
              handleSumChange={handleSumChange}
              selectedOption={selectedOption}
              selectedYear={selectedYear}
              setYear={setYear}
              sum={sum}
            />
          );
        }

        case 3: {
          if (deposit === 'Под залог') {
            return (
              <ThridStepCash
                handleSumChange={handleSumChange}
                selectedOption={selectedOption}
                selectedYear={selectedYear}
                setYear={setYear}
                sum={sum}
              />
            );
          }

          return <FourthStepCash checked={checked} checked2={checked2} setChecked={setChecked} setChecked2={setChecked2} />;
        }
        case 4: {
          if (deposit === 'Под залог') {
            return (
              <FourthStepCash checked={checked} checked2={checked2} setChecked={setChecked} setChecked2={setChecked2} />
            );
          }

          return (
            <FifthStepCash
              checked={checked}
              checked2={checked2}
              deposit={deposit}
              depositOption={depositOption}
              selectedOption={selectedOption}
              selectedYear={selectedYear}
              sum={sum}
            />
          );
        }

        case 5: {
          if (deposit === 'Под залог') {
            return (
              <FifthStepCash
                checked={checked}
                checked2={checked2}
                deposit={deposit}
                depositOption={depositOption}
                selectedOption={selectedOption}
                selectedYear={selectedYear}
                sum={sum}
              />
            );
          }
          return null;
        }

        default:
          return null;
      }
    }
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  if (!steps) {
    return (
      <ZeroStep
        setFlow={v => {
          setFlow(v);
          setStep(1);
        }}
      />
    );
  }

  return (
    <>
      {content()}
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <div className={appSt.btnLeft} onClick={loading ? undefined : goBack}>
          <CDNIcon name="glyph_chevron-left_m" />
        </div>
        <ButtonMobile
          block
          view="primary"
          className={appSt.btn}
          disabled={steps === 2 && !depositOption && deposit === 'Под залог'}
          onClick={goNext}
          loading={loading}
        >
          <div className={appSt.btnContainer}>
            <div>
              <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
                {steps === 4 ? 'Продолжить' : 'Следущий шаг'}
              </Typography.TitleResponsive>
              <Typography.Text view="primary-medium" defaultMargins={false}>
                {steps} из 4
              </Typography.Text>
            </div>

            <div className={appSt.btnContainer}>
              <CDNIcon name="glyph_chevron-right_m" />
            </div>
          </div>
        </ButtonMobile>
      </div>
    </>
  );
};

const FirstStepCash = ({
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
        <Typography.Title style={{ textAlign: 'center' }} tag="h1" view="medium" font="system" weight="bold">
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
      <div className={appSt.container}>
        <img height={392} width="100%" src={imgs[options.indexOf(selectedOption)]} />

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

const SecondStepCashDeposit = ({
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

const ThridStepCash = ({
  handleSumChange,
  selectedOption,
  selectedYear,
  setYear,
  sum,
}: {
  selectedYear: number;
  sum: number;
  setYear: (v: number) => void;
  selectedOption: string;
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
      <div className={appSt.container}>
        <img height={392} width="100%" src={imgs[options.indexOf(selectedOption)]} />

        <Typography.Text style={{ textAlign: 'center' }} view="component-secondary" color="secondary">
          от 100 000 ₽ до 12 000 000 ₽
        </Typography.Text>

        <Input
          block
          size={48}
          value={sum.toLocaleString('ru')}
          onChange={handleSumChange}
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

const FourthStepCash = ({
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
    <div className={appSt.container}>
      <Typography.Title style={{ textAlign: 'center' }} tag="h1" view="medium" font="system" weight="bold">
        Доп. услуги
      </Typography.Title>
      <div style={{ height: '294px' }} />
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
  );
};

const FifthStepCash = ({
  deposit,
  depositOption,
  selectedOption,
  checked,
  checked2,
  selectedYear,
  sum,
}: {
  selectedYear: number;
  sum: number;
  checked: boolean;
  checked2: boolean;
  selectedOption: string;
  deposit: 'Без залога' | 'Под залог';
  depositOption: 'Автомобиль' | 'Квартира' | '';
}) => {
  return (
    <div className={appSt.container}>
      <Typography.Title style={{ textAlign: 'center' }} tag="h1" view="medium" font="system" weight="bold">
        Кредит наличными
      </Typography.Title>
      <img height={392} width="100%" src={imgs[options.indexOf(selectedOption)]} />
      <div className={appSt.tags}>
        <div className={appSt.tag}>На {selectedOption === 'Техника' ? 'технику' : selectedOption.toLowerCase()}</div>
        <div className={appSt.tag}>
          {deposit}
          {depositOption ? (depositOption === 'Автомобиль' ? ' автомобиля' : ' квартиры') : ''}
        </div>
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
  );
};
