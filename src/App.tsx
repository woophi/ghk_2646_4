import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Gap } from '@alfalab/core-components/gap';
import { InputProps } from '@alfalab/core-components/input';
import { Typography } from '@alfalab/core-components/typography';
import { useEffect, useState } from 'react';
import { calculatePayment } from './calc';
import { carOptions, options } from './constants';
import { LS, LSKeys } from './ls';
import { FirstStepCar, SecondStepCar, SecondStepCarType, ThirdStepCar } from './StepsCar';
import { FirstStepCash, FourthStepCash, SecondStepCashDeposit, ThridStepCash } from './StepsCash';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';
import { ZeroStep } from './ZeroStep';

export const App = () => {
  const [selectedOptionCar, setOptionCar] = useState<string>(carOptions[0]);
  const [carState, setCarState] = useState<'Подержанный' | 'Новый'>('Подержанный');
  const [carType, setCarType] = useState<string>('');

  const [steps, setStep] = useState(0);
  const [flow, setFlow] = useState<'car_credit' | 'cash_credit'>('car_credit');
  const [selectedOption, setOption] = useState<string>(options[0]);
  const [deposit, setDeposit] = useState<'Без залога' | 'Под залог'>('Без залога');
  const [depositOption, setDepositOption] = useState<'Автомобиль' | 'Квартира' | ''>('');
  const [sum, setSum] = useState(500_000);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setYear] = useState(1);
  const [thxShow] = useState(LS.getItem(LSKeys.ShowThx, false));

  useEffect(() => {
    setOptionCar(carOptions[0]);
    setCarState('Подержанный');
    setCarType('');

    setOption(options[0]);
    setDeposit('Без залога');
    setDepositOption('');
    setSum(500_000);
    setYear(3);
  }, [flow]);

  const disabledNextStep =
    flow === 'cash_credit'
      ? steps === 2 && !depositOption && deposit === 'Под залог'
      : steps === 2 && !carType && carState === 'Новый';

  const titleBtn =
    deposit === 'Под залог' || carState === 'Новый'
      ? steps === 4
        ? 'Продолжить'
        : 'Следущий шаг'
      : steps === 3
      ? 'Продолжить'
      : 'Следущий шаг';

  const handleSumChange: InputProps['onChange'] = (_, { value }) => {
    setSum(typeof value === 'string' ? Number(value.replace(/\s+/g, '')) : value);
  };

  const goBack = () => {
    setStep(v => v - 1);
  };
  const goNext = () => {
    switch (flow) {
      case 'cash_credit':
        if ((steps === 3 && deposit === 'Без залога') || (steps === 4 && deposit === 'Под залог')) {
          submit();
          return;
        }
        break;

      case 'car_credit':
        if ((steps === 3 && carState === 'Подержанный') || (steps === 4 && carState === 'Новый')) {
          submit();
          return;
        }
        break;
    }
    setStep(v => v + 1);
  };

  const submit = () => {
    setLoading(true);

    const isCash = flow === 'cash_credit';

    sendDataToGA({
      credit_period: selectedYear,
      credit_sum: sum,
      auto_brand: carType,
      auto_credit_goal: isCash ? '' : selectedOptionCar,
      auto_type: isCash ? '' : carState,
      cash_credit_goal: isCash ? selectedOption : '',
      credit_type: isCash ? 'Кредит наличными' : 'Автокредит',
      zalog_type: isCash ? depositOption : '0',
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      window.location.replace(
        isCash && deposit === 'Под залог'
          ? 'https://alfa.me/Fns0ch'
          : isCash
          ? 'https://alfa.me/p0r7na'
          : 'https://alfa.me/auto',
      );
    });
  };

  const content = () => {
    if (flow === 'car_credit') {
      switch (steps) {
        case 1: {
          return (
            <FirstStepCar
              carState={carState}
              selectedOptionCar={selectedOptionCar}
              setCarState={setCarState}
              setOptionCar={setOptionCar}
            />
          );
        }

        case 2: {
          if (carState === 'Новый') {
            return <SecondStepCarType carType={carType} setCarType={setCarType} />;
          }
          return (
            <SecondStepCar
              handleSumChange={handleSumChange}
              selectedOptionCar={selectedOptionCar}
              selectedYear={selectedYear}
              setYear={setYear}
              sum={sum}
              setSum={setSum}
            />
          );
        }
        case 3: {
          if (carState === 'Новый') {
            return (
              <SecondStepCar
                handleSumChange={handleSumChange}
                selectedOptionCar={selectedOptionCar}
                selectedYear={selectedYear}
                setYear={setYear}
                sum={sum}
                setSum={setSum}
              />
            );
          }
          return (
            <ThirdStepCar
              carState={carState}
              selectedOptionCar={selectedOptionCar}
              selectedYear={selectedYear}
              sum={sum}
              monthPayment={calculatePayment(sum, 0.29, selectedYear)}
            />
          );
        }

        case 4: {
          if (carState === 'Новый') {
            return (
              <ThirdStepCar
                carState={carState}
                selectedOptionCar={selectedOptionCar}
                selectedYear={selectedYear}
                sum={sum}
                monthPayment={calculatePayment(sum, 0.29, selectedYear)}
              />
            );
          }
          return null;
        }
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
              max={500_000}
              min={30_000}
              setSum={setSum}
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
                max={1_000_000}
                min={500_000}
                setSum={setSum}
              />
            );
          }

          return (
            <FourthStepCash
              deposit={deposit}
              depositOption={depositOption}
              selectedOption={selectedOption}
              selectedYear={selectedYear}
              sum={sum}
              monthPayment={calculatePayment(sum, 0.34, selectedYear)}
            />
          );
        }
        case 4: {
          if (deposit === 'Под залог') {
            return (
              <FourthStepCash
                deposit={deposit}
                depositOption={depositOption}
                selectedOption={selectedOption}
                selectedYear={selectedYear}
                sum={sum}
                monthPayment={calculatePayment(sum, 0.25, selectedYear)}
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
          disabled={disabledNextStep}
          onClick={goNext}
          loading={loading}
        >
          <div className={appSt.btnContainer}>
            <div>
              <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
                {titleBtn}
              </Typography.TitleResponsive>
              <Typography.Text view="primary-medium" defaultMargins={false}>
                {steps} из {deposit === 'Под залог' || carState === 'Новый' ? 4 : 3}
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
